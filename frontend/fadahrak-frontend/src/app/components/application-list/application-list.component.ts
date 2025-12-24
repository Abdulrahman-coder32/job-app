import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="loading" class="text-center py-8">
      <i class="fas fa-spinner fa-spin text-4xl text-primary"></i>
      <p class="mt-2">جاري تحميل المتقدمين...</p>
    </div>

    <div *ngIf="!loading && applications.length === 0" class="text-gray-600 text-center py-8 flex items-center justify-center">
      <i class="fas fa-users-slash icon mr-2 text-warning"></i>لا يوجد متقدمين بعد
    </div>

    <div class="space-y-6" *ngIf="!loading && applications.length > 0">
      <div *ngFor="let app of applications" class="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover-scale">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h4 class="text-xl font-bold flex items-center"><i class="fas fa-user icon text-primary mr-2"></i>{{ app.seeker_id.name }} ({{ app.seeker_id.age }} سنة)</h4>
            <p class="text-gray-600 flex items-center"><i class="fas fa-map-marker-alt icon mr-2"></i>{{ app.seeker_id.governorate }} - {{ app.seeker_id.city }}</p>
            <p class="text-gray-600 mt-2 flex items-center"><i class="fas fa-briefcase icon mr-2"></i>خبرة: {{ app.seeker_id.work_experience || 'غير محدد' }}</p>
          </div>
          <span [class]="getStatusClass(app.status)" class="px-4 py-1 rounded-full text-sm font-bold flex items-center">
            <i [class]="getStatusIcon(app.status)" class="mr-1"></i>{{ getStatusText(app.status) }}
          </span>
        </div>
        <p class="text-gray-700 mb-6 bg-white p-4 rounded-lg shadow-inner">{{ app.message }}</p>
        <div class="flex gap-4" *ngIf="app.status === 'pending'">
          <button (click)="updateStatus(app._id, 'accepted')" class="btn-success flex-1 py-3 ripple flex items-center justify-center"><i class="fas fa-check icon mr-2"></i>قبول</button>
          <button (click)="updateStatus(app._id, 'rejected')" class="btn-danger flex-1 py-3 ripple flex items-center justify-center"><i class="fas fa-times icon mr-2"></i>رفض</button>
        </div>
        <a *ngIf="app.status === 'accepted'" [routerLink]="['/inbox', app._id]" class="btn-primary w-full py-3 block text-center ripple flex items-center justify-center">
          <i class="fas fa-comments icon mr-2"></i>بدء الدردشة
        </a>
      </div>
    </div>
  `
})
export class ApplicationListComponent implements OnInit {
  @Input() jobId!: string;

  applications: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.loading = true;
    this.api.getApplicationsForJob(this.jobId).subscribe({
      next: (res) => {
        this.applications = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updateStatus(id: string, status: 'accepted' | 'rejected') {
    this.api.updateApplicationStatus(id, status).subscribe({
      next: () => this.loadApplications()
    });
  }

  getStatusText(status: string): string {
    return status === 'pending' ? 'معلق' : status === 'accepted' ? 'مقبول' : 'مرفوض';
  }

  getStatusClass(status: string): string {
    return status === 'pending' ? 'bg-warning text-gray-900' : status === 'accepted' ? 'bg-success text-white' : 'bg-danger text-white';
  }

  getStatusIcon(status: string): string {
    return status === 'pending' ? 'fas fa-hourglass-half' : status === 'accepted' ? 'fas fa-check-circle' : 'fas fa-times-circle';
  }
}
