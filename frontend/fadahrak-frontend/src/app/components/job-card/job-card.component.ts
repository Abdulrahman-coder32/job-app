import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ApplyModalComponent } from '../apply-modal/apply-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ApplyModalComponent],
  template: `
    <div class="bg-white rounded-2xl shadow-md
                border border-gray-100">

      <div class="p-5">

        <h3 class="text-xl font-bold text-primary mb-3">
          {{ job.shop_name }}
        </h3>

        <div class="space-y-2 mb-5 text-gray-700 text-sm">
          <p><i class="fas fa-tag mr-2 text-primary"></i>{{ job.category }}</p>
          <p><i class="fas fa-map-marker-alt mr-2 text-primary"></i>{{ job.governorate }} - {{ job.city }}</p>
          <p><i class="fas fa-money-bill-wave mr-2 text-primary"></i>{{ job.salary || 'حسب الاتفاق' }}</p>
        </div>

        <div class="flex justify-between items-center">

          <a routerLink="/job/{{job._id}}" class="text-primary text-sm">
            عرض التفاصيل
          </a>

          <!-- قبل التقديم -->
          <button *ngIf="isJobSeeker && !hasApplied"
                  (click)="openModal()"
                  class="bg-blue-600 text-white
                         px-4 py-2 rounded-xl
                         text-sm flex items-center gap-2">
            <i class="fas fa-paper-plane"></i>
            تقديم الآن
          </button>

          <!-- بعد التقديم (ثابت وواضح) -->
          <span *ngIf="isJobSeeker && hasApplied"
                class="text-green-600 text-sm font-semibold flex items-center gap-1">
            <i class="fas fa-check-circle"></i>
            تم التقديم
          </span>

        </div>
      </div>

      <app-apply-modal
        *ngIf="isJobSeeker"
        [isOpen]="modalOpen"
        [jobTitle]="job.shop_name"
        (onClose)="closeModal()"
        (onSubmit)="apply($event)">
      </app-apply-modal>
    </div>
  `
})
export class JobCardComponent {
  @Input() job: any;
  @Input() hasApplied = false;
  @Output() applySuccess = new EventEmitter<void>();

  modalOpen = false;

  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {}

  get isJobSeeker(): boolean {
    const user = this.authService.getUser();
    return this.authService.isLoggedIn() && user?.role === 'job_seeker';
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  apply(message: string) {
    this.api.applyToJob({
      job_id: this.job._id,
      message
    }).subscribe({
      next: () => {
        this.modalOpen = false;

        // تغيير الحالة فورًا
        this.hasApplied = true;

        // رجوع لأول الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // إبلاغ الأب (لو بيعمل reload)
        this.applySuccess.emit();
      }
    });
  }
}
