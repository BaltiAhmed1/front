import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PreloadService } from './services/preload.service';
import { HotToastModule } from '@ngneat/hot-toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent,
    HotToastModule
  ],
  template: `
    <app-sidebar></app-sidebar>
    
    <div class="main-content">
      <mat-toolbar color="primary">
        <span>CFI Plasturgie</span>
      </mat-toolbar>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      margin-left: 72px;
      transition: margin-left 0.3s ease;
    }

    .sidebar-expanded .main-content {
      margin-left: 256px;
    }

    main {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }

    /* High Contrast Mode Improvements */
    @media (forced-colors: active) {
      :root {
        --primary-color: CanvasText;
        --background-color: Canvas;
      }
    }

    /* Focus Visible Improvements */
    :focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 2px;
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `]
})
export class App {
  constructor(private preloadService: PreloadService) {}
}