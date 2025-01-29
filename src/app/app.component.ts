import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardLayoutComponent } from "./layout/dashboard-layout/dashboard-layout.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'personal-budget-tracker';
}
