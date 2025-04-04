import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MaterialModules } from './material.module';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MobileNavComponent } from './components/layout/mobile-nav/mobile-nav.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import { ThemeService } from './services/theme.service';
import { LoadingService } from './services/loading.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModules,
    HeaderComponent,
    SidebarComponent,
    MobileNavComponent,
    SearchBarComponent
  ],
  template: `
    <div class="app-container" [class.dark-theme]="isDarkTheme$ | async">
      <div class="app-layout">
        <app-sidebar 
          *ngIf="!(isHandset$ | async)"
          [expanded]="isSidebarExpanded"
          (expandedChange)="onSidebarExpanded($event)">
        </app-sidebar>

        <div class="main-content" [class.sidebar-expanded]="isSidebarExpanded && !(isHandset$ | async)">
          <app-header 
            *ngIf="!(isHandset$ | async)"
            [sidebarExpanded]="isSidebarExpanded"
            (toggleSidebar)="toggleSidebar()">
          </app-header>

          <div class="mobile-header-container" *ngIf="isHandset$ | async">
            <app-header 
              [isMobile]="true"
              (showSearchChange)="showMobileSearch = $event">
            </app-header>

            <app-search-bar 
              *ngIf="showMobileSearch" 
              [isMobile]="true"
              (close)="showMobileSearch = false">
            </app-search-bar>
          </div>

          <main class="content" [class.has-mobile-search]="showMobileSearch && (isHandset$ | async)">
            <div class="page-loading" *ngIf="isLoading$ | async">
              <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </div>
            <router-outlet></router-outlet>
          </main>

          <app-mobile-nav *ngIf="isHandset$ | async"></app-mobile-nav>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }

    .app-container {
      height: 100vh;
      overflow: hidden;
      background-color: var(--surface-background);
      color: var(--text-primary);
    }

    .app-layout {
      display: flex;
      height: 100vh;
    }

    .main-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 72px;
      transition: margin var(--transition-duration) var(--transition-timing);
      overflow: hidden;
    }

    .main-content.sidebar-expanded {
      margin-left: 256px;
    }

    .content {
      flex: 1;
      padding: var(--spacing-lg);
      overflow-y: auto;
      position: relative;
    }

    .content.has-mobile-search {
      padding-top: calc(var(--spacing-lg) + 56px);
    }

    .page-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }

    .mobile-header-container {
      position: relative;
    }

    @media (max-width: 768px) {
      .main-content {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  isSidebarExpanded = false;
  showMobileSearch = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkTheme$ = this.themeService.isDarkTheme$;
  isLoading$ = this.loadingService.loading$;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private themeService: ThemeService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // App initialization logic
  }

  onSidebarExpanded(expanded: boolean): void {
    this.isSidebarExpanded = expanded;
  }

  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}