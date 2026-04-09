import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityService } from '../../../features/quantity/quantity.service';
import { QuantityMeasurementDTO } from '../../../core/models/api.models';

@Component({
  selector: 'app-errors',
  imports: [CommonModule],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css'
})
export class ErrorsComponent implements OnInit {
  history: QuantityMeasurementDTO[] = [];
  loading = false;
  errorMessage = '';

  constructor(private quantityService: QuantityService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.errorMessage = '';
    this.quantityService.getErrorHistory().subscribe({
      next: (data: QuantityMeasurementDTO[]) => {
        this.loading = false;
        this.history = data;
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load error history';
      }
    });
  }
}
