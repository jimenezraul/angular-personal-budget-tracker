import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  imports: [],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.css'
})
export class FloatingButtonComponent {
  addTransaction() {
    console.log('addTransaction')
  }
}
