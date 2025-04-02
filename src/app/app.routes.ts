import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'formations', loadComponent: () => import('./pages/formations/formations.component').then(m => m.FormationsComponent) },
  { path: 'formations/:id', loadComponent: () => import('./pages/formation-detail/formation-detail.component').then(m => m.FormationDetailComponent) },
  { path: 'news', loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent) },
  { path: 'news/:id', loadComponent: () => import('./pages/news-detail/news-detail.component').then(m => m.NewsDetailComponent) },
  { path: 'instructors', loadComponent: () => import('./pages/instructors/instructors.component').then(m => m.InstructorsComponent) },
  { path: 'instructors/:id', loadComponent: () => import('./pages/instructor-detail/instructor-detail.component').then(m => m.InstructorDetailComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
];