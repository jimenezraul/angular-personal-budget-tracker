import { Component } from '@angular/core';
import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [HeadingTitleComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  summaryCards = [
    {
      title: 'Income',
      amount: 2500,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Expenses',
      amount: 1200,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    {
      title: 'Balance',
      amount: 1300,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
  ];
}
