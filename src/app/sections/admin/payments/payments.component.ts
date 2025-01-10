import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  paymentType: string = 'cash';

  constructor(

  ) {}

  selectPayment(paymentType: string): void {
    console.log(paymentType)
    this.paymentType = paymentType;
  }

  submit(): void {
    if (!this.paymentType) {
      return;
    }
  }
}
