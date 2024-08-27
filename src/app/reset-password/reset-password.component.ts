import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.apiService.resetPassword({
      token: this.token,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }).subscribe(
      response => {
        alert('Votre mot de passe a été réinitialisé avec succès.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erreur lors de la réinitialisation du mot de passe', error);
      }
    );
  }
}
