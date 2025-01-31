import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  imports: [],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.css'
})
export class FloatingButtonComponent {
  @Output() isModalOpen = new EventEmitter<void>();

  onModalChange() {
    this.isModalOpen.emit()
  }
}
