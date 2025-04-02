import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule],
  template: `
    <div class="about-container">
      <header class="page-header">
        <h1>À propos de CFI Plasturgie</h1>
        <p>Centre de Formation et d'Innovation en Plasturgie</p>
      </header>

      <section class="mission-section">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Notre Mission</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>
              CFI Plasturgie est dédié à l'excellence dans la formation professionnelle 
              et l'innovation dans le domaine de la plasturgie. Notre mission est de :
            </p>
            <ul>
              <li>Soutenir l'évolution des collaborateurs dans l'industrie de la plasturgie</li>
              <li>Promouvoir la culture de l'innovation et de l'excellence technique</li>
              <li>Partager les connaissances et les meilleures pratiques du secteur</li>
              <li>Contribuer au développement durable de l'industrie plastique</li>
            </ul>
          </mat-card-content>
        </mat-card>
      </section>

      <section class="stats-section">
        <div class="stat-card">
          <mat-icon>school</mat-icon>
          <h3>23 000+</h3>
          <p>Personnes formées</p>
        </div>
        <div class="stat-card">
          <mat-icon>trending_up</mat-icon>
          <h3>83%</h3>
          <p>Taux de satisfaction</p>
        </div>
        <div class="stat-card">
          <mat-icon>groups</mat-icon>
          <h3>9</h3>
          <p>Collaborateurs experts</p>
        </div>
        <div class="stat-card">
          <mat-icon>menu_book</mat-icon>
          <h3>400+</h3>
          <p>Formations disponibles</p>
        </div>
      </section>

      <mat-divider></mat-divider>

      <section class="values-section">
        <h2>Nos Valeurs</h2>
        <div class="values-grid">
          <mat-card>
            <mat-card-header>
              <mat-icon>lightbulb</mat-icon>
              <mat-card-title>Innovation</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>
                Nous encourageons l'innovation continue et l'adoption des dernières 
                technologies dans l'industrie de la plasturgie.
              </p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon>eco</mat-icon>
              <mat-card-title>Durabilité</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>
                Nous promouvons des pratiques durables et responsables dans 
                la transformation des plastiques.
              </p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon>psychology</mat-icon>
              <mat-card-title>Expertise</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>
                Notre équipe d'experts assure une formation de haute qualité 
                basée sur une expérience pratique.
              </p>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-icon>handshake</mat-icon>
              <mat-card-title>Partenariat</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>
                Nous collaborons étroitement avec l'industrie pour garantir 
                des formations adaptées aux besoins réels.
              </p>
            </mat-card-content>
          </mat-card>
        </div>
      </section>

      <section class="partners-section">
        <h2>Notre Réseau</h2>
        <p class="partner-intro">
          Fiers partenaires de plus de 340 organisations à travers le monde via 
          la plateforme Atingi, nous contribuons à l'excellence de la formation 
          en plasturgie à l'échelle internationale.
        </p>
      </section>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
      color: #3f51b5;
      margin-bottom: 0.5rem;
    }

    .mission-section {
      margin-bottom: 3rem;
    }

    .mission-section ul {
      list-style-type: none;
      padding: 0;
    }

    .mission-section li {
      margin: 1rem 0;
      padding-left: 1.5rem;
      position: relative;
    }

    .mission-section li:before {
      content: "•";
      color: #3f51b5;
      font-weight: bold;
      position: absolute;
      left: 0;
    }

    .stats-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin: 3rem 0;
      text-align: center;
    }

    .stat-card {
      padding: 2rem;
      background: #f5f5f5;
      border-radius: 8px;
      transition: transform 0.2s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-card mat-icon {
      font-size: 2.5rem;
      height: 2.5rem;
      width: 2.5rem;
      color: #3f51b5;
      margin-bottom: 1rem;
    }

    .stat-card h3 {
      font-size: 2rem;
      color: #3f51b5;
      margin: 0.5rem 0;
    }

    .values-section {
      margin: 3rem 0;
    }

    .values-section h2 {
      text-align: center;
      color: #3f51b5;
      margin-bottom: 2rem;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .values-grid mat-card {
      height: 100%;
    }

    .values-grid mat-card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .values-grid mat-icon {
      color: #3f51b5;
    }

    .partners-section {
      margin: 3rem 0;
      text-align: center;
    }

    .partners-section h2 {
      color: #3f51b5;
      margin-bottom: 1rem;
    }

    .partner-intro {
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    mat-divider {
      margin: 3rem 0;
    }
  `]
})
export class AboutComponent {}