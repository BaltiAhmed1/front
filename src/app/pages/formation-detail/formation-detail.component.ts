import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Formation } from '../../models/types';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-formation-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card *ngIf="formation">
      <img mat-card-image [src]="formation.imageUrl" [alt]="formation.title">
      <mat-card-header>
        <mat-card-title>{{ formation.title }}</mat-card-title>
        <mat-card-subtitle>
          <mat-icon>schedule</mat-icon> {{ formation.duration }}
        </mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <p class="description">{{ formation.description }}</p>

        <h3>Prérequis</h3>
        <mat-list>
          <mat-list-item *ngFor="let prerequisite of formation.prerequisites; trackBy: trackByFn">
            <mat-icon matListItemIcon>check</mat-icon>
            {{ prerequisite }}
          </mat-list-item>
        </mat-list>

        <h3>Objectifs</h3>
        <mat-list>
          <mat-list-item *ngFor="let objective of formation.objectives; trackBy: trackByFn">
            <mat-icon matListItemIcon>stars</mat-icon>
            {{ objective }}
          </mat-list-item>
        </mat-list>
      </mat-card-content>

      <mat-card-actions>
        <button mat-raised-button color="primary">S'inscrire à la formation</button>
        <button mat-button>Télécharger le programme</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 800px;
      margin: 0 auto;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 1.5rem 0;
    }

    h3 {
      color: #3f51b5;
      margin-top: 2rem;
    }

    mat-card-actions {
      padding: 1rem;
      display: flex;
      gap: 1rem;
    }

    img {
      height: 300px;
      object-fit: cover;
    }
  `]
})
export class FormationDetailComponent implements OnInit {
  formation: Formation | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dataService.getFormation(params['id']).subscribe(formation => {
        this.formation = formation;
      });
    });
  }

  trackByFn(index: number, item: string): number {
    return index;
  }
}