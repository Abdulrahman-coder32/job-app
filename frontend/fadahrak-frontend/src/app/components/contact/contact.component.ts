import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen py-12 px-4 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-4xl mx-auto">
        <div class="card p-8 sm:p-12">
          <h1 class="text-4xl sm:text-5xl font-bold text-center mb-8 text-primary">اتصل بنا</h1>
          <p class="text-xl text-center text-gray-600 mb-12">
            عندك سؤال أو اقتراح أو مشكلة؟ راسلنا وهنرد عليك في أقرب وقت
          </p>

          <form class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" placeholder="اسمك الكامل" class="input-field" required>
              <input type="email" placeholder="بريدك الإلكتروني" class="input-field" required>
            </div>
            <input type="text" placeholder="موضوع الرسالة" class="input-field" required>
            <textarea placeholder="اكتب رسالتك هنا..." rows="8" class="input-field" required></textarea>

            <div class="text-center">
              <button type="submit" class="btn-primary px-12 py-5 rounded-full text-xl">
                إرسال الرسالة
              </button>
            </div>
          </form>

          <div class="mt-12 text-center">
            <p class="text-lg text-gray-600 mb-6">أو تواصل معانا عبر:</p>
            <div class="flex justify-center gap-8 text-4xl">
              <a href="#" class="text-primary hover:scale-110 transition"><i class="fab fa-facebook"></i></a>
              <a href="#" class="text-primary hover:scale-110 transition"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-primary hover:scale-110 transition"><i class="fab fa-whatsapp"></i></a>
              <a href="#" class="text-primary hover:scale-110 transition"><i class="fas fa-envelope"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ContactComponent {}
