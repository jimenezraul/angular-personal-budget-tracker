import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { links } from '../app.links';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive]
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  links = links

  constructor(private router: Router) { }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
