import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="isOpen"
         class="fixed inset-0 bg-black bg-opacity-50 z-50
                flex items-center justify-center p-4">

      <div class="bg-white rounded-2xl shadow-2xl
                  max-w-lg w-full p-8">

        <h2 class="text-2xl font-bold text-center mb-2">
          تقديم على وظيفة
        </h2>

        <p class="text-center text-gray-600 mb-6 text-lg">
          {{ jobTitle }}
        </p>

        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">
            رسالة التقديم (اختياري)
          </label>

          <textarea
            [(ngModel)]="message"
            placeholder="اكتب رسالتك هنا... (خبراتك، سبب اهتمامك، إلخ)"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:border-blue-600 transition"
            rows="6">
          </textarea>
        </div>

        <div class="flex gap-4 justify-center">

          <!-- زر الإرسال -->
          <button
            (click)="submit()"
            [disabled]="loading || !message.trim()"
            class="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium
                   hover:bg-blue-700 transition
                   disabled:opacity-60
                   flex items-center justify-center gap-2">

            <i class="fas fa-paper-plane" *ngIf="!loading"></i>
            <i class="fas fa-spinner fa-spin" *ngIf="loading"></i>

            {{ loading ? 'جاري الإرسال...' : 'إرسال' }}
          </button>

          <!-- زر الإلغاء -->
          <button
            (click)="close()"
            [disabled]="loading"
            class="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl
                   font-medium hover:bg-gray-300 transition">
            إلغاء
          </button>

        </div>
      </div>
    </div>
  `
})
export class ApplyModalComponent {
  @Input() isOpen = false;
  @Input() jobTitle = '';
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<string>();

  message = '';
  loading = false;

  submit() {
    const trimmedMessage = this.message.trim();
    if (!trimmedMessage || this.loading) return;

    this.loading = true;
    this.onSubmit.emit(trimmedMessage);
  }

  close() {
    if (this.loading) return;

    this.onClose.emit();
    this.message = '';
    this.loading = false;
  }
}
