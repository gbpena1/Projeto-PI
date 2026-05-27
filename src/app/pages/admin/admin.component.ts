import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderAdminComponent } from '../../components/header-admin/header-admin.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderAdminComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  editing = signal<Product | null>(null);
  showModal = signal(false);
  loading = signal(true);
  error = signal('');

  newProduct = { name: '', price: 0, stock: 0 };

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar produtos. Verifique se o servidor está rodando.');
        this.loading.set(false);
      }
    });
  }

  // CREATE
  openModal(): void {
    this.newProduct = { name: '', price: 0, stock: 0 };
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
  }

  saveNew(): void {
    if (!this.newProduct.name.trim() || this.newProduct.price <= 0) return;

    const payload: Omit<Product, 'id'> = {
      name: this.newProduct.name.trim(),
      price: this.newProduct.price,
      oldPrice: this.newProduct.price,
      discount: 0,
      image: 'assets/favicon.ico',
      rating: 5,
      reviews: 0,
      stock: this.newProduct.stock
    };

    this.productService.add(payload).subscribe({
      next: () => {
        this.closeModal();
        this.loadProducts();
      },
      error: () => this.error.set('Erro ao adicionar produto.')
    });
  }

  // UPDATE
  startEdit(product: Product): void {
    this.editing.set({ ...product });
  }

  saveEdit(): void {
    const p = this.editing();
    if (!p) return;

    this.productService.update(p).subscribe({
      next: () => {
        this.editing.set(null);
        this.loadProducts();
      },
      error: () => this.error.set('Erro ao salvar alterações.')
    });
  }

  cancelEdit(): void {
    this.editing.set(null);
  }

  // DELETE
  delete(id: number): void {
    if (!confirm('Excluir este produto?')) return;

    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: () => this.error.set('Erro ao excluir produto.')
    });
  }
}
