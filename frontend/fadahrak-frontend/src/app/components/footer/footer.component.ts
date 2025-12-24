import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12 mt-auto">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold mb-4 flex items-center"><i class="fas fa-building icon"></i>سَهلة</h3>
          <p class="text-gray-400">منصة التوظيف المحلي الأولى في مصر</p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center"><i class="fas fa-link icon"></i>روابط سريعة</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a routerLink="/" class="hover:text-white transition hover-scale flex items-center"><i class="fas fa-arrow-left icon text-sm"></i>الرئيسية</a></li>
            <li><a routerLink="/jobs" class="hover:text-white transition hover-scale flex items-center"><i class="fas fa-arrow-left icon text-sm"></i>الوظائف</a></li>
            <li><a routerLink="/about" class="hover:text-white transition hover-scale flex items-center"><i class="fas fa-arrow-left icon text-sm"></i>عننا</a></li>
            <li><a routerLink="/faq" class="hover:text-white transition hover-scale flex items-center"><i class="fas fa-arrow-left icon text-sm"></i>الأسئلة الشائعة</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center"><i class="fas fa-gavel icon"></i>السياسات</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a routerLink="/terms" class="hover:text-white transition hover-scale flex items-center"><i class="fas fa-arrow-left icon text-sm"></i>شروط الاستخدام</a></li>
            <li><a routerLink="/privacy" class="hover:text-white transition hover-scale flex items-center"><i class="fas fa-arrow-left icon text-sm"></i>سياسة الخصوصية</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center"><i class="fas fa-phone-alt icon"></i>تواصل معنا</h3>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center"><i class="fas fa-envelope icon text-sm mr-2"></i>info&#64;sahlaa.com</li>
            <li class="flex items-center"><i class="fas fa-phone icon text-sm mr-2"></i>+20 1060757463</li>
          </ul>
          <div class="mt-4 flex gap-4">
            <a href="https://facebook.com" target="_blank" class="text-2xl hover:text-white transition hover-scale"><i class="fab fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank" class="text-2xl hover:text-white transition hover-scale"><i class="fab fa-twitter"></i></a>
            <a href="https://instagram.com" target="_blank" class="text-2xl hover:text-white transition hover-scale"><i class="fab fa-instagram"></i></a>
            <a href="https://linkedin.com" target="_blank" class="text-2xl hover:text-white transition hover-scale"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8 border-t border-gray-700 pt-4 text-gray-400">
        © 2025 سَهلة - جميع الحقوق محفوظة
      </div>
    </footer>
  `
})
export class FooterComponent {}
