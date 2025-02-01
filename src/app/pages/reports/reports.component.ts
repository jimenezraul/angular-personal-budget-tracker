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
import { Transaction } from '../../models/transaction.model';
import { Filters } from '../../models/filter.model';

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

      const { labels, data } = this.summaryService.calculateCategoryTotals(transactions, this.filters);

      this.pieChartData.labels = labels;
      this.pieChartData.datasets[0].data = data;
      this.pieChartData.datasets[0].backgroundColor = this.summaryService.generateColors(labels.length);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Filters
  filters: Filters = {
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
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [], // You can set colors here if needed
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  public barChartType: ChartType = 'bar';
}
