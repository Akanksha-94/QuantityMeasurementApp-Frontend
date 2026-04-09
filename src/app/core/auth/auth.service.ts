import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiClientService } from '../api/api-client';
import { AuthStoreService } from './auth.store';
import { LoginRequest, SignUpRequest, OAuth2LoginRequest, JwtAuthenticationResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiClient: ApiClientService,
    private authStore: AuthStoreService
  ) {}

  login(payload: LoginRequest): Observable<JwtAuthenticationResponse> {
    return this.apiClient.post<JwtAuthenticationResponse>('/api/v1/auth/login', payload).pipe(
      tap(auth => this.authStore.setAuth(auth))
    );
  }

  register(payload: SignUpRequest): Observable<JwtAuthenticationResponse> {
    return this.apiClient.post<JwtAuthenticationResponse>('/api/v1/auth/register', payload).pipe(
      tap(auth => this.authStore.setAuth(auth))
    );
  }

  logout(): Observable<void> {
    return this.apiClient.post<void>('/api/v1/auth/logout', {}).pipe(
      tap(() => this.authStore.clearAuth())
    );
  }

  googleLogin(payload: OAuth2LoginRequest): Observable<JwtAuthenticationResponse> {
    return this.apiClient.post<JwtAuthenticationResponse>('/api/v1/auth/oauth2/google', payload).pipe(
      tap(auth => this.authStore.setAuth(auth))
    );
  }
}