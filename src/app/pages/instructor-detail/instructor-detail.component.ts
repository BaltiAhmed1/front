import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Instructor } from '../../models/types';

@Component({
  selector: 'app-instructor-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    @if (instructor) {
      <mat-card>
        <div class="profile-header">
          <img [src]="instructor.imageUrl" [alt]="instructor.name" class="profile-image">
          <div class="profile-info">
            <h1>{{ instructor.name }}</h1>
            <div class="meta-info">
              <span class="location">
                <mat-icon>location_on</mat-icon>
                {{ instructor.location.city }}, {{ instructor.location.country }}
              </span>
              <span class="rating">
                <mat-icon [class.gold]="instructor.rating >= 4.5">star</mat-icon>
                {{ instructor.rating }}
              </span>
            </div>
          </div>
        </div>

        <mat-divider></mat-divider>

        <mat-card-content>
          <section class="bio-section">
            <h2>Biographie</h2>
            <p>{{ instructor.bio }}</p>
          </section>

          <section class="expertise-section">
            <h2>Domaines d'expertise</h2>
            <div class="expertise-chips">
              @for (skill of instructor.expertise; track skill) {
                <mat-chip>{{ skill }}</mat-chip>
              }
            </div>
          </section>

          <section class="contact-section">
            <h2>Contact</h2>
            <div class="contact-info">
              <p>
                <mat-icon>email</mat-icon>
                <a [href]="'mailto:' + instructor.contact.email">{{ instructor.contact.email }}</a>
              </p>
              <p>
                <mat-icon>phone</mat-icon>
                <a [href]="'tel:' + instructor.contact.phone">{{ instructor.contact.phone }}</a>
              </p>
            </div>
          </section>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary">
            <mat-icon>calendar_today</mat-icon>
            Réserver une formation
          </button>
      <a mat-button [href]="'mailto:' + instructor.contact.email">
  Envoyer un e-mail
</a>

        </mat-card-actions>
      </mat-card>
    }
  `,
  styles: [`
    mat-card {
      max-width: 800px;
      margin: 0 auto;
    }

    .profile-header {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 2rem;
    }

    .profile-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }

    .profile-info {
      flex-grow: 1;
    }

    .profile-info h1 {
      font-size: 2rem;
      color: #3f51b5;
      margin-bottom: 1rem;
    }

    .meta-info {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .location, .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .gold {
      color: #ffd700;
    }

    section {
      margin: 2rem 0;
    }

    h2 {
      color: #3f51b5;
      margin-bottom: 1rem;
    }

    .expertise-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .contact-info p {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .contact-info a {
      color: #3f51b5;
      text-decoration: none;
    }

    .contact-info a:hover {
      text-decoration: underline;
    }

    mat-card-actions {
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }
  `]
})
export class InstructorDetailComponent {
  instructor: Instructor | undefined;

  constructor(private route: ActivatedRoute) {
    const instructors = [
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
      }
    ];

    this.route.params.subscribe(params => {
      this.instructor = instructors.find(i => i.id === params['id']);
    });
  }
}