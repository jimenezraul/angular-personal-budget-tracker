import { Component, inject, OnInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { TransactionService } from '../../services/transaction.service';
import { SummaryService } from '../../services/summary.service';
import { Summary } from '../../models/summary.model';
import { TransactionCategory } from '../../enum/categories.enum';
import { Filters } from '../../models/filter.model';
import { Transaction } from '../../models/transaction.model';
import { ChartService } from '../../services/chart.service';


@Component({
  selector: 'app-reports',
  imports: [HeadingTitleComponent, CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  // Dependencies
  private transactionService = inject(TransactionService);
  private chartService = inject(ChartService);
  private summaryService = inject(SummaryService);
  private cdr = inject(ChangeDetectorRef);

  // Data
  summaryCards: Summary[] = [];
  transactions$ = this.transactionService.transactions$;
  filteredTransactions: Transaction[] = [];
  categories: string[] = Object.values(TransactionCategory);

  // Filters
  filters: Filters = { startDate: '', endDate: '', category: '' };

  // Charts
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;

  public pieChartData = this.chartService.pieChartData
  public barChartData = this.chartService.barChartData
  public chartOptions = this.chartService.chartOptions

  public pieChartType = this.summaryService.pieChartType;
  public barChartType = this.summaryService.barChartType;

  ngOnInit(): void {
    this.updateTransactions();
  }

  // Apply Filters
  applyFilters(): void {
    if (this.isFilterEmpty() || !this.validateDateRange()) {
      console.error('Invalid filters. Please ensure all fields are filled and dates are valid.');
      return;
    }
    this.updateTransactions();
  }

  // Reset Filters
  onReset(): void {
    this.filters = { startDate: '', endDate: '', category: '' };
    this.updateTransactions();
  }

  // Update Transactions and Charts
  private updateTransactions(): void {
    this.filteredTransactions = this.transactionService.getFilteredTransactions(this.filters);
    this.summaryCards = this.summaryService.calculateSummary(this.filteredTransactions);

    this.updatePieChartData(this.filteredTransactions);
    this.updateBarChartData(this.filteredTransactions);
  }

  // Update Pie Chart Data
  private updatePieChartData(transactions: Transaction[]): void {
    this.pieChartData = this.chartService.updatePieChartData(
      transactions,
      this.filters,
      this.pieChartData
    );

    this.refreshChart(0);
  }

  // Update Bar Chart Data
  private updateBarChartData(transactions: Transaction[]): void {
    this.barChartData = this.chartService.updateBarChartData(
      transactions,
      this.barChartData
    );

    this.refreshChart(1);
  }

  // Refresh Chart
  private refreshChart(index: number): void {
    const chart = this.charts?.toArray()[index];
    chart?.update();
    this.cdr.detectChanges();
  }

  // Validate Filters
  private isFilterEmpty(): boolean {
    return !this.filters.startDate || !this.filters.endDate;
  }

  private validateDateRange(): boolean {
    return this.summaryService.validateDateRange(this.filters.startDate, this.filters.endDate);
  }
}
