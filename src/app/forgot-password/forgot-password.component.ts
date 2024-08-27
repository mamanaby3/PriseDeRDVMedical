import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.apiService.sendResetLink(this.email).subscribe(
      response => {
        this.snackBar.open('Un lien de réinitialisation a été envoyé à votre adresse email.', 'Fermer', {
          duration: 5000, // Durée en millisecondes
          panelClass: ['success-snackbar'] // Utilisation de la classe CSS pour le succès
        });
      },
      error => {
        console.error('Erreur lors de l\'envoi du lien de réinitialisation', error);
        this.snackBar.open('Erreur lors de l\'envoi du lien de réinitialisation.', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar'] // Utilisation de la classe CSS pour l'erreur
        });
      }
    );
  }
}
