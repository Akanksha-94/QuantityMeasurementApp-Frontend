import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStoreService } from '../../core/auth/auth.store';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private authStore = inject(AuthStoreService);
  isAuthenticated$ = this.authStore.isAuthenticated$;

  logout() {
    this.authStore.clearAuth();
  }
}
