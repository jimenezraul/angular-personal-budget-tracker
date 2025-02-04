import { Component, inject, OnInit } from '@angular/core';
import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { CommonModule } from '@angular/common';
import { Summary } from '../../models/summary.model';
import { Transaction } from '../../models/transaction.model';
import { Filters } from '../../models/filter.model';
import { SummaryService } from '../../services/summary.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  imports: [HeadingTitleComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  summaryService = inject(SummaryService)
  transactionService = inject(TransactionService)
  summaryCards: Summary[] = [];
  filters: Filters = { startDate: '', endDate: '', category: '' };

  ngOnInit(): void {
    const filteredTransactions = this.transactionService.getFilteredTransactions(this.filters);
    this.summaryCards = this.summaryService.calculateSummary(filteredTransactions);
  }
  
}
