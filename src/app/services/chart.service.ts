import { inject, Injectable } from "@angular/core";
import { ChartConfiguration, ChartData } from "chart.js";
import { SummaryService } from "./summary.service";

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private summaryService = inject(SummaryService);

  barChartData: ChartData<'bar', number[], string | string[]> = {
    labels: ['Financial Summary'],
    datasets: [
      {
        data: [],
        label: 'Income',
      },
      {
        data: [],
        label: 'Expenses',
      },
      {
        data: [],
        label: 'Balance',
      },
    ],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    aspectRatio: 2,
    plugins: { legend: { display: true, position: 'top' } },
  };

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  };

  updatePieChartData(
    transactions: any[],
    filters: any,
    existingPieChartData: ChartData<'pie', number[], string | string[]>
  ): ChartData<'pie', number[], string | string[]> {
    // Calculate labels and data
    const { labels, data } = this.summaryService.calculateCategoryTotals(transactions, filters);
  
    // Update the pie chart data
    return {
      ...existingPieChartData,
      labels,
      datasets: [
        {
          ...existingPieChartData.datasets[0],
          data,
          backgroundColor: this.summaryService.generateColors(data.length)
        },
      ],
    };
  }

  updateBarChartData(
    transactions: any[],
    existingBarChartData: ChartData<'bar', number[], string | string[]>
  ): ChartData<'bar', number[], string | string[]> {
    const [income, expenses, balance] = this.summaryService.calculateIncomeAndExpenses(transactions);
    const labels = ['Income', 'Expenses', 'Balance'];
    const colors = ['#42A5F5', '#FF6384', '#66BB6A'];
  
    const datasets = [income, expenses, balance].map((value, index) => ({
      data: [value],
      label: labels[index],
      backgroundColor: colors[index],
    }));
  
    return {
      ...existingBarChartData,
      datasets,
    };
  }
  
  
}