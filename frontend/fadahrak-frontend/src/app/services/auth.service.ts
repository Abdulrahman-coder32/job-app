import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      this.userSubject.next(JSON.parse(storedUser));
      console.log('تم تحميل المستخدم من localStorage');
    }
  }

  setUser(user: any, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
    console.log('تم حفظ التوكن والمستخدم في localStorage');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    console.log('تم تسجيل الخروج');
  }

  // دالة جلب المستخدم الحالي (اللي كانت ناقصة)
  getUser() {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user && user.role === role;
  }
}
