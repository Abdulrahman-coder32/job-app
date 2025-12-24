import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobCardComponent],
  template: `
    <div class="min-h-screen py-12 px-4 sm:py-16 sm:px-6 lg:py-20 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-7xl mx-auto">
        <h1 class="section-title text-3xl sm:text-4xl lg:text-5xl">الوظائف المتاحة</h1>

        <!-- الفلاتر - responsive -->
        <div class="card p-6 sm:p-8 mb-8 lg:mb-12">
          <form (ngSubmit)="applyFilters()" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <!-- المحافظة -->
            <div>
              <label class="block text-gray-700 font-medium mb-2 flex items-center">
                <i class="fas fa-map-marker-alt icon mr-2"></i> المحافظة
              </label>
              <select [(ngModel)]="filters.governorate" name="governorate" class="input-field" (change)="onGovernorateChange()">
                <option value="">كل المحافظات</option>
                <option *ngFor="let gov of governorates" [value]="gov">{{ gov }}</option>
              </select>
            </div>

            <!-- المدينة -->
            <div>
              <label class="block text-gray-700 font-medium mb-2 flex items-center">
                <i class="fas fa-city icon mr-2"></i> المدينة
              </label>
              <select [(ngModel)]="filters.city" name="city" class="input-field">
                <option value="">كل المدن</option>
                <option *ngFor="let city of cities" [value]="city">{{ city }}</option>
              </select>
            </div>

            <!-- الفئة -->
            <div>
              <label class="block text-gray-700 font-medium mb-2 flex items-center">
                <i class="fas fa-tags icon mr-2"></i> الفئة
              </label>
              <select [(ngModel)]="filters.category" name="category" class="input-field">
                <option value="">كل الفئات</option>
                <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
              </select>
            </div>

            <!-- زر التصفية - ياخد العرض كامل على الموبايل -->
            <div class="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center sm:justify-end mt-4">
              <button type="submit" class="btn-primary px-8 py-4 rounded-full flex items-center gap-3 w-full sm:w-auto justify-center">
                <i class="fas fa-filter icon"></i> تصفية النتائج
              </button>
            </div>
          </form>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="text-center py-20">
          <i class="fas fa-spinner fa-spin text-5xl sm:text-6xl text-primary"></i>
          <p class="mt-4 text-lg sm:text-xl">جاري تحميل الوظائف...</p>
        </div>

        <!-- الوظائف - responsive grid -->
        <div *ngIf="!loading && jobs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <app-job-card *ngFor="let job of jobs" [job]="job" [hasApplied]="appliedJobs.includes(job._id)" (applySuccess)="loadJobs()"></app-job-card>
        </div>

        <!-- لا توجد وظائف -->
        <div *ngIf="!loading && jobs.length === 0" class="text-center py-20">
          <i class="fas fa-exclamation-triangle text-5xl sm:text-6xl text-warning mb-4"></i>
          <p class="text-xl sm:text-2xl text-gray-600">لا توجد وظائف تطابق الفلاتر المختارة</p>
          <button (click)="resetFilters()" class="btn-primary mt-6 px-8 py-4 rounded-full">
            إعادة تعيين الفلاتر
          </button>
        </div>
      </div>
    </div>
  `
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  appliedJobs: string[] = [];
  loading = true;

  filters = {
    governorate: '',
    city: '',
    category: ''
  };

  governorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية', 'الغربية', 'البحيرة', 'المنوفية',
    'القليوبية', 'كفر الشيخ', 'الفيوم', 'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا', 'أسوان',
    'الأقصر', 'البحر الأحمر', 'الوادي الجديد', 'مرسى مطروح', 'شمال سيناء', 'جنوب سيناء',
    'الإسماعيلية', 'بورسعيد', 'السويس', 'دمياط'
  ];

  categories = [
    'مطاعم', 'كافيهات', 'سوبر ماركت', 'صيدليات', 'محلات ملابس', 'محلات أحذية', 'محلات إكسسوارات',
    'محلات موبايلات', 'محلات كمبيوتر', 'جيم', 'صالون تجميل', 'حضانة', 'مغسلة', 'كوافير', 'أخرى'
  ];

  cities: string[] = [];

  private citiesMap: { [key: string]: string[] } = {
    'القاهرة': ['مدينة نصر', 'المطرية', 'حلوان', 'المعادي', 'شبرا', 'الزيتون', 'عين شمس', 'وسط البلد', 'الدقي', 'المهندسين', 'مصر الجديدة', 'الزمالك', 'حدائق القبة', 'روض الفرج'],
    'الجيزة': ['الهرم', 'فيصل', '6 أكتوبر', 'الشيخ زايد', 'الدقي', 'المهندسين', 'إمبابة', 'بولاق الدكرور', 'الوراق'],
    'الإسكندرية': ['محرم بك', 'سموحة', 'سان ستيفانو', 'العجمي', 'ميامي', 'الرمل', 'سبورتنج', 'لوران', 'المنتزه'],
    'الدقهلية': ['المنصورة', 'ميت غمر', 'طلخا', 'دكرنس', 'بلقاس', 'شربين'],
    'الشرقية': ['الزقازيق', 'منيا القمح', 'بلبيس', 'فاقوس', 'أبو كبير', 'ههيا'],
    // باقي المحافظات...
    '': []
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadJobs();
  }

  onGovernorateChange() {
    this.filters.city = '';
    const selectedGov = this.filters.governorate;
    const newCities = this.citiesMap[selectedGov] || [];
    this.cities = [...newCities]; // reference جديد عشان Angular يحدث الـ view
  }

  applyFilters() {
    this.loadJobs();
  }

  resetFilters() {
    this.filters = { governorate: '', city: '', category: '' };
    this.cities = [];
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.api.getJobs(this.filters).subscribe({
      next: (res) => {
        this.jobs = res;
        this.loadMyApplications();
      },
      error: () => this.loading = false
    });
  }

  loadMyApplications() {
    this.api.getMyApplications().subscribe({
      next: (res: any[]) => {
        this.appliedJobs = res.map(app => app.job_id._id || app.job_id);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
