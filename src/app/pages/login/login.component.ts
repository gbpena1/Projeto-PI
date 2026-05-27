// 

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
 
  private auth = inject(AuthService);
  private router = inject(Router);
 
  onSubmit(): void {
    const ok = this.auth.login(this.email.trim(), this.senha);
    if (ok) {
      this.router.navigate(['/admin']);
    } else {
      this.erro = 'Email ou senha incorretos!';
    }
  }
}
 
