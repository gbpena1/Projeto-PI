import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  cartItems = this.items.asReadonly();

  totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product): void {
    const current = this.items();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      this.items.set(current.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items.set([...current, { product, quantity: 1 }]);
    }
  }

  changeQty(productId: number, change: number): void {
    const updated = this.items()
      .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + change } : i)
      .filter(i => i.quantity > 0);
    this.items.set(updated);
  }

  removeItem(productId: number): void {
    this.items.set(this.items().filter(i => i.product.id !== productId));
  }

  clear(): void {
    this.items.set([]);
  }
}
