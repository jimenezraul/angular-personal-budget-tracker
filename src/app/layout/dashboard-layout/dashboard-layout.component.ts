import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { DockMenuComponent } from "../../shared/dock-menu/dock-menu.component";

@Component({
  selector: 'app-dashboard-layout',
  imports: [NavbarComponent, DockMenuComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
