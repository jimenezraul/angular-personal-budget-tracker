import { Component, ViewChild } from '@angular/core';
import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionCategory } from '../../enum/categories.enum';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  imports: [HeadingTitleComponent, CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {
  summaryCards = [
    { title: 'Income', amount: 2500, bgColor: 'bg-green-100', textColor: 'text-green-600' },
    { title: 'Expenses', amount: 1200, bgColor: 'bg-red-100', textColor: 'text-red-600' },
    { title: 'Balance', amount: 1300, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
  ];

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
