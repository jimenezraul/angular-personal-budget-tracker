import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { links } from '../app.links';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dock-menu',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dock-menu.component.html',
  styleUrl: './dock-menu.component.css'
})
export class DockMenuComponent {
  links = links

  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
