import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuantityService } from '../../quantity.service';
import { QuantityInputDTO, QuantityMeasurementDTO, MeasurementType } from '../../../../core/models/api.models';

@Component({
  selector: 'app-compare',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent {
  compareForm: FormGroup;
  loading = false;
  result: QuantityMeasurementDTO | null = null;
  errorMessage = '';

  measurementTypes: MeasurementType[] = ['LengthUnit', 'WeightUnit', 'VolumeUnit', 'TemperatureUnit'];

  constructor(
    private fb: FormBuilder,
    private quantityService: QuantityService
  ) {
    this.compareForm = this.fb.group({
      thisValue: [1, [Validators.required, Validators.min(0)]],
      thisUnit: ['FEET', [Validators.required]],
      thisType: ['LengthUnit', [Validators.required]],
      thatValue: [12, [Validators.required, Validators.min(0)]],
      thatUnit: ['INCHES', [Validators.required]],
      thatType: ['LengthUnit', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.compareForm.valid) {
      const formValue = this.compareForm.value;
      if (formValue.thisType !== formValue.thatType) {
        this.errorMessage = 'Both quantities must have the same measurement type.';
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

      this.quantityService.compare(input).subscribe({
        next: (response: QuantityMeasurementDTO) => {
          this.loading = false;
          this.result = response;
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Comparison failed';
        }
      });
    }
  }
}
