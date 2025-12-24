import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { JobFormComponent } from '../job-form/job-form.component';
import { ApplicationListComponent } from '../application-list/application-list.component';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, JobFormComponent, ApplicationListComponent],
  template: `
    <div class="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-7xl mx-auto">
        <h1 class="section-title">لوحة تحكم صاحب المحل</h1>

        <!-- نشر وظيفة جديدة -->
        <div class="card p-8 mb-12">
          <h2 class="text-3xl font-bold mb-8">انشر وظيفة جديدة</h2>
          <app-job-form (submitSuccess)="onJobPosted()"></app-job-form>
        </div>

        <!-- وظائفي -->
        <h2 class="text-3xl font-bold mb-8">وظائفي ({{ myJobs.length }})</h2>

        <button (click)="loadMyJobs()" class="btn-primary mb-4">تحديث الوظائف</button>

        <div *ngIf="loading" class="text-center py-20">
          <i class="fas fa-spinner fa-spin text-5xl text-primary"></i>
          <p class="text-2xl mt-4">جاري تحميل وظائفك...</p>
        </div>

        <div *ngIf="!loading && myJobs.length === 0" class="text-center py-20 bg-white rounded-3xl shadow-xl">
          <i class="fas fa-briefcase text-8xl text-gray-400 mb-6"></i>
          <p class="text-2xl text-gray-600">لم تنشر أي وظائف بعد</p>
          <p class="text-lg text-gray-500 mt-4">ابدأ بنشر وظيفة جديدة من الأعلى!</p>
        </div>

        <div class="space-y-12" *ngIf="!loading && myJobs.length > 0">
          <div *ngFor="let job of myJobs" class="card p-8">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h3 class="text-2xl font-bold">{{ job.shop_name }}</h3>
                <p class="text-gray-600">{{ job.category }} • {{ job.governorate }} - {{ job.city }}</p>
                <p class="text-sm text-gray-500 mt-2">تم النشر: {{ job.createdAt | date:'short' }}</p>
              </div>
              <button (click)="deleteJob(job._id)" class="text-danger hover:text-red-700 font-bold flex items-center gap-2">
                <i class="fas fa-trash"></i> حذف
              </button>
            </div>
            <div>
              <h4 class="text-xl font-bold mb-4">المتقدمون</h4>
              <app-application-list [jobId]="job._id"></app-application-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OwnerDashboardComponent implements OnInit {
  myJobs: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadMyJobs();
  }

  onJobPosted() {
    // reload فوري بعد النشر الناجح
    this.loadMyJobs();
  }

  loadMyJobs() {
    this.loading = true;
    this.api.getMyJobs().subscribe({
      next: (res) => {
        this.myJobs = res || [];
        this.loading = false;
        console.log('وظائفي تم تحميلها بنجاح:', this.myJobs);
      },
      error: (err) => {
        console.error('خطأ في جلب وظائفي:', err);
        this.myJobs = [];
        this.loading = false;
      }
    });
  }

  deleteJob(id: string) {
    if (confirm('متأكد إنك عايز تحذف الوظيفة؟')) {
      this.api.deleteJob(id).subscribe({
        next: () => this.loadMyJobs(),
        error: (err) => alert('خطأ في الحذف')
      });
    }
  }
}
