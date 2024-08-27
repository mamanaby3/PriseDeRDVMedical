import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null; // Pour afficher les messages d'erreur

  constructor(private apiService: ApiService, private router: Router) { }

  onLogin() {
    this.apiService.login(this.credentials).subscribe(
      response => {
        if (response.success) { // Vérifie si la connexion a réussi
          console.log('Login successful', response);
          // Stocke le token et le rôle dans localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);

          // Redirection en fonction du rôle de l'utilisateur
          switch (response.role) {
            case 'medecin':
              this.router.navigate(['/dashboard']);
              break;
            case 'patient':
              this.router.navigate(['/accueil']);
              break;
            case 'secretaire':
              this.router.navigate(['/secretaire-dashboard']);
              break;
            default:
              this.errorMessage = 'Unknown role';
          }
        } else {
          // Gère les erreurs renvoyées par l'API
          this.errorMessage = response.message;
        }
      },
      error => {
        // Gère les erreurs de la requête
        console.error('Login failed', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
