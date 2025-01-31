import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactions.asObservable();

  addTransaction(transaction: Transaction) {
    const current = this.transactions.value;
    this.transactions.next([...current, transaction]);
    localStorage.setItem('transactions', JSON.stringify(this.transactions.value));
  }

  getTransactions() {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      this.transactions.next(JSON.parse(stored));
    }
  }

  deleteTransaction(id: string) {
    const filtered = this.transactions.value.filter((t) => t.id !== id);
    this.transactions.next(filtered);
    localStorage.setItem('transactions', JSON.stringify(filtered));
  }
}
