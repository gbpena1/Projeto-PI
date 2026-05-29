import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, FooterComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  offers = signal<Product[]>([]);
  combos = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.offers.set(products.filter(p => p.id <= 4));
        this.combos.set(products.filter(p => p.id > 4));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os produtos. Verifique se o servidor está rodando.');
        this.loading.set(false);
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}