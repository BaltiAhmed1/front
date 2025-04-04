
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { NewsArticle } from '../../models/types';
import { LoadingSkeletonComponent } from '../../components/shared/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    LoadingSkeletonComponent
  ],
  template: `
    <div class="news-detail">
      @if (loading) {
        <div class="loading-container">
          <app-loading-skeleton
            [theme]="{
              'border-radius': '8px',
              height: '400px',
              'background-color': 'rgba(0, 0, 0, 0.1)'
            }"
          ></app-loading-skeleton>
        </div>
      } @else if (article) {
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
                <button mat-icon-button color="primary" aria-label="Partager sur Facebook">
                  <mat-icon>facebook</mat-icon>
                </button>
                <button mat-icon-button color="primary" aria-label="Partager sur Twitter">
                  <mat-icon>twitter</mat-icon>
                </button>
                <button mat-icon-button color="primary" aria-label="Partager sur LinkedIn">
                  <mat-icon>linkedin</mat-icon>
                </button>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button routerLink="/news">
              <mat-icon>arrow_back</mat-icon>
              Retour aux actualités
            </button>
          </mat-card-actions>
        </mat-card>
      } @else {
        <div class="error-container">
          <mat-icon>error_outline</mat-icon>
          <h2>Article non trouvé</h2>
          <p>Désolé, l'article que vous recherchez n'existe pas.</p>
          <button mat-raised-button color="primary" routerLink="/news">
            Voir toutes les actualités
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .news-detail {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    mat-card {
      margin-bottom: 2rem;
    }

    mat-card img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
    }

    .article-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
    }

    .article-meta span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .article-content {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 2rem 0;
    }

    .share-section {
      margin: 2rem 0;
      padding-top: 2rem;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .share-section h3 {
      margin-bottom: 1rem;
      color: #3f51b5;
    }

    .share-buttons {
      display: flex;
      gap: 1rem;
    }

    .error-container {
      text-align: center;
      padding: 4rem 2rem;
    }

    .error-container mat-icon {
      font-size: 4rem;
      height: 4rem;
      width: 4rem;
      color: #f44336;
      margin-bottom: 1rem;
    }

    .loading-container {
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .news-detail {
        padding: 1rem;
      }

      .article-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class NewsDetailComponent implements OnInit {
  article: NewsArticle | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Simulate loading data
    const id = this.route.snapshot.paramMap.get('id');
    this.loadArticle(id);
  }

  private loadArticle(id: string | null) {
    // Simulate API call
    setTimeout(() => {
      if (id === '1') {
        this.article = {
          id: '1',
          title: 'Signature du projet FIESP II à Sousse',
          content: 'Le Centre de Formation en Plasturgie (CFI Plasturgie) a signé aujourd\'hui un important accord de partenariat dans le cadre du projet FIESP II. Cette collaboration vise à renforcer les compétences des professionnels du secteur de la plasturgie en Tunisie. Le projet permettra la formation de plus de 200 personnes aux techniques modernes de transformation des plastiques.',
          date: '10/06/2023',
          category: 'Partenariat',
          imageUrl: 'https://picsum.photos/seed/fiesp/800/400'
        };
      }
      this.loading = false;
    }, 1000);
  }
}
