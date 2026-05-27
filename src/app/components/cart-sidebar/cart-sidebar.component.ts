import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
  private productService = inject(ProductService);

  checkout(): void {
    const items = this.cartService.cartItems();
    if (items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    const invalidItem = items.find(item => item.quantity > item.product.stock);
    if (invalidItem) {
      alert(`Quantidade solicitada maior que o estoque disponível para ${invalidItem.product.name}.`);
      return;
    }

    const total = this.cartService.totalPrice().toFixed(2).replace('.', ',');
    const updates = items.map(item => {
      const updatedProduct = {
        ...item.product,
        stock: Math.max(0, item.product.stock - item.quantity)
      };
      return this.productService.update(updatedProduct);
    });

    forkJoin(updates).subscribe({
      next: () => {
        alert(`Pedido de R$ ${total} realizado com sucesso!`);
        this.cartService.clear();
        this.close.emit();
      },
      error: () => {
        alert('Erro ao processar o pedido. Tente novamente mais tarde.');
      }
    });
  }
}
