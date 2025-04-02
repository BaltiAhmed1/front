import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Instructor } from '../../models/types';

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <header class="page-header">
      <h1>Nos Instructeurs</h1>
      <p>Découvrez notre équipe d'experts en plasturgie</p>
    </header>

    <div class="search-section">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Rechercher un instructeur</mat-label>
        <input matInput [(ngModel)]="searchTerm" (ngModelChange)="filterInstructors()">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
    </div>

    <div class="instructors-grid">
      @for (instructor of filteredInstructors; track instructor.id) {
        <mat-card>
          <img mat-card-image [src]="instructor.imageUrl" [alt]="instructor.name">
          <mat-card-header>
            <mat-card-title>{{ instructor.name }}</mat-card-title>
            <mat-card-subtitle>
              <div class="location">
                <mat-icon>location_on</mat-icon>
                {{ instructor.location.city }}, {{ instructor.location.country }}
              </div>
              <div class="rating">
                <mat-icon [class.gold]="instructor.rating >= 4.5">star</mat-icon>
                {{ instructor.rating }}
              </div>
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="bio">{{ instructor.bio.substring(0, 150) }}...</p>
            <div class="expertise-chips">
              @for (skill of instructor.expertise.slice(0, 3); track skill) {
                <mat-chip>{{ skill }}</mat-chip>
              }
              @if (instructor.expertise.length > 3) {
                <mat-chip>+{{ instructor.expertise.length - 3 }}</mat-chip>
              }
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/instructors', instructor.id]">
              Voir le profil
            </button>
 <a mat-button [href]="'mailto:' + instructor.contact.email">
  Envoyer un e-mail
</a>


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

    .search-section {
      max-width: 600px;
      margin: 0 auto 2rem;
    }

    .search-field {
      width: 100%;
    }

    .instructors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

    .location, .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .gold {
      color: #ffd700;
    }

    .bio {
      margin: 1rem 0;
      line-height: 1.5;
    }

    .expertise-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    img {
      height: 200px;
      object-fit: cover;
    }

    mat-card-actions {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
    }
  `]
})
export class InstructorsComponent {
  instructors: Instructor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Benali',
      bio: 'Experte en injection plastique avec plus de 15 ans d\'expérience dans l\'industrie. Docteur en science des matériaux de l\'École Polytechnique de Tunisie.',
      expertise: ['Injection plastique', 'Matériaux composites', 'Contrôle qualité', 'Optimisation des procédés'],
      contact: {
        email: 'sarah.benali@cfiplasturgie.tn',
        phone: '+216 71 234 567'
      },
      location: {
        city: 'Tunis',
        country: 'Tunisie'
      },
      rating: 4.8,
      imageUrl: 'https://picsum.photos/seed/sarah/400/300'
    },
    {
      id: '2',
      name: 'Mohamed Karray',
      bio: 'Spécialiste en extrusion et thermoformage. Plus de 20 ans d\'expérience dans la formation professionnelle et le conseil technique auprès des industriels.',
      expertise: ['Extrusion', 'Thermoformage', 'Maintenance industrielle', 'Formation pratique'],
      contact: {
        email: 'mohamed.karray@cfiplasturgie.tn',
        phone: '+216 71 234 568'
      },
      location: {
        city: 'Sfax',
        country: 'Tunisie'
      },
      rating: 4.6,
      imageUrl: 'https://picsum.photos/seed/mohamed/400/300'
    },
    {
      id: '3',
      name: 'Leila Mansouri',
      bio: 'Consultante en développement durable et économie circulaire. Experte en recyclage des plastiques et en éco-conception.',
      expertise: ['Recyclage', 'Éco-conception', 'Développement durable', 'Gestion des déchets'],
      contact: {
        email: 'leila.mansouri@cfiplasturgie.tn',
        phone: '+216 71 234 569'
      },
      location: {
        city: 'Sousse',
        country: 'Tunisie'
      },
      rating: 4.9,
      imageUrl: 'https://picsum.photos/seed/leila/400/300'
    }
  ];

  filteredInstructors: Instructor[] = this.instructors;
  searchTerm: string = '';

  filterInstructors() {
    if (!this.searchTerm.trim()) {
      this.filteredInstructors = this.instructors;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredInstructors = this.instructors.filter(instructor => 
      instructor.name.toLowerCase().includes(searchLower) ||
      instructor.expertise.some(skill => skill.toLowerCase().includes(searchLower)) ||
      instructor.location.city.toLowerCase().includes(searchLower) ||
      instructor.location.country.toLowerCase().includes(searchLower)
    );
  }
}