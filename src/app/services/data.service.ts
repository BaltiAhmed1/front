import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Formation, Instructor, NewsArticle } from '../models/types';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formations: Formation[] = [
    {
      id: '1',
      title: 'Formation en Injection Plastique',
      description: "Maîtrisez les techniques d'injection plastique avec nos experts. Formation complète couvrant les aspects théoriques et pratiques.",
      duration: '35 heures',
      prerequisites: ['Connaissances de base en plasturgie'],
      objectives: ["Comprendre le processus d'injection", 'Maîtriser les paramètres machine', 'Optimiser la production'],
      imageUrl: 'https://picsum.photos/seed/injection/400/300',
      type: 'presentiel',
      program: [
        {
          title: 'Introduction',
          items: ['Principes de base', 'Types de machines']
        },
        {
          title: 'Paramètres',
          items: ['Température', 'Pression', 'Vitesse']
        }
      ]
    },
    {
      id: '2',
      title: 'E-learning: Les Bases de l\'Extrusion',
      description: 'Formez-vous à distance aux fondamentaux de l\'extrusion plastique. Cours en ligne avec exercices pratiques.',
      duration: '15 heures',
      prerequisites: ['Aucun prérequis'],
      objectives: ['Comprendre le principe de l\'extrusion', 'Connaître les différents types d\'extrudeuses'],
      imageUrl: 'https://picsum.photos/seed/extrusion/400/300',
      type: 'elearning',
      program: [
        {
          title: 'Introduction à l\'extrusion',
          items: ['Principes fondamentaux', 'Types d\'extrudeuses']
        },
        {
          title: 'Procédés d\'extrusion',
          items: ['Paramètres clés', 'Contrôle qualité']
        }
      ]
    },
    {
      id: '3',
      title: 'Thermoformage Avancé',
      description: 'Formation approfondie sur les techniques de thermoformage. Idéal pour les professionnels souhaitant se perfectionner.',
      duration: '28 heures',
      prerequisites: ['Expérience en thermoformage'],
      objectives: ['Optimiser les cycles de production', 'Résoudre les problèmes courants'],
      imageUrl: 'https://picsum.photos/seed/thermo/400/300',
      type: 'presentiel',
      program: [
        {
          title: 'Techniques avancées',
          items: ['Optimisation des cycles', 'Gestion des défauts']
        },
        {
          title: 'Production industrielle',
          items: ['Productivité', 'Maintenance']
        }
      ]
    }
  ];

  private instructors: Instructor[] = [
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

  private news: NewsArticle[] = [
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

  getFormations(): Observable<Formation[]> {
    return of(this.formations).pipe(
      catchError(error => {
        console.error('Error fetching formations:', error);
        return of([]);
      })
    );
  }

  getFormation(id: string): Observable<Formation | undefined> {
    return of(this.formations.find(f => f.id === id)).pipe(
      catchError(error => {
        console.error('Error fetching formation:', error);
        return of(undefined);
      })
    );
  }

  getInstructors(): Observable<Instructor[]> {
    return of(this.instructors).pipe(
      catchError(error => {
        console.error('Error fetching instructors:', error);
        return of([]);
      })
    );
  }

  getInstructor(id: string): Observable<Instructor | undefined> {
    return of(this.instructors.find(i => i.id === id)).pipe(
      catchError(error => {
        console.error('Error fetching instructor:', error);
        return of(undefined);
      })
    );
  }

  getNews(): Observable<NewsArticle[]> {
    return of(this.news).pipe(
      catchError(error => {
        console.error('Error fetching news:', error);
        return of([]);
      })
    );
  }

  getNewsArticle(id: string): Observable<NewsArticle | undefined> {
    return of(this.news.find(n => n.id === id)).pipe(
      catchError(error => {
        console.error('Error fetching news article:', error);
        return of(undefined);
      })
    );
  }
}