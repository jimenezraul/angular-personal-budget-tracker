import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { TransactionCategory } from '../../enum/categories.enum';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-modal',
  imports: [FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  @Input() isOpen: boolean = false;
  @Input() transaction: Partial<Transaction> = {};
  @Output() closeModal = new EventEmitter<void>();
  @Input() isUpdating = false;
  categories: string[] = Object.values(TransactionCategory);

  tService = inject(TransactionService)

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.isUpdating && this.transaction.id) {
        this.tService.updateTransaction(form.form.value, this.transaction.id)
      } else {
        this.tService.addTransaction(form.form.value)
      }
      form.reset()
      this.close(); 
    }
  }

  close() {
    this.closeModal.emit();
  }
}
