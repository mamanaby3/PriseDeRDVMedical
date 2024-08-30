import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Specialite} from "../models/specialite.model";
import {ApiService} from "../api.service";
import {debounceTime, Subject, switchMap} from "rxjs";
import {Medecin} from "../models/medecin.model"; // Assurez-vous d'importer HttpClient

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  filteredMedecins: any[] = [];

  constructor(private apiService: ApiService) { }

  onSearch(name: string): void {
    if (!name) return; // Ne pas rechercher si le champ est vide

    this.apiService.searchMedecins(name).subscribe(
      (data: any[]) => {
        console.log('Données reçues:', data); // Ajoutez ce log
        this.filteredMedecins = data;
      },
      (error: any) => {
        console.error('Erreur lors de la recherche des médecins', error);
      }
    );
  }
}
