import { Component, inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';

import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { TransactionService } from '../../services/transaction.service';
import { Summary } from '../../models/summary.model';
import { SummaryService } from '../../services/summary.service';
import { TransactionCategory } from '../../enum/categories.enum';

@Component({
  selector: 'app-reports',
  imports: [HeadingTitleComponent, CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  summaryCards: Summary[] = [];
  private subscription: Subscription = Subscription.EMPTY;

  transactionService = inject(TransactionService);
  summaryService = inject(SummaryService)
  transactions$ = this.transactionService.transactions$;

  ngOnInit(): void {
    this.subscription = this.transactions$.subscribe((transactions) => {
      this.summaryCards = this.summaryService.calculateSummary(transactions);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Filters
  filters = {
    startDate: '',
    endDate: '',
    category: '',
  };

  // Categories
  categories: string[] = Object.values(TransactionCategory);

  // Apply Filters
  applyFilters() {
    console.log('Filters applied:', this.filters);
    // Fetch filtered data here
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Chart options
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Chart data and labels
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Food', 'Rent', 'Utilities', 'Entertainment'],
    datasets: [
      {
        data: [400, 300, 200, 100],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800', '#2196F3'],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';

  // Events (optional)
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
}
