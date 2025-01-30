import { Component, input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-card',
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>()
}
