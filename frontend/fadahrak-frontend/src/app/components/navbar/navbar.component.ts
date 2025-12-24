import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">

          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center" (click)="closeMobileMenu()">
              <img src="assets/logo.png" alt="سَهلة" class="h-14 w-48 object-contain transition-transform duration-500 hover:scale-105">
            </a>
          </div>

          <!-- Desktop Links -->
          <div class="hidden md:flex items-center gap-6">
            <a routerLink="/" class="nav-link"><i class="fas fa-home icon"></i>الرئيسية</a>
            <a routerLink="/jobs" class="nav-link"><i class="fas fa-briefcase icon"></i>الوظائف</a>
            <a routerLink="/about" class="nav-link"><i class="fas fa-info-circle icon"></i>عننا</a>
            <a routerLink="/contact" class="nav-link"><i class="fas fa-envelope icon"></i>اتصل بنا</a>
          </div>

          <!-- Desktop Auth -->
          <div class="hidden md:flex items-center gap-4">
            <ng-container *ngIf="user; else guestDesktop">
              <a routerLink="/inbox" class="nav-link"><i class="fas fa-inbox icon"></i>الرسائل</a>
              <a [routerLink]="user.role === 'shop_owner' ? '/owner-dashboard' : '/seeker-dashboard'" class="nav-link"><i class="fas fa-tachometer-alt icon"></i>لوحة التحكم</a>
              <button (click)="onLogout()" class="text-red-600 hover:text-red-700 transition text-lg font-medium flex items-center gap-2"><i class="fas fa-sign-out-alt icon"></i>خروج</button>
            </ng-container>

            <ng-template #guestDesktop>
              <a routerLink="/login" class="nav-link"><i class="fas fa-sign-in-alt icon"></i>دخول</a>
              <a routerLink="/signup" class="btn-primary px-6 py-2 rounded-full flex items-center gap-2 text-lg font-medium"><i class="fas fa-user-plus icon"></i>إنشاء حساب</a>
            </ng-template>
          </div>

          <!-- Mobile Hamburger -->
          <div class="md:hidden flex items-center">
            <button (click)="mobileMenuOpen = !mobileMenuOpen"
                    class="relative w-8 h-8 focus:outline-none flex flex-col justify-between items-center">
              <span [ngClass]="{'rotate-45 translate-y-3': mobileMenuOpen}" class="block h-1 w-8 bg-black rounded-full transition-all duration-300"></span>
              <span [ngClass]="{'opacity-0': mobileMenuOpen}" class="block h-1 w-8 bg-black rounded-full transition-all duration-300"></span>
              <span [ngClass]="{'-rotate-45 -translate-y-3': mobileMenuOpen}" class="block h-1 w-8 bg-black rounded-full transition-all duration-300"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div [class.hidden]="!mobileMenuOpen" class="md:hidden bg-white shadow-lg border-t border-gray-200 transition-all duration-300">
          <div class="flex flex-col divide-y divide-gray-200">
            <a routerLink="/" class="mobile-link" (click)="closeMobileMenu()">الرئيسية</a>
            <a routerLink="/jobs" class="mobile-link" (click)="closeMobileMenu()">الوظائف</a>
            <a routerLink="/about" class="mobile-link" (click)="closeMobileMenu()">عننا</a>
            <a routerLink="/contact" class="mobile-link" (click)="closeMobileMenu()">اتصل بنا</a>

            <ng-container *ngIf="user; else guestMobile">
              <a routerLink="/inbox" class="mobile-link" (click)="closeMobileMenu()">الرسائل</a>
              <a [routerLink]="user.role === 'shop_owner' ? '/owner-dashboard' : '/seeker-dashboard'" class="mobile-link" (click)="closeMobileMenu()">لوحة التحكم</a>
              <button (click)="onLogout()" class="mobile-link text-red-600 text-left">خروج</button>
            </ng-container>

            <ng-template #guestMobile>
              <a routerLink="/login" class="mobile-link" (click)="closeMobileMenu()">دخول</a>
              <a routerLink="/signup" class="mobile-link bg-primary text-white text-center rounded-lg" (click)="closeMobileMenu()">إنشاء حساب</a>
            </ng-template>
          </div>
        </div>
      </div>
    </nav>

    <style>
      .nav-link {
        color: #374151;
        font-size: 1.125rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s;
      }
      .nav-link:hover {
        color: #4f46e5;
        transform: scale(1.05);
      }

      .mobile-link {
        display: block;
        padding: 0.75rem 1rem;
        font-size: 1.125rem;
        font-weight: 500;
        transition: all 0.2s;
        color: #1e3a8a;
      }
      .mobile-link:hover {
        background: #f3f4f6;
      }

      .btn-primary {
        background-color: #4f46e5;
        color: #fff;
      }
      .btn-primary:hover {
        background-color: #4338ca;
      }
    </style>
  `
})
export class NavbarComponent {
  @Input() user: any = null;
  mobileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/']);
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
