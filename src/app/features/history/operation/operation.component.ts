import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuantityService } from '../../quantity/quantity.service';
import { QuantityMeasurementDTO, OperationType } from '../../../core/models/api.models';

@Component({
  selector: 'app-operation',
  imports: [CommonModule, FormsModule],
  templateUrl: './operation.component.html',
  styleUrl: './operation.component.css'
})
export class OperationComponent implements OnInit {
  operations: OperationType[] = ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'COMPARE', 'CONVERT'];
  selectedOperation: OperationType = 'COMPARE';
  history: QuantityMeasurementDTO[] = [];
  loading = false;
  errorMessage = '';

  constructor(private quantityService: QuantityService) {}

  ngOnInit() {
    this.loadHistory();
  }

  onOperationChange() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.errorMessage = '';
    this.quantityService.getHistoryByOperation(this.selectedOperation).subscribe({
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
