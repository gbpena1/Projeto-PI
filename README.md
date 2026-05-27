# Flow Sup 🏋️

Loja de suplementos desenvolvida como Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas — Senac São Paulo.

O projeto simula um e-commerce de suplementos com vitrine de produtos, carrinho de compras interativo, sistema de autenticação e área administrativa.

---

## Demonstração

> Em breve: link do deploy via GitHub Pages ou Vercel.

---

## Funcionalidades

- Vitrine de produtos com seções de ofertas e combos
- Carrinho de compras com sidebar interativo (adicionar, remover, alterar quantidade)
- Cálculo automático de total
- Tela de login com validação de credenciais
- Tela de cadastro com confirmação de senha
- Área administrativa para visualizar, editar e excluir produtos
- Navegação com lazy loading por rota

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Angular | 19 |
| TypeScript | 5.6 |
| Angular Signals | nativo (19) |
| Angular Router | lazy loading |
| FormsModule | template-driven |

---

## Como rodar o projeto

**Pré-requisitos:** Node.js 18+ e Angular CLI instalados.

```bash
# 1. Clone o repositório
git clone https://github.com/gbpena1/Projeto-PI.git
cd Projeto-PI

# 2. Instale as dependências
npm install

# 3. Suba o servidor de desenvolvimento
ng serve
```

Acesse `http://localhost:4200` no navegador.

**Credenciais de acesso à área admin:**
```
Usuário: admin
Senha:   admin123
```

---

## Estrutura do projeto

```
src/
├── app/
│   ├── components/       # Componentes reutilizáveis (navbar, footer, cart-sidebar, product-card)
│   ├── pages/            # Páginas com rotas próprias (home, login, cadastro, admin)
│   ├── services/         # Lógica de negócio (ProductService, CartService, AuthService)
│   ├── models/           # Interfaces TypeScript (Product, CartItem)
│   ├── app.routes.ts     # Rotas com lazy loading
│   └── app.config.ts     # Configuração da aplicação
└── assets/               # Imagens dos produtos
```

---

## Decisões técnicas

- **Standalone components:** todos os componentes usam a arquitetura standalone do Angular 19, sem NgModules.
- **Signals:** o estado do carrinho e da autenticação são gerenciados com `signal()` e `computed()`, sem RxJS.
- **Lazy loading:** cada página é carregada sob demanda via `loadComponent`, reduzindo o bundle inicial.
- **inject():** injeção de dependência usando a função `inject()` ao invés de constructor injection.

---

## Próximas melhorias

- [ ] Implementar `AuthGuard` para proteger a rota `/admin`
- [ ] Adicionar validação com `ReactiveFormsModule` nas páginas de login e cadastro
- [ ] Persistência do carrinho com `localStorage`
- [ ] Página de produto individual
- [ ] Deploy automático via GitHub Actions

---

## Autor

**Gabriel Pena**
[LinkedIn](https://linkedin.com/in/gabriel-pena0) · [GitHub](https://github.com/gbpena1)

Estudante de ADS — Senac São Paulo · Back-End Developer (Java/Spring Boot)
