import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  calculateSummary(transactions: Transaction[]) {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === 'Income')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.type === 'Expense')
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;

    return [
      {
        title: 'Income',
        amount: totalIncome,
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
      },
      {
        title: 'Expenses',
        amount: totalExpenses,
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
      },
      {
        title: 'Balance',
        amount: balance,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
      },
    ];
  }
}
