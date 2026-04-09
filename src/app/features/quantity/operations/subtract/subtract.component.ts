import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuantityService } from '../../quantity.service';
import { QuantityInputDTO, QuantityMeasurementDTO, MeasurementType } from '../../../../core/models/api.models';

@Component({
  selector: 'app-subtract',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subtract.component.html',
  styleUrl: './subtract.component.css'
})
export class SubtractComponent {
  subtractForm: FormGroup;
  loading = false;
  result: QuantityMeasurementDTO | null = null;
  errorMessage = '';

  measurementTypes: MeasurementType[] = ['LengthUnit', 'WeightUnit', 'VolumeUnit', 'TemperatureUnit'];

  constructor(
    private fb: FormBuilder,
    private quantityService: QuantityService
  ) {
    this.subtractForm = this.fb.group({
      thisValue: [5, [Validators.required, Validators.min(0)]],
      thisUnit: ['FEET', [Validators.required]],
      thisType: ['LengthUnit', [Validators.required]],
      thatValue: [12, [Validators.required, Validators.min(0)]],
      thatUnit: ['INCHES', [Validators.required]],
      thatType: ['LengthUnit', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.subtractForm.valid) {
      const formValue = this.subtractForm.value;
      if (formValue.thisType !== formValue.thatType) {
        this.errorMessage = 'Both quantities must have the same measurement type.';
        return;
      }
      if (formValue.thisType === 'TemperatureUnit') {
        this.errorMessage = 'Temperature arithmetic is not supported.';
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.result = null;

      const input: QuantityInputDTO = {
        thisQuantityDTO: {
          value: formValue.thisValue,
          unit: formValue.thisUnit,
          measurementType: formValue.thisType
        },
        thatQuantityDTO: {
          value: formValue.thatValue,
          unit: formValue.thatUnit,
          measurementType: formValue.thatType
        }
      };

      this.quantityService.subtract(input).subscribe({
        next: (response: QuantityMeasurementDTO) => {
          this.loading = false;
          this.result = response;
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Subtraction failed';
        }
      });
    }
  }
}
