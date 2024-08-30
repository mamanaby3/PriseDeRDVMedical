import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials = {
    name: '',
    email: '',
    tel: '',
    password: '',
    password_confirmation: '',
    role: '',
    specialite_id: '',
    dateNaissance: ''
  };
  specialiteName: string = ''; // Nom de la spécialité pour recherche
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private router: Router) { }

  // Méthode pour rechercher la spécialité et mettre à jour l'ID
  onSpecialiteChange(name: string) {
    if (name) {
      this.apiService.searchSpecialite(name).subscribe(
        response => {
          if (response && response.id) {
            this.credentials.specialite_id = response.id;
          } else {
            this.credentials.specialite_id = '';
            this.errorMessage = 'Spécialité non trouvée.';
          }
        },
        error => {
          console.error('Erreur lors de la recherche de la spécialité', error);
          this.errorMessage = 'Erreur lors de la recherche de la spécialité';
        }
      );
    } else {
      this.credentials.specialite_id = '';
    }
  }

  // Méthode appelée lors de la soumission du formulaire
  onRegister(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    if (this.credentials.password !== this.credentials.password_confirmation) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.apiService.register(this.credentials).subscribe(
      response => {
        if (response && response.success) {
          // Redirection après un enregistrement réussi
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = response.message || 'Erreur lors de l\'enregistrement';
        }
      },
      error => {
        console.error('Erreur lors de l\'enregistrement', error);
        this.errorMessage = 'Erreur lors de l\'enregistrement';
      }
    );
  }
}
