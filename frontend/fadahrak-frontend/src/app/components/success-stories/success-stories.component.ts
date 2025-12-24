import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-stories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen py-12 px-4 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-7xl mx-auto">
        <h1 class="section-title text-4xl sm:text-5xl lg:text-6xl">قصص نجاح عملائنا</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-8 text-center hover:scale-105 transition">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6"></div>
            <p class="text-lg italic text-gray-700 mb-6">
              "لقيت موظف ممتاز في نفس الشارع في أقل من يومين! سَهلة غيرت طريقة توظيفي تمامًا"
            </p>
            <p class="font-bold text-primary text-xl">أحمد - صاحب سوبر ماركت، الجيزة</p>
          </div>

          <div class="card p-8 text-center hover:scale-105 transition">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6"></div>
            <p class="text-lg italic text-gray-700 mb-6">
              "كنت بدور على شغل قريب من البيت، ولقيت وظيفة مثالية في الكافيه تحت العمارة"
            </p>
            <p class="font-bold text-primary text-xl">سارة - باحثة عن عمل، القاهرة</p>
          </div>

          <div class="card p-8 text-center hover:scale-105 transition">
            <div class="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-6"></div>
            <p class="text-lg italic text-gray-700 mb-6">
              "التواصل المباشر ساعدني أختار أفضل المتقدمين بسرعة وكفاءة"
            </p>
            <p class="font-bold text-primary text-xl">محمد - صاحب صيدلية، الإسكندرية</p>
          </div>
        </div>

        <div class="text-center mt-16">
          <p class="text-2xl sm:text-3xl text-gray-800 mb-8">كن أنت القصة التالية!</p>
          <a routerLink="/jobs" class="btn-primary px-12 py-5 rounded-full text-xl inline-flex items-center gap-3">
            <i class="fas fa-rocket"></i> ابدأ رحلتك الآن
          </a>
        </div>
      </div>
    </div>
  `
})
export class SuccessStoriesComponent {}
