import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-modal',
  imports: [FormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  @Input() isOpen: boolean = false; // Controls visibility of modal
  @Input() transaction: Partial<Transaction> = {}; // Transaction data for editing
  @Output() closeModal = new EventEmitter<void>(); // Emits event to close modal
  @Output() saveTransaction = new EventEmitter<Transaction>(); // Emits the transaction when saved

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.saveTransaction.emit(this.transaction as Transaction);
      this.close(); // Close modal after saving
    }
  }

  close() {
    this.closeModal.emit();
  }
}
