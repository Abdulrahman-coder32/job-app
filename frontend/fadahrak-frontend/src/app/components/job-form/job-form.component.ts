import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="relative">
          <i class="fas fa-store absolute right-4 top-4 text-gray-500"></i>
          <input [(ngModel)]="form.shop_name" name="shop_name" placeholder="اسم المحل" class="input-field pr-12" required />
        </div>
        <div class="relative">
          <i class="fas fa-tags absolute right-4 top-4 text-gray-500"></i>
          <input [(ngModel)]="form.category" name="category" placeholder="الفئة (مطاعم، كافيهات...)" class="input-field pr-12" required />
        </div>
        <div class="relative">
          <i class="fas fa-map-marker-alt absolute right-4 top-4 text-gray-500"></i>
          <input [(ngModel)]="form.governorate" name="governorate" placeholder="المحافظة" class="input-field pr-12" required />
        </div>
        <div class="relative">
          <i class="fas fa-city absolute right-4 top-4 text-gray-500"></i>
          <input [(ngModel)]="form.city" name="city" placeholder="المدينة" class="input-field pr-12" required />
        </div>
        <div class="md:col-span-2 relative">
          <i class="fas fa-list absolute right-4 top-4 text-gray-500"></i>
          <textarea [(ngModel)]="form.requirements" name="requirements" placeholder="المتطلبات" class="input-field min-h-[100px] pr-12" required></textarea>
        </div>
        <div class="relative">
          <i class="fas fa-clock absolute right-4 top-4 text-gray-500"></i>
          <input [(ngModel)]="form.working_hours" name="working_hours" placeholder="ساعات العمل" class="input-field pr-12" required />
        </div>
        <div class="relative">
          <i class="fas fa-money-bill-wave absolute right-4 top-4 text-gray-500"></i>
          <input [(ngModel)]="form.salary" name="salary" placeholder="الراتب" class="input-field pr-12" required />
        </div>
      </div>
      <button type="submit" [disabled]="loading" class="btn-primary w-full py-4 ripple flex items-center justify-center md:col-span-2">
        <ng-container *ngIf="!loading; else loadingSpinner">
          <i class="fas fa-plus icon mr-2"></i>نشر الوظيفة
        </ng-container>
        <ng-template #loadingSpinner>
          <i class="fas fa-spinner fa-spin icon mr-2"></i>جاري النشر...
        </ng-template>
      </button>
      <p *ngIf="error" class="text-danger text-center flex items-center justify-center"><i class="fas fa-exclamation-triangle icon mr-2"></i>{{ error }}</p>
    </form>
  `
})
export class JobFormComponent {
  @Output() submitSuccess = new EventEmitter<void>();

  form = {
    shop_name: '',
    category: '',
    governorate: '',
    city: '',
    requirements: '',
    working_hours: '',
    salary: ''
  };
  loading = false;
  error = '';

  constructor(private api: ApiService) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.api.createJob(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.form = { shop_name: '', category: '', governorate: '', city: '', requirements: '', working_hours: '', salary: '' };
        this.submitSuccess.emit();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error.msg || 'خطأ في النشر';
      }
    });
  }
}
