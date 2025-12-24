import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, ApplyModalComponent, AsyncPipe],
  template: `
    <app-apply-modal
      *ngIf="authService.user$ | async as user; else noUser"
      [isOpen]="modalOpen && user.role === 'job_seeker'"
      [jobTitle]="job?.shop_name || ''"
      (onClose)="closeModal()"
      (onSubmit)="apply($event)">
    </app-apply-modal>

    <ng-template #noUser></ng-template>

    <div class="min-h-screen py-12 px-4 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-4xl sm:max-w-5xl mx-auto">
        <div class="card p-6 sm:p-8 md:p-12 shadow-2xl rounded-2xl">

          <!-- زر الرجوع -->
          <button
  (click)="goBack()"
  class="mb-10 flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl
         hover:bg-blue-700 transition text-lg font-semibold shadow-md">
  <i class="fas fa-arrow-right text-2xl"></i>
  رجوع للوظائف
</button>


          <!-- Loading -->
          <div *ngIf="loading" class="text-center py-32">
            <i class="fas fa-spinner fa-spin text-6xl text-primary mb-6"></i>
            <p class="text-2xl text-gray-700">جاري تحميل تفاصيل الوظيفة...</p>
          </div>

          <!-- تفاصيل الوظيفة -->
          <div *ngIf="!loading && job" class="space-y-10">

            <!-- الهيدر -->
            <div class="text-center space-y-3">
              <h1 class="text-4xl sm:text-5xl font-extrabold text-primary">{{ job.shop_name }}</h1>
              <p class="text-2xl sm:text-3xl text-gray-800 font-semibold">{{ job.category }}</p>
              <p class="text-xl sm:text-2xl text-gray-600 flex items-center justify-center gap-2">
                <i class="fas fa-map-marker-alt text-primary"></i>
                {{ job.governorate }} - {{ job.city }}
              </p>
            </div>

            <!-- معلومات الوظيفة -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div class="bg-indigo-50 p-6 rounded-xl shadow-lg text-center">
                <h3 class="text-xl font-bold mb-2 flex items-center justify-center gap-2 text-primary">
                  <i class="fas fa-clock text-2xl"></i> ساعات العمل
                </h3>
                <p class="text-lg text-gray-800">{{ job.working_hours }}</p>
              </div>

              <div class="bg-green-50 p-6 rounded-xl shadow-lg text-center">
                <h3 class="text-xl font-bold mb-2 flex items-center justify-center gap-2 text-primary">
                  <i class="fas fa-money-bill-wave text-2xl"></i> الراتب
                </h3>
                <p class="text-lg text-gray-800">{{ job.salary || 'حسب الاتفاق' }}</p>
              </div>

              <div class="bg-blue-50 p-6 rounded-xl shadow-lg text-center">
                <h3 class="text-xl font-bold mb-2 flex items-center justify-center gap-2 text-primary">
                  <i class="fas fa-list-ul text-2xl"></i> المتطلبات
                </h3>
                <p class="text-lg text-gray-800 whitespace-pre-line">{{ job.requirements }}</p>
              </div>
            </div>

            <!-- التقديم -->
            <div class="text-center mt-12 space-y-4">
              <div *ngIf="authService.user$ | async as user">
                <!-- زر التقديم -->
                <button
                  *ngIf="user.role === 'job_seeker' && !hasApplied"
                  (click)="openModal()"
                  [disabled]="applying"
                  class="bg-blue-600 text-white px-12 py-4 rounded-full text-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition shadow-lg">
                  <i class="fas fa-file-alt" *ngIf="!applying"></i>
                  <i class="fas fa-spinner fa-spin" *ngIf="applying"></i>
                  {{ applying ? 'جاري التقديم...' : 'تقديم على الوظيفة الآن' }}
                </button>

                <!-- تم التقديم -->
                <div *ngIf="user.role === 'job_seeker' && hasApplied"
                     class="inline-flex items-center gap-4 bg-green-100 text-green-800 px-12 py-4 rounded-full text-xl font-bold shadow-lg">
                  <i class="fas fa-check-circle text-3xl"></i>
                  تم التقديم بنجاح!
                </div>

                <!-- صاحب المحل -->
                <div *ngIf="user.role === 'shop_owner'"
                     class="inline-flex items-center gap-4 bg-indigo-100 text-indigo-800 px-12 py-4 rounded-full text-xl font-bold shadow-lg">
                  <i class="fas fa-building text-3xl"></i>
                  هذه إحدى وظائفك! تابع المتقدمين من لوحة التحكم
                </div>
              </div>

              <!-- لغير المسجلين -->
              <p *ngIf="!(authService.user$ | async)" class="text-lg text-gray-600">
                لازم
                <a routerLink="/login" class="text-primary font-semibold hover:underline">تسجل دخول</a> أو
                <a routerLink="/signup" class="text-primary font-semibold hover:underline"> تنشئ حساب</a>
                عشان تتقدم على الوظيفة
              </p>
            </div>

          </div>

          <!-- الوظيفة غير موجودة -->
          <div *ngIf="!loading && !job" class="text-center py-32">
            <i class="fas fa-exclamation-triangle text-7xl text-gray-400 mb-4"></i>
            <p class="text-2xl text-gray-600 font-medium">الوظيفة غير موجودة أو تم حذفها</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class JobDetailComponent implements OnInit {
  job: any = null;
  loading = true;
  hasApplied = false;
  modalOpen = false;
  applying = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getJob(id).subscribe({
        next: (res: any) => {
          this.job = res;
          this.loading = false;
          this.checkApplicationStatus();
        },
        error: (err: any) => {
          console.error('خطأ في جلب الوظيفة:', err);
          this.loading = false;
        }
      });
    }
  }

  checkApplicationStatus() {
    const user = this.authService.getUser();
    if (!user || user.role !== 'job_seeker') return;

    this.api.getMyApplications().subscribe({
      next: (apps: any[]) => {
        this.hasApplied = apps.some(app =>
          app.job_id === this.job._id || (app.job_id && app.job_id._id === this.job._id)
        );
      },
      error: () => { this.hasApplied = false; }
    });
  }

  openModal() {
    if (this.applying) return;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  apply(message: string) {
    if (!message.trim()) return;

    this.applying = true;
    this.api.applyToJob({ job_id: this.job._id, message: message.trim() }).subscribe({
      next: () => {
        this.modalOpen = false;
        this.hasApplied = true;
        this.applying = false;
      },
      error: () => { this.applying = false; }
    });
  }

  goBack() {
    this.router.navigate(['/jobs']);
  }
}
