import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import type { Filters } from '../models/filter.model'
import { ChartType } from 'chart.js';

@Injectable({
    providedIn: 'root',
})
export class SummaryService {
    public readonly pieChartType: ChartType = 'pie';
    public readonly barChartType: ChartType = 'bar';

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
    calculateCategoryTotals(transactions: Transaction[], filter: Filters): { labels: string[], data: number[] } {
        const filteredTransactions = this.applyTransactionFilters(transactions, filter);

        const categoryTotals: { [key: string]: number } = {};
        filteredTransactions.forEach((transaction) => {
            if (categoryTotals[transaction.category]) {
                categoryTotals[transaction.category] += transaction.amount;
            } else {
                categoryTotals[transaction.category] = transaction.amount;
            }
        });

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        return { labels, data };
    }

    private applyTransactionFilters(transactions: Transaction[], filters: Filters) {

        return transactions.filter((transaction) => {
            const matchesStartDate =
                !filters.startDate || new Date(transaction.date) >= new Date(filters.startDate);
            const matchesEndDate =
                !filters.endDate || new Date(transaction.date) <= new Date(filters.endDate);
            const matchesCategory =
                !filters.category || transaction.category === filters.category;

            return matchesStartDate && matchesEndDate && matchesCategory;
        });
    }

    generateColors(count: number): string[] {
        const colors = [
            '#4CAF50', '#F44336', '#FF9800', '#2196F3', '#9C27B0', '#00BCD4', '#8BC34A', '#FFC107', '#E91E63', '#03A9F4',
        ];
        return colors.slice(0, count);
    }

    // Calculate Income and Expenses
    public calculateIncomeAndExpenses(transactions: Transaction[]): [number, number, number] {
        const income = transactions
            .filter((t) => t.type === 'Income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = transactions
            .filter((t) => t.type === 'Expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expenses

        return [income, expenses, balance];
    }
}
