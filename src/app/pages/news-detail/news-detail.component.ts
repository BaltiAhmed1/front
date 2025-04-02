import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { NewsArticle } from '../../models/types';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatChipsModule],
  template: `
    @if (article) {
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
          <div class="article-content">
            <p>{{ article.content }}</p>
          </div>

          <div class="share-section">
            <h3>Partager cet article</h3>
            <div class="share-buttons">
              <button mat-icon-button>
                <mat-icon>facebook</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon>twitter</mat-icon>
              </button>
              <button mat-icon-button>
                <mat-icon>linkedin</mat-icon>
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    }
  `,
  styles: [`
    mat-card {
      max-width: 800px;
      margin: 0 auto;
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

    .article-content {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 2rem 0;
    }

    .share-section {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #eee;
    }

    .share-section h3 {
      color: #3f51b5;
      margin-bottom: 1rem;
    }

    .share-buttons {
      display: flex;
      gap: 1rem;
    }

    img {
      height: 400px;
      object-fit: cover;
    }
  `]
})
export class NewsDetailComponent {
  article: NewsArticle | undefined;

  constructor(private route: ActivatedRoute) {
    const news = [
      {
        id: '1',
        title: 'Signature du projet FIESP II à Sousse',
        content: 'Le Centre de Formation en Plasturgie (CFI Plasturgie) a signé aujourd\'hui un important accord de partenariat dans le cadre du projet FIESP II. Cette collaboration vise à renforcer les compétences des professionnels du secteur de la plasturgie en Tunisie. Le projet permettra la formation de plus de 200 personnes aux techniques modernes de transformation des plastiques.',
        date: '10/06/2023',
        category: 'Partenariat',
        imageUrl: 'https://picsum.photos/seed/fiesp/400/300'
      }
    ];

    this.route.params.subscribe(params => {
      this.article = news.find(n => n.id === params['id']);
    });
  }
}