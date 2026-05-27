import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, CartSidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartService = inject(CartService);
  cartOpen = false;

  toggleCart(): void { this.cartOpen = !this.cartOpen; }
}
