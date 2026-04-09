import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuantityService } from '../../quantity.service';
import { QuantityInputDTO, QuantityMeasurementDTO, MeasurementType } from '../../../../core/models/api.models';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  addForm: FormGroup;
  loading = false;
  result: QuantityMeasurementDTO | null = null;
  errorMessage = '';

  measurementTypes: MeasurementType[] = ['LengthUnit', 'WeightUnit', 'VolumeUnit', 'TemperatureUnit'];

  constructor(
    private fb: FormBuilder,
    private quantityService: QuantityService
  ) {
    this.addForm = this.fb.group({
      thisValue: [1, [Validators.required, Validators.min(0)]],
      thisUnit: ['KILOGRAM', [Validators.required]],
      thisType: ['WeightUnit', [Validators.required]],
      thatValue: [500, [Validators.required, Validators.min(0)]],
      thatUnit: ['GRAM', [Validators.required]],
      thatType: ['WeightUnit', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const formValue = this.addForm.value;
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

      this.quantityService.add(input).subscribe({
        next: (response: QuantityMeasurementDTO) => {
          this.loading = false;
          this.result = response;
        },
        error: (error: any) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Addition failed';
        }
      });
    }
  }
}
