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
  categories: string[] = Object.values(TransactionCategory);

  tService = inject(TransactionService)

  onSubmit(form: NgForm) {
    console.log(form)
    if (form.valid) {
      this.tService.addTransaction(form.form.value)
      form.reset()
      this.close(); // Close modal after saving
    }
  }

  close() {
    this.closeModal.emit();
  }
}
