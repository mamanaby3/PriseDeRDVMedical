import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null; // Pour afficher les messages d'erreur

  constructor(private apiService: ApiService, private router: Router) { } // Injecter Router

  onLogin() {
    this.apiService.login(this.credentials).subscribe(
      response => {
        console.log('Login successful', response);
        // Optionnel : stocker le token dans localStorage
        localStorage.setItem('token', response.token);

        // Redirection après une connexion réussie
        this.router.navigate(['/accueil']); // Remplace '/dashboard' par l'URL vers laquelle tu veux rediriger
      },
      error => {
        console.error('Login failed', error);
        // Mettre à jour le message d'erreur
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
