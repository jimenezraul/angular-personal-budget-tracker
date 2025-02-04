import { Component, inject, input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-card',
  imports: [DatePipe, CurrencyPipe, CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>()
  transactionService = inject(TransactionService);
  isEditing = input.required<boolean>();

  deleteTransaction(transactionId: string): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(transactionId);
    }
  }

}
