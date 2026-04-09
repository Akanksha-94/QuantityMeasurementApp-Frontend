import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuantityService } from '../../quantity.service';
import { QuantityInputDTO, QuantityMeasurementDTO, MeasurementType } from '../../../../core/models/api.models';

@Component({
  selector: 'app-divide',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './divide.component.html',
  styleUrl: './divide.component.css'
})
export class DivideComponent {
  divideForm: FormGroup;
  loading = false;
  result: QuantityMeasurementDTO | null = null;
  errorMessage = '';

  measurementTypes: MeasurementType[] = ['LengthUnit', 'WeightUnit', 'VolumeUnit', 'TemperatureUnit'];

  constructor(
    private fb: FormBuilder,
    private quantityService: QuantityService
  ) {
    this.divideForm = this.fb.group({
      thisValue: [10, [Validators.required, Validators.min(0)]],
      thisUnit: ['LITRE', [Validators.required]],
      thisType: ['VolumeUnit', [Validators.required]],
      thatValue: [2, [Validators.required, (control: any) => control.value === 0 ? { zeroValue: true } : null]],
      thatUnit: ['LITRE', [Validators.required]],
      thatType: ['VolumeUnit', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.divideForm.valid) {
      const formValue = this.divideForm.value;
      if (formValue.thisType !== formValue.thatType) {
        this.errorMessage = 'Both quantities must have the same measurement type.';
        return;
      }
      if (formValue.thisType === 'TemperatureUnit') {
        this.errorMessage = 'Temperature arithmetic is not supported.';
        return;
      }
      if (formValue.thatValue === 0) {
        this.errorMessage = 'Cannot divide by zero.';
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

      this.quantityService.divide(input).subscribe({
        next: (response: QuantityMeasurementDTO) => {
          this.loading = false;
          this.result = response;
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Division failed';
        }
      });
    }
  }
}
