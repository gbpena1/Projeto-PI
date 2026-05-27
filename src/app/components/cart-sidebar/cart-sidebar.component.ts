import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  cartService = inject(CartService);

  checkout(): void {
    if (this.cartService.totalItems() === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const total = this.cartService.totalPrice().toFixed(2).replace('.', ',');
    alert(`Pedido de R$ ${total} realizado com sucesso!`);
    this.cartService.clear();
    this.close.emit();
  }
}
