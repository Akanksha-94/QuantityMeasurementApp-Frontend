import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuantityService } from '../../../features/quantity/quantity.service';
import { QuantityMeasurementDTO, MeasurementType } from '../../../core/models/api.models';

@Component({
  selector: 'app-type',
  imports: [CommonModule, FormsModule],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent implements OnInit {
  measurementTypes: MeasurementType[] = ['LengthUnit', 'WeightUnit', 'VolumeUnit', 'TemperatureUnit'];
  selectedType: MeasurementType = 'LengthUnit';
  history: QuantityMeasurementDTO[] = [];
  loading = false;
  errorMessage = '';

  constructor(private quantityService: QuantityService) {}

  ngOnInit() {
    this.loadHistory();
  }

  onTypeChange() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.errorMessage = '';
    this.quantityService.getHistoryByType(this.selectedType).subscribe({
      next: (data: QuantityMeasurementDTO[]) => {
        this.loading = false;
        this.history = data;
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to load history';
      }
    });
  }
}
