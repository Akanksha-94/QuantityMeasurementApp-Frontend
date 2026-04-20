import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtAuthenticationResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private readonly STORAGE_KEY = 'auth-storage';

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public token$ = this.tokenSubject.asObservable();
  public userId$ = this.userIdSubject.asObservable();
  public username$ = this.usernameSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  get token(): string | null {
    return this.tokenSubject.value;
  }

  get userId(): number | null {
    return this.userIdSubject.value;
  }

  get username(): string | null {
    return this.usernameSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.restoreAuthFromStorage();
  }

  setAuth(auth: JwtAuthenticationResponse): void {
    this.tokenSubject.next(auth.token);
    this.userIdSubject.next(auth.userId);
    this.usernameSubject.next(auth.username);
    this.isAuthenticatedSubject.next(true);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(auth));
    }
  }

  clearAuth(): void {
    this.tokenSubject.next(null);
    this.userIdSubject.next(null);
    this.usernameSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  restoreAuthFromStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const auth: JwtAuthenticationResponse = JSON.parse(stored);
        this.setAuth(auth);
      } catch (error) {
        this.clearAuth();
      }
    }
  }
}