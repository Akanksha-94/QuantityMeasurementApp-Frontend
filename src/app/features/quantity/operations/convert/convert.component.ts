import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuantityService } from '../../quantity.service';
import { QuantityInputDTO, QuantityMeasurementDTO, MeasurementType } from '../../../../core/models/api.models';

@Component({
  selector: 'app-convert',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './convert.component.html',
  styleUrl: './convert.component.css'
})
export class ConvertComponent {
  convertForm: FormGroup;
  loading = false;
  result: QuantityMeasurementDTO | null = null;
  errorMessage = '';

  measurementTypes: MeasurementType[] = ['LengthUnit', 'WeightUnit', 'VolumeUnit', 'TemperatureUnit'];

  constructor(
    private fb: FormBuilder,
    private quantityService: QuantityService
  ) {
    this.convertForm = this.fb.group({
      thisValue: [1, [Validators.required, Validators.min(0)]],
      thisUnit: ['GALLON', [Validators.required]],
      thisType: ['VolumeUnit', [Validators.required]],
      targetUnit: ['LITRE', [Validators.required]],
      targetType: ['VolumeUnit', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.convertForm.valid) {
      const formValue = this.convertForm.value;
      if (formValue.thisType !== formValue.targetType) {
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
          value: 0,
          unit: formValue.targetUnit,
          measurementType: formValue.targetType
        }
      };

      this.quantityService.convert(input).subscribe({
        next: (response: QuantityMeasurementDTO) => {
          this.loading = false;
          this.result = response;
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Conversion failed';
        }
      });
    }
  }
}
