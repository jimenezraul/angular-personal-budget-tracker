import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeadingTitleComponent } from '../../shared/heading-title/heading-title.component';
import { Transaction } from '../../models/transaction.model';
import { TransactionCardComponent } from '../../shared/transaction-card/transaction-card.component';
import { FloatingButtonComponent } from '../../shared/floating-button/floating-button.component';
import { TransactionModalComponent } from '../../shared/transaction-modal/transaction-modal.component';
import { TransactionService } from '../../services/transaction.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [HeadingTitleComponent, TransactionCardComponent, FloatingButtonComponent, TransactionModalComponent, AsyncPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  isModalOpen = false;
  currentTransaction: Partial<Transaction> = {};
  isEditing = false;
  onOpenModal() {
    this.isModalOpen = !this.isModalOpen
  }

  transactionService = inject(TransactionService)

  transactions$ = this.transactionService.transactions$;

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

}
