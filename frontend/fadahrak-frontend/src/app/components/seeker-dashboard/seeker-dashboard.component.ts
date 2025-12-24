import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyApplicationsComponent } from '../my-applications/my-applications.component';
import { JobListComponent } from '../job-list/job-list.component';

@Component({
  selector: 'app-seeker-dashboard',
  standalone: true,
  imports: [CommonModule, MyApplicationsComponent, JobListComponent],
  template: `
    <div class="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-7xl mx-auto">
        <h1 class="section-title">لوحة تحكم الباحث عن عمل</h1>

        <!-- تقديماتي -->
        <section class="mb-20">
          <h2 class="text-3xl font-bold mb-8 flex items-center"><i class="fas fa-file-alt icon text-primary mr-2"></i>تقديماتي</h2>
          <app-my-applications></app-my-applications>
        </section>

        <!-- وظائف موصى بها -->
        <section>
          <h2 class="text-3xl font-bold mb-8 flex items-center"><i class="fas fa-thumbs-up icon text-primary mr-2"></i>وظائف موصى بها</h2>
          <app-job-list></app-job-list>
        </section>

        <div class="text-center bg-white p-8 rounded-2xl shadow-xl mt-20 animate-fade-in">
          <p class="text-xl text-gray-700 flex items-center justify-center">
            <i class="fas fa-lightbulb icon text-warning mr-2"></i>نصيحة: راجع تقديماتك بانتظام، وتابع حالة كل طلب. لو اتقبلت، ابدأ الدردشة فورًا مع صاحب العمل!
          </p>
        </div>
      </div>
    </div>
  `
})
export class SeekerDashboardComponent {}
