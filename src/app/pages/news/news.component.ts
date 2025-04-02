import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NewsArticle } from '../../models/types';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  template: `
    <header class="page-header">
      <h1>Actualités</h1>
      <p>Restez informé des dernières nouvelles de CFI Plasturgie</p>
    </header>

    <div class="news-grid">
      @for (article of news; track article.id) {
        <mat-card>
          <img mat-card-image [src]="article.imageUrl" [alt]="article.title">
          <mat-card-header>
            <mat-card-title>{{ article.title }}</mat-card-title>
            <mat-card-subtitle>
              <div class="article-meta">
                <span><mat-icon>calendar_today</mat-icon> {{ article.date }}</span>
                <mat-chip>{{ article.category }}</mat-chip>
              </div>
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ article.content.substring(0, 200) }}...</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/news', article.id]">
              Lire la suite
            </button>
          </mat-card-actions>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .page-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
      color: #3f51b5;
      margin-bottom: 0.5rem;
    }

    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    mat-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    mat-card-content {
      flex-grow: 1;
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .article-meta span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    img {
      height: 200px;
      object-fit: cover;
    }

    mat-chip {
      font-size: 0.85rem;
    }
  `]
})
export class NewsComponent {
  news: NewsArticle[] = [
    {
      id: '1',
      title: 'Signature du projet FIESP II à Sousse',
      content: 'Le Centre de Formation en Plasturgie (CFI Plasturgie) a signé aujourd\'hui un important accord de partenariat dans le cadre du projet FIESP II. Cette collaboration vise à renforcer les compétences des professionnels du secteur de la plasturgie en Tunisie. Le projet permettra la formation de plus de 200 personnes aux techniques modernes de transformation des plastiques.',
      date: '10/06/2023',
      category: 'Partenariat',
      imageUrl: 'https://picsum.photos/seed/fiesp/400/300'
    },
    {
      id: '2',
      title: 'Cérémonie de remise des certificats',
      content: 'Une cérémonie solennelle s\'est tenue hier pour célébrer la réussite de notre dernière promotion. Plus de 50 apprenants ont reçu leur certification en présence des représentants de l\'industrie et des autorités locales. Cette promotion affiche un taux de satisfaction exceptionnel de 95%.',
      date: '15/05/2023',
      category: 'Événement',
      imageUrl: 'https://picsum.photos/seed/ceremonie/400/300'
    },
    {
      id: '3',
      title: 'Lancement de nouvelles formations e-learning',
      content: 'CFI Plasturgie élargit son offre de formation avec le lancement de 5 nouveaux modules e-learning. Ces formations couvrent les domaines de l\'injection plastique, l\'extrusion et le contrôle qualité. Cette initiative s\'inscrit dans notre stratégie de digitalisation et d\'accessibilité de nos formations.',
      date: '01/04/2023',
      category: 'Formation',
      imageUrl: 'https://picsum.photos/seed/elearning/400/300'
    }
  ];
}