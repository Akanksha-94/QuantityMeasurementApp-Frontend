import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../../core/api/api-client';
import { QuantityInputDTO, QuantityMeasurementDTO, OperationType } from '../../core/models/api.models';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {
  constructor(private apiClient: ApiClientService) {}

  compare(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.apiClient.post<QuantityMeasurementDTO>('/api/v1/quantities/compare', input);
  }

  convert(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.apiClient.post<QuantityMeasurementDTO>('/api/v1/quantities/convert', input);
  }

  add(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.apiClient.post<QuantityMeasurementDTO>('/api/v1/quantities/add', input);
  }

  subtract(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.apiClient.post<QuantityMeasurementDTO>('/api/v1/quantities/subtract', input);
  }

  divide(input: QuantityInputDTO): Observable<QuantityMeasurementDTO> {
    return this.apiClient.post<QuantityMeasurementDTO>('/api/v1/quantities/divide', input);
  }

  getHistoryByOperation(operation: OperationType): Observable<QuantityMeasurementDTO[]> {
    return this.apiClient.get<QuantityMeasurementDTO[]>(`/api/v1/quantities/history/operation/${operation}`);
  }

  getHistoryByType(measurementType: string): Observable<QuantityMeasurementDTO[]> {
    return this.apiClient.get<QuantityMeasurementDTO[]>(`/api/v1/quantities/history/type/${measurementType}`);
  }

  getErrorHistory(): Observable<QuantityMeasurementDTO[]> {
    return this.apiClient.get<QuantityMeasurementDTO[]>('/api/v1/quantities/history/errored');
  }

  getOperationCount(operation: OperationType): Observable<number> {
    return this.apiClient.get<number>(`/api/v1/quantities/count/${operation}`);
  }
}