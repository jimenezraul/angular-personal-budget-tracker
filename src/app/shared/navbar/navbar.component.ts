import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  links = [
    { path: '/', label: 'Dashboard' },
    { path: '/transactions', label: 'Transactions' },
    { path: '/reports', label: 'Reports' },
    { path: '/settings', label: 'Settings' },
  ];

  constructor(private router: Router) { }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
