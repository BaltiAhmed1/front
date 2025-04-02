import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Formation } from '../../models/types';
import { DataService } from '../../services/data.service';
import { LoadingSkeletonComponent } from '../../components/shared/loading-skeleton/loading-skeleton.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    LoadingSkeletonComponent
  ],
  template: `
    <header class="page-header">
      <h1>Nos Formations</h1>
      <p>Découvrez notre catalogue complet de formations en plasturgie</p>
    </header>

    <div class="filters">
      <mat-chip-listbox (selectionChange)="filterByType($event)">
        <mat-chip-option selected>Tous</mat-chip-option>
        <mat-chip-option value="presentiel">Présentiel</mat-chip-option>
        <mat-chip-option value="elearning">E-learning</mat-chip-option>
      </mat-chip-listbox>
    </div>

    @if (loading) {
      <div class="grid">
        @for (item of [1,2,3]; track item) {
          <app-loading-skeleton
            [theme]="{
              'border-radius': '8px',
              height: '400px',
              'background-color': 'rgba(0, 0, 0, 0.1)'
            }"
          ></app-loading-skeleton>
        }
      </div>
    } @else {
      <div class="grid" role="list">
        @for (formation of filteredFormations; track formation.id) {
          <mat-card 
            class="formation-card"
            role="listitem"
            tabindex="0"
            [attr.aria-label]="formation.title">
            <img 
              mat-card-image 
              [src]="formation.imageUrl" 
              [alt]="formation.title"
              loading="lazy">
            <mat-card-header>
              <mat-card-title>{{ formation.title }}</mat-card-title>
              <mat-card-subtitle>
                <mat-icon>schedule</mat-icon> {{ formation.duration }}
              </mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ formation.description }}</p>
              <mat-chip-set>
                <mat-chip>{{ formation.type }}</mat-chip>
              </mat-chip-set>
            </mat-card-content>
            <mat-card-actions>
              <button 
                mat-button 
                color="primary" 
                [routerLink]="['/formations', formation.id]"
                (click)="announceNavigation(formation.title)">
                En savoir plus
              </button>
            </mat-card-actions>
          </mat-card>
        }
      </div>
    }
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

    .filters {
      margin-bottom: 2rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .formation-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease;
    }

    .formation-card:hover {
      transform: translateY(-4px);
    }

    .formation-card:focus-visible {
      outline: 3px solid #3f51b5;
      outline-offset: 2px;
    }

    mat-card-content {
      flex-grow: 1;
    }

    mat-card-subtitle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    mat-chip-set {
      margin-top: 1rem;
    }

    img {
      height: 200px;
      object-fit: cover;
    }

    @media (prefers-reduced-motion: reduce) {
      .formation-card {
        transition: none;
      }
    }
  `]
})
export class FormationsComponent implements OnInit {
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  loading = true;

  constructor(
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.dataService.getFormations().subscribe({
      next: (formations) => {
        this.formations = formations;
        this.filteredFormations = formations;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.toastService.error('Erreur lors du chargement des formations');
      }
    });
  }

  filterByType(event: any) {
    const type = event.value;
    this.filteredFormations = type ? 
      this.formations.filter(f => f.type === type) : 
      this.formations;
  }

  announceNavigation(title: string) {
    this.toastService.info(`Navigation vers ${title}`);
  }
}