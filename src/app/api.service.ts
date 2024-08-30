import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Specialite } from './models/specialite.model';
import { User } from './models/user.model';
import { Credentials } from './models/credentials.model';
import {Medecin} from "./models/medecin.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${this.apiUrl}/specialites`);
  }

  // Authentifie un utilisateur
  login(credentials: Credentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  // Optionnel : Enregistre un nouvel utilisateur
  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // Réinitialisation du mot de passe
  resetPassword(data: { token: string, email: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/password-reset]`, data);
  }

  searchSpecialite(name: string): Observable<any> {
    // Encode le nom pour éviter les problèmes de caractères spéciaux dans l'URL
    const encodedName = encodeURIComponent(name);
    return this.http.get<any>(`${this.apiUrl}/specialites/search?name=${encodedName}`);
  }

  getMedecinsBySpecialite(specialiteId: number): Observable<Medecin[]> {
    return this.http.get<Medecin[]>(`${this.apiUrl}/medecins?specialite_id=${specialiteId}`);
  }

  searchMedecins(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/specialites/search?name=${encodeURIComponent(name)}`);
  }

}
