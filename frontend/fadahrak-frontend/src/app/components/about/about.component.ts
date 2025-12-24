import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen py-12 px-4 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-6xl mx-auto">
        <div class="card p-8 sm:p-12 text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10 text-primary">عن سَهلة</h1>
          <p class="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-12 max-w-4xl mx-auto">
            سَهلة هي منصة مصرية بسيطة وفعالة تهدف لتسهيل عملية التوظيف المحلي بين أصحاب المحلات والباحثين عن عمل في نفس المنطقة.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="bg-primary/10 p-8 rounded-3xl hover:bg-primary/20 transition">
              <i class="fas fa-map-marked-alt text-5xl text-primary mb-6"></i>
              <h3 class="text-2xl font-bold mb-4">محلي 100%</h3>
              <p class="text-gray-700 text-lg">وظائف في منطقتك فقط، بدون سفر أو مواصلات</p>
            </div>
            <div class="bg-primary/10 p-8 rounded-3xl hover:bg-primary/20 transition">
              <i class="fas fa-comments text-5xl text-primary mb-6"></i>
              <h3 class="text-2xl font-bold mb-4">تواصل مباشر</h3>
              <p class="text-gray-700 text-lg">دردشة فورية مع صاحب العمل بعد القبول</p>
            </div>
            <div class="bg-primary/10 p-8 rounded-3xl hover:bg-primary/20 transition">
              <i class="fas fa-shield-alt text-5xl text-primary mb-6"></i>
              <h3 class="text-2xl font-bold mb-4">آمن وموثوق</h3>
              <p class="text-gray-700 text-lg">حماية بياناتك وتواصل آمن</p>
            </div>
          </div>

          <a routerLink="/jobs" class="btn-primary px-12 py-5 rounded-full text-xl inline-flex items-center gap-3 hover:scale-105 transition">
            <i class="fas fa-search"></i> ابدأ البحث عن وظيفتك
          </a>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
