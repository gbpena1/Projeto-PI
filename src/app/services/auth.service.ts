import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = signal(false);

  isLoggedIn = this.loggedIn.asReadonly();

  login(email: string, password: string): boolean {
    if (email === 'admin' && password === 'admin123') {
      this.loggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
