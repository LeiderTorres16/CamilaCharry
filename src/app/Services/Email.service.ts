import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { emailEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  endpointSendEmail: string

  constructor(private httpClient: HttpClient) { this.endpointSendEmail = emailEnvironment.sendEmail}

  confirmPurchase(customerData: any, orderDetails: any[]): Observable<any> {
    const payload = { customerData, orderDetails };
    return this.httpClient.post(this.endpointSendEmail, payload);
  }
}