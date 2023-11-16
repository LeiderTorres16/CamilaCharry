import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:4001/email';

  constructor(private httpClient: HttpClient) {}

  confirmPurchase(customerData: any, orderDetails: any[]): Observable<any> {
    const payload = { customerData, orderDetails };
    return this.httpClient.post(`${this.apiUrl}/sendPurchaseNotification`, payload);
  }
}