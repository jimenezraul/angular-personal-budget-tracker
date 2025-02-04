import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { Filters } from '../models/filter.model';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    private transactions = new BehaviorSubject<Transaction[]>([]);
    transactions$ = this.transactions.asObservable();

    addTransaction(transaction: Transaction) {
        const current = this.transactions.value;
        transaction.id = this.generateId()
        this.transactions.next([...current, transaction]);
        localStorage.setItem('transactions', JSON.stringify(this.transactions.value));
    }

    getTransactions() {
        const stored = localStorage.getItem('transactions');
        if (stored) {
            this.transactions.next(JSON.parse(stored));
        }
    }

    updateTransaction(updatedTransaction: Transaction, id: string) {
        const currentTransactions = this.transactions.value;

        const updatedTransactions = currentTransactions.map((transaction) =>
            transaction.id === id
                ? { ...transaction, ...updatedTransaction }
                : transaction
        );

        this.transactions.next([...updatedTransactions]);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    }



    deleteTransaction(id: string) {
        const filtered = this.transactions.value.filter((t) => t.id !== id);
        this.transactions.next(filtered);
        localStorage.setItem('transactions', JSON.stringify(filtered));
    }

    // New method to filter transactions based on filters
    getFilteredTransactions(filters: Filters) {
        const { startDate, endDate, category } = filters;
        const transactions = this.transactions.value;

        // Filter the transactions based on the selected filters
        const filteredTransactions = transactions.filter((transaction) => {
            const categoryMatch = !category || transaction.category === category;
            const startDateMatch = !startDate || new Date(transaction.date) >= new Date(startDate);
            const endDateMatch = !endDate || new Date(transaction.date) <= new Date(endDate);

            return categoryMatch && startDateMatch && endDateMatch;
        });

        return filteredTransactions;
    }

    generateId(): string {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    }

}
