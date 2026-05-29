import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lancamentos',
  imports: [RouterLink, CommonModule],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.css'
})
export class LancamentosComponent implements OnInit, OnDestroy {

  // ── Propriedades da classe ──
  cart: any[] = [];
  private countdownInterval: any; // guarda o intervalo do countdown para poder parar depois

  // ── Executado quando o componente inicia ──
  ngOnInit() {
    // Expõe o changeQty no window para os botões do carrinho conseguirem chamá-lo
    (window as any)['changeQty'] = (i: number, delta: number) => this.changeQty(i, delta);
    // Inicia o countdown
    this.iniciarCountdown();
  }

  // ── Executado quando o componente é destruído (usuário sai da página) ──
  ngOnDestroy() {
    // Para o countdown para não ficar rodando em segundo plano
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  // ── Countdown ─────────────────────────────────────────────
  // Calcula e atualiza o tempo restante para o próximo lançamento
  iniciarCountdown() {
    const alvo = new Date();
    alvo.setDate(alvo.getDate() + 15); // próximo lançamento em 15 dias
    alvo.setHours(0, 0, 0, 0);

    const atualizar = () => {
      const agora = new Date();
      const diff = alvo.getTime() - agora.getTime();
      if (diff <= 0) {
        document.getElementById('dias')!.textContent = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      document.getElementById('dias')!.textContent     = String(d).padStart(2, '0');
      document.getElementById('horas')!.textContent    = String(h).padStart(2, '0');
      document.getElementById('minutos')!.textContent  = String(m).padStart(2, '0');
      document.getElementById('segundos')!.textContent = String(s).padStart(2, '0');
    };
    atualizar();
    this.countdownInterval = setInterval(atualizar, 1000); // atualiza a cada 1 segundo
  }

  // ── Navegação ─────────────────────────────────────────────
  // Redireciona para a página de login
  irParaLogin() {
    window.location.href = '/login';
  }

  // ── Carrinho ──────────────────────────────────────────────
  // Abre e fecha o sidebar do carrinho
  toggleCart() {
    document.getElementById('cartSidebar')!.classList.toggle('active');
    document.getElementById('cartOverlay')!.classList.toggle('active');
  }

  // Adiciona um produto ao carrinho ao clicar no botão
  addToCart(event: any) {
    event.stopPropagation();
    const card = event.target.closest('.lanc-card');
    const name = card.querySelector('.nome').textContent;
    const priceText = card.querySelector('.preco-novo').textContent.replace('R$','').replace(',','.').trim();
    const price = parseFloat(priceText);
    if (isNaN(price)) return;
    const existing = this.cart.find(i => i.name === name);
    if (existing) { existing.qty++; } else { this.cart.push({name, price, qty:1}); }
    this.renderCart();
    this.updateBadge();
  }

  // Renderiza os itens do carrinho na tela
  renderCart() {
    const container = document.getElementById('cartItems')!;
    if (!this.cart.length) {
      container.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
      this.updateTotals(0);
      return;
    }
    container.innerHTML = this.cart.map((item, i) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f3f4f6;">
        <div style="flex:1;min-width:0;">
          <p style="font-size:13px;font-weight:600;margin-bottom:4px;">${item.name}</p>
          <p style="font-size:12px;color:#6b7280;">R$ ${item.price.toFixed(2).replace('.',',')} × ${item.qty}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-left:12px;">
          <button onclick="changeQty(${i},-1)" style="width:24px;height:24px;border-radius:50%;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font-size:14px;">−</button>
          <span style="font-size:13px;font-weight:600;">${item.qty}</span>
          <button onclick="changeQty(${i},1)" style="width:24px;height:24px;border-radius:50%;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font-size:14px;">+</button>
        </div>
      </div>`).join('');
    const total = this.cart.reduce((s, i) => s + i.price * i.qty, 0);
    this.updateTotals(total);
  }

  // Aumenta ou diminui a quantidade de um item
  changeQty(i: number, delta: number) {
    this.cart[i].qty += delta;
    if (this.cart[i].qty <= 0) this.cart.splice(i, 1);
    this.renderCart();
    this.updateBadge();
  }

  // Atualiza os valores de subtotal e total
  updateTotals(total: number) {
    const fmt = (v: number) => 'R$ ' + v.toFixed(2).replace('.', ',');
    document.getElementById('subtotal')!.textContent = fmt(total);
    document.getElementById('cartTotal')!.textContent = fmt(total);
  }

  // Atualiza o número de itens no ícone do carrinho
  updateBadge() {
    const total = this.cart.reduce((s, i) => s + i.qty, 0);
    const btn = document.getElementById('cart-btn')!;
    btn.setAttribute('data-count', total > 0 ? String(total) : '');
  }

  // Alerta provisório de checkout
  checkout() { alert('Funcionalidade de checkout em breve!'); }

  // ── Modal de Produto ──────────────────────────────────────
  // Abre o modal com as informações do produto clicado
  abrirProduto(p: any) {
    (document.getElementById('modalImg') as HTMLImageElement).src = p.img;
    (document.getElementById('modalImg') as HTMLImageElement).alt = p.nome;
    document.getElementById('modalBadge')!.textContent = p.badge;
    document.getElementById('modalNome')!.textContent = p.nome;
    document.getElementById('modalDesc')!.textContent = p.desc;
    document.getElementById('modalPrecoOld')!.textContent = p.precoOld;
    document.getElementById('modalPrecoNew')!.textContent = p.precoNew;
    document.getElementById('modalInfo')!.textContent = p.info;
    document.getElementById('modalStars')!.innerHTML =
      '<span style="color:#f59e0b">' + p.stars + '</span><small style="color:#6b7280">(' + p.reviews + ' avaliações)</small>';
    const ul = document.getElementById('modalBeneficios')!;
    ul.innerHTML = '';
    p.beneficios.forEach((b: string) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.innerHTML = '<span style="color:#00b37e;margin-right:8px;font-weight:700;">✓</span><span style="font-size:13px;color:#374151">' + b + '</span>';
      ul.appendChild(li);
    });
    document.getElementById('produtoModal')!.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Fecha o modal
  fecharModal() {
    document.getElementById('produtoModal')!.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Fecha o modal se o clique for fora da caixa
  fecharModalFora(e: any) {
    if (e.target === document.getElementById('produtoModal')) this.fecharModal();
  }

  // Fecha o modal ao clicar em adicionar ao carrinho dentro dele
  addToCartModal() {
    this.fecharModal();
  }

  // ── Teclado ───────────────────────────────────────────────
  // Fecha o modal ao pressionar Escape
  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') this.fecharModal();
  }
}