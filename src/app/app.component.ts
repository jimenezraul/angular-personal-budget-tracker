import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'personal-budget-tracker';
  transactionService = inject(TransactionService)

  ngOnInit(): void {
    this.transactionService.getTransactions()
  }
}
