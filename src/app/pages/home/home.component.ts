import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
    <section class="hero">
      <h1>CFI Plasturgie</h1>
      <p>Plus de 400 formations disponibles pour votre développement professionnel</p>
    </section>

    <section class="stats">
      <div class="stat-item">
        <h3>23 000+</h3>
        <p>Personnes formées</p>
      </div>
      <div class="stat-item">
        <h3>83%</h3>
        <p>Taux de satisfaction</p>
      </div>
      <div class="stat-item">
        <h3>9</h3>
        <p>Collaborateurs experts</p>
      </div>
    </section>

    <section class="featured">
      <h2>Formations en vedette</h2>
      <div class="grid">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Formation en injection plastique</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Maîtrisez les techniques d'injection plastique avec nos experts.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" routerLink="/formations">En savoir plus</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>

    <section class="atingi">
      <h2>Plateforme Atingi</h2>
      <p>Découvrez notre plateforme d'apprentissage gratuite avec plus de 340 partenaires mondiaux</p>
      <a mat-raised-button color="primary" href="https://www.atingi.org/" target="_blank">
        Visiter Atingi
      </a>
    </section>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://picsum.photos/1920/1080');
      background-size: cover;
      color: white;
      margin: -20px -20px 2rem -20px;
    }

    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      text-align: center;
      margin-bottom: 3rem;
    }

    .stat-item h3 {
      font-size: 2rem;
      color: #3f51b5;
      margin-bottom: 0.5rem;
    }

    .featured, .atingi {
      margin-bottom: 3rem;
    }

    .atingi {
      text-align: center;
      padding: 2rem;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class HomeComponent {}