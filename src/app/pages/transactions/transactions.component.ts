import { Component } from '@angular/core';
import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { Transaction } from '../../models/transaction.model';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';

@Component({
  selector: 'app-transactions',
  imports: [HeadingTitleComponent, TransactionCardComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: Transaction[] = [
    {
      id: '1',
      amount: 500,
      type: 'Income',
      date: new Date('2025-01-10'),
      category: 'Salary',
      description: 'January paycheck',
    },
    {
      id: '2',
      amount: 200,
      type: 'Expense',
      date: new Date('2025-01-12'),
      category: 'Groceries',
      description: 'Weekly grocery shopping',
    },
    {
      id: '3',
      amount: 50,
      type: 'Expense',
      date: new Date('2025-01-15'),
      category: 'Transportation',
      description: 'Gas for car',
    }
  ];

}
