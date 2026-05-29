import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-loja',
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {

  // Lista de produtos vinda do servidor
  produtos: Product[] = [];
  // Lista filtrada que aparece na tela
  produtosFiltrados: Product[] = [];
  // Controla se está carregando
  carregando = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  // Busca todos os produtos do servidor
  carregarProdutos() {
    this.carregando = true;
    this.productService.getAll().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.produtosFiltrados = produtos;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  // Filtra produtos pelo nome digitado na busca
  filtrarProdutos() {
    const q = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    this.produtosFiltrados = this.produtos.filter(p =>
      p.name.toLowerCase().includes(q)
    );
  }

  // Adiciona produto ao carrinho compartilhado
  addToCart(produto: Product) {
    this.cartService.addToCart(produto);
  }

  // Navega para o login
  irParaLogin() {
    window.location.href = '/login';
  }
}