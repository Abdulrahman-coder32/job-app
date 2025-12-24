import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // أضفنا Router
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar [user]="currentUser" (logout)="onLogout()"></app-navbar>
    <main class="flex-grow">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser: any = null;
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router // أضفنا الـ Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout(); // تنظيف الـ localStorage والـ subject
    this.currentUser = null; // تنظيف الـ currentUser في الـ component
    this.router.navigate(['/']); // رجوع للصفحة الرئيسية (أو '/login' لو عايز)
  }
}
