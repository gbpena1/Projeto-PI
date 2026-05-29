import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  get stars(): string {
    return '★'.repeat(this.product.rating) + '☆'.repeat(5 - this.product.rating);
  }

  onAdd(): void {
    this.addToCart.emit(this.product);
  }
}
