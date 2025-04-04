
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { Formation } from '../../models/types';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { LoadingSkeletonComponent } from '../../components/shared/loading-skeleton/loading-skeleton.component';

@Component({
  selector: 'app-formation-detail',
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
    <div class="formation-detail">
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
      } @else if (formation) {
        <div class="formation-header">
          <h1>{{ formation.title }}</h1>
          <mat-chip-set>
            <mat-chip>{{ formation.type }}</mat-chip>
            <mat-chip>{{ formation.duration }}</mat-chip>
          </mat-chip-set>
        </div>

        <mat-card class="formation-content">
          <img [src]="formation.imageUrl" [alt]="formation.title">
          
          <mat-card-content>
            <h2>Description</h2>
            <p>{{ formation.description }}</p>

            <h2>Objectifs de la formation</h2>
            <ul>
              @for (objective of formation.objectives; track objective) {
                <li>{{ objective }}</li>
              }
            </ul>

            <h2>Programme</h2>
            <div class="program-modules">
              @for (module of formation.program; track module.title) {
                <mat-card class="module-card">
                  <mat-card-header>
                    <mat-card-title>{{ module.title }}</mat-card-title>
                  </mat-card-header>
                  <mat-card-content>
                    <ul>
                      @for (item of module.items; track item) {
                        <li>{{ item }}</li>
                      }
                    </ul>
                  </mat-card-content>
                </mat-card>
              }
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="registerInterest()">
              S'inscrire à la formation
            </button>
            <button mat-button routerLink="/formations">
              Retour aux formations
            </button>
          </mat-card-actions>
        </mat-card>
      } @else {
        <div class="error-container">
          <mat-icon>error_outline</mat-icon>
          <h2>Formation non trouvée</h2>
          <p>Désolé, la formation que vous recherchez n'existe pas.</p>
          <button mat-raised-button color="primary" routerLink="/formations">
            Voir toutes les formations
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .formation-detail {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .formation-header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .formation-header h1 {
      font-size: 2.5rem;
      color: #3f51b5;
      margin-bottom: 1rem;
    }

    .formation-content {
      margin-bottom: 2rem;
    }

    .formation-content img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    h2 {
      color: #3f51b5;
      margin: 2rem 0 1rem;
    }

    ul {
      list-style-type: none;
      padding-left: 0;
    }

    li {
      margin: 0.5rem 0;
      padding-left: 1.5rem;
      position: relative;
    }

    li:before {
      content: "•";
      color: #3f51b5;
      position: absolute;
      left: 0;
    }

    .program-modules {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .module-card {
      height: 100%;
    }

    mat-card-actions {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
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
      .formation-detail {
        padding: 1rem;
      }

      .formation-header h1 {
        font-size: 2rem;
      }

      mat-card-actions {
        flex-direction: column;
        gap: 1rem;
      }

      mat-card-actions button {
        width: 100%;
      }
    }
  `]
})
export class FormationDetailComponent implements OnInit {
  formation: Formation | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFormation(id);
    }
  }

  private loadFormation(id: string) {
    this.loading = true;
    this.dataService.getFormation(id).subscribe({
      next: (formation) => {
        this.formation = formation || null;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.toastService.error('Erreur lors du chargement de la formation');
      }
    });
  }

  registerInterest() {
    this.toastService.success('Votre intérêt a été enregistré. Nous vous contacterons bientôt.');
  }
}
