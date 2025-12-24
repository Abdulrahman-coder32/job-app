import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen py-20 px-6 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div class="max-w-md mx-auto">
        <div class="card p-10">
          <h1 class="text-4xl font-bold text-center mb-8 flex justify-center items-center"><i class="fas fa-lock icon text-primary mr-2"></i>تسجيل الدخول</h1>
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="relative">
              <i class="fas fa-envelope absolute right-4 top-4 text-gray-500"></i>
              <input [(ngModel)]="form.email" name="email" type="email" placeholder="البريد الإلكتروني" class="input-field pr-12" required>
            </div>
            <div class="relative">
              <i class="fas fa-key absolute right-4 top-4 text-gray-500"></i>
              <input [(ngModel)]="form.password" name="password" type="password" placeholder="كلمة المرور" class="input-field pr-12" required>
            </div>
            <button type="submit" [disabled]="loading" class="btn-primary w-full py-4 ripple flex items-center justify-center">
              <ng-container *ngIf="!loading; else loadingSpinner">
                <i class="fas fa-sign-in-alt icon mr-2"></i>دخول
              </ng-container>
              <ng-template #loadingSpinner>
                <i class="fas fa-spinner fa-spin icon mr-2"></i>جاري الدخول...
              </ng-template>
            </button>
          </form>
          <p *ngIf="error" class="text-danger text-center mt-4 flex items-center justify-center"><i class="fas fa-exclamation-triangle icon mr-2"></i>{{ error }}</p>
          <p class="text-center mt-6 text-gray-600">
            ليس لديك حساب؟ <a routerLink="/signup" class="text-primary hover:underline">إنشاء حساب</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  form = { email: '', password: '' };
  loading = false;
  error = '';

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    this.api.login(this.form).subscribe({
      next: (res) => {
        this.authService.setUser(res.user, res.token);
        this.loading = false;
        this.router.navigate([res.user.role === 'shop_owner' ? '/owner-dashboard' : '/seeker-dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error.msg || 'خطأ في تسجيل الدخول';
      }
    });
  }
}
