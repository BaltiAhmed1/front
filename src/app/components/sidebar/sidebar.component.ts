import { Component, OnInit, Output, EventEmitter, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { animate, style, transition, trigger } from '@angular/animations';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  translatedLabel: string;
  badge?: number;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  template: `
    <aside [class.expanded]="isExpanded" class="sidebar" [class.overlay-mode]="isOverlayMode">
      <div class="backdrop" *ngIf="isOverlayMode && isExpanded" (click)="toggleSidebar()"></div>
      
      <div class="sidebar-content">
        <div class="sidebar-header">
          <div class="logo-container" *ngIf="isExpanded">
            <img src="assets/logo.svg" alt="App logo" class="logo" />
            <span class="app-name">MyApp</span>
          </div>
          <button 
            mat-icon-button 
            (click)="toggleSidebar()"
            [attr.aria-label]="isExpanded ? 'Collapse sidebar' : 'Expand sidebar'"
            class="toggle-button">
            <mat-icon>{{ isExpanded ? 'menu_open' : 'menu' }}</mat-icon>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="search-container" *ngIf="isExpanded" @fadeInOut>
          <div class="search-input-wrapper">
            <mat-icon class="search-icon">search</mat-icon>
            <input type="text" placeholder="Search..." class="search-input" />
          </div>
        </div>

        <!-- Primary Navigation -->
        <nav class="nav-section">
          <ng-container *ngFor="let item of primaryNavItems">
            <div class="nav-item-container">
              <a 
                [routerLink]="item.path" 
                routerLinkActive="active"
                class="nav-item"
                [matTooltip]="!isExpanded ? item.translatedLabel : ''"
                matTooltipPosition="right"
                [class.has-badge]="item.badge && item.badge > 0">
                <mat-icon [matBadge]="item.badge" [matBadgeHidden]="!item.badge || item.badge === 0" matBadgeSize="small" matBadgeColor="accent">{{item.icon}}</mat-icon>
                <span *ngIf="isExpanded" @fadeInOut>{{item.translatedLabel}}</span>
                <mat-icon *ngIf="item.children && item.children.length && isExpanded" class="expand-icon">
                  {{expandedGroups[item.path] ? 'expand_less' : 'expand_more'}}
                </mat-icon>
              </a>

              <!-- Dropdown for items with children -->
              <div 
                *ngIf="item.children && item.children.length && isExpanded && expandedGroups[item.path]" 
                class="subnav-container"
                @fadeInOut>
                <a 
                  *ngFor="let child of item.children"
                  [routerLink]="child.path" 
                  routerLinkActive="active"
                  class="subnav-item">
                  <mat-icon class="subnav-icon">{{child.icon}}</mat-icon>
                  <span>{{child.translatedLabel}}</span>
                </a>
              </div>
            </div>
          </ng-container>
        </nav>

        <mat-divider></mat-divider>

        <!-- Secondary Navigation -->
        <nav class="nav-section">
          <ng-container *ngFor="let item of secondaryNavItems">
            <div class="nav-item-container">
              <a 
                [routerLink]="item.path" 
                routerLinkActive="active"
                class="nav-item"
                [matTooltip]="!isExpanded ? item.translatedLabel : ''"
                matTooltipPosition="right"
                [class.has-badge]="item.badge && item.badge > 0">
                <mat-icon [matBadge]="item.badge" [matBadgeHidden]="!item.badge || item.badge === 0" matBadgeSize="small" matBadgeColor="accent">{{item.icon}}</mat-icon>
                <span *ngIf="isExpanded" @fadeInOut>{{item.translatedLabel}}</span>
              </a>
            </div>
          </ng-container>
        </nav>

        <div class="spacer"></div>

        <!-- Theme Toggle -->
        <div class="theme-toggle-container" [class.expanded]="isExpanded">
          <button 
            mat-icon-button 
            (click)="toggleTheme()"
            class="theme-toggle-button"
            [matTooltip]="!isExpanded ? (isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode') : ''"
            matTooltipPosition="right">
            <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          <span *ngIf="isExpanded" @fadeInOut>{{ isDarkTheme ? 'Light Mode' : 'Dark Mode' }}</span>
        </div>

        <!-- User Profile Section -->
        <div class="user-section">
          <div 
            class="user-profile nav-item" 
            [class.expanded]="isExpanded"
            [matMenuTriggerFor]="userMenu">
            <div class="user-avatar-container">
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="User avatar"
                class="user-avatar"
              >
              <div class="status-indicator online"></div>
            </div>
            <div class="user-info" *ngIf="isExpanded" @fadeInOut>
              <span class="user-name">John Doe</span>
              <span class="user-role">Administrator</span>
            </div>
            <mat-icon *ngIf="isExpanded" class="user-menu-icon">arrow_drop_down</mat-icon>
          </div>
          
          <!-- User Menu -->
          <mat-menu #userMenu="matMenu" xPosition="before">
            <button mat-menu-item routerLink="/profile">
              <mat-icon>person</mat-icon>
              <span>My Profile</span>
            </button>
            <button mat-menu-item routerLink="/settings">
              <mat-icon>settings</mat-icon>
              <span>Settings</span>
            </button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      display: flex;
      flex-direction: column;
      width: 72px;
      height: 100vh;
      background-color: var(--sidebar-bg, #1a1a1a);
      color: var(--sidebar-color, #ffffff);
      transition: width 0.3s ease;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      overflow: hidden;
      box-shadow: var(--sidebar-shadow, 0 0 10px rgba(0, 0, 0, 0.1));
    }

    .sidebar.expanded {
      width: 256px;
    }

    .sidebar-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: thin;
    }

    .sidebar-content::-webkit-scrollbar {
      width: 5px;
    }

    .sidebar-content::-webkit-scrollbar-track {
      background: transparent;
    }

    .sidebar-content::-webkit-scrollbar-thumb {
      background-color: var(--sidebar-scrollbar, rgba(255, 255, 255, 0.2));
      border-radius: 10px;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
    }

    .sidebar-header {
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    .logo-container {
      display: flex;
      align-items: center;
    }

    .logo {
      height: 32px;
      width: auto;
      margin-right: 8px;
    }

    .app-name {
      font-size: 18px;
      font-weight: 600;
    }

    .toggle-button {
      color: var(--sidebar-color, #ffffff);
    }

    .search-container {
      padding: 0 16px 16px;
    }

    .search-input-wrapper {
      display: flex;
      align-items: center;
      background-color: var(--sidebar-search-bg, rgba(255, 255, 255, 0.1));
      border-radius: 8px;
      padding: 8px 12px;
    }

    .search-icon {
      color: var(--sidebar-search-icon, rgba(255, 255, 255, 0.7));
      margin-right: 8px;
      font-size: 20px;
    }

    .search-input {
      background: transparent;
      border: none;
      color: var(--sidebar-color, #ffffff);
      width: 100%;
      outline: none;
      font-size: 14px;
    }

    .search-input::placeholder {
      color: var(--sidebar-search-placeholder, rgba(255, 255, 255, 0.5));
    }

    .nav-section {
      padding: 8px;
    }

    .nav-item-container {
      margin: 4px 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      text-decoration: none;
      color: var(--sidebar-color, #ffffff);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }

    .nav-item:hover {
      background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.1));
    }

    .nav-item.active {
      background-color: var(--sidebar-active-bg, rgba(255, 255, 255, 0.2));
      font-weight: 500;
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: var(--sidebar-accent, #4a6cf7);
      border-radius: 0 2px 2px 0;
    }

    .nav-item mat-icon:not(.expand-icon) {
      margin-right: 16px;
    }

    .expand-icon {
      margin-left: auto;
      font-size: 20px;
      transition: transform 0.2s ease;
    }

    .subnav-container {
      padding-left: 16px;
      margin-top: 4px;
    }

    .subnav-item {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      text-decoration: none;
      color: var(--sidebar-color, #ffffff);
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 14px;
      opacity: 0.8;
    }

    .subnav-item:hover {
      background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.1));
      opacity: 1;
    }

    .subnav-item.active {
      background-color: var(--sidebar-active-bg, rgba(255, 255, 255, 0.2));
      opacity: 1;
      font-weight: 500;
    }

    .subnav-icon {
      font-size: 18px;
      margin-right: 12px;
    }

    .has-badge {
      position: relative;
    }

    .spacer {
      flex: 1;
    }

    .theme-toggle-container {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      margin: 8px;
      background-color: var(--sidebar-toggle-bg, rgba(255, 255, 255, 0.1));
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .theme-toggle-container:hover {
      background-color: var(--sidebar-toggle-hover-bg, rgba(255, 255, 255, 0.15));
    }

    .theme-toggle-container span {
      margin-left: 16px;
      font-size: 14px;
    }

    .theme-toggle-button {
      color: var(--sidebar-color, #ffffff);
      padding: 0;
    }

    .user-section {
      padding: 16px 8px;
    }

    .user-profile {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      margin-bottom: 8px;
      position: relative;
      cursor: pointer;
      border-radius: 8px;
    }

    .user-profile:hover {
      background-color: var(--sidebar-hover-bg, rgba(255, 255, 255, 0.1));
    }

    .user-avatar-container {
      position: relative;
      margin-right: 12px;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--sidebar-avatar-border, rgba(255, 255, 255, 0.2));
    }

    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--sidebar-bg, #1a1a1a);
    }

    .status-indicator.online {
      background-color: #4CAF50;
    }

    .status-indicator.away {
      background-color: #FFC107;
    }

    .status-indicator.busy {
      background-color: #F44336;
    }

    .status-indicator.offline {
      background-color: #9E9E9E;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .user-name {
      font-weight: 500;
      font-size: 14px;
    }

    .user-role {
      font-size: 12px;
      opacity: 0.7;
    }

    .user-menu-icon {
      margin-left: auto;
    }

    /* Overlay mode for mobile */
    .sidebar.overlay-mode {
      transform: translateX(-100%);
      box-shadow: none;
    }

    .sidebar.overlay-mode.expanded {
      transform: translateX(0);
      box-shadow: var(--sidebar-shadow, 0 0 20px rgba(0, 0, 0, 0.3));
    }

    /* Animation for transition between states */
    .sidebar, .sidebar.expanded {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Light/Dark Theme Styles */
    :host-context(body.dark-theme) {
      --sidebar-bg: #1a1a1a;
      --sidebar-color: #ffffff;
      --sidebar-hover-bg: rgba(255, 255, 255, 0.1);
      --sidebar-active-bg: rgba(255, 255, 255, 0.15);
      --sidebar-accent: #4a6cf7;
      --sidebar-search-bg: rgba(255, 255, 255, 0.1);
      --sidebar-search-icon: rgba(255, 255, 255, 0.7);
      --sidebar-search-placeholder: rgba(255, 255, 255, 0.5);
      --sidebar-toggle-bg: rgba(255, 255, 255, 0.1);
      --sidebar-toggle-hover-bg: rgba(255, 255, 255, 0.15);
      --sidebar-scrollbar: rgba(255, 255, 255, 0.2);
      --sidebar-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
      --sidebar-avatar-border: rgba(255, 255, 255, 0.2);
    }

    :host-context(body.light-theme) {
      --sidebar-bg: #ffffff;
      --sidebar-color: #333333;
      --sidebar-hover-bg: rgba(0, 0, 0, 0.05);
      --sidebar-active-bg: rgba(0, 0, 0, 0.08);
      --sidebar-accent: #4a6cf7;
      --sidebar-search-bg: rgba(0, 0, 0, 0.05);
      --sidebar-search-icon: rgba(0, 0, 0, 0.7);
      --sidebar-search-placeholder: rgba(0, 0, 0, 0.5);
      --sidebar-toggle-bg: rgba(0, 0, 0, 0.05);
      --sidebar-toggle-hover-bg: rgba(0, 0, 0, 0.08);
      --sidebar-scrollbar: rgba(0, 0, 0, 0.2);
      --sidebar-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
      --sidebar-avatar-border: rgba(0, 0, 0, 0.1);
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .sidebar {
        width: 0;
        transform: translateX(-100%);
      }

      .sidebar.expanded {
        width: 256px;
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent implements OnInit {
  @Output() expansionChanged = new EventEmitter<boolean>();
  isExpanded = false;
  isOverlayMode = false;
  isDarkTheme = true;
  expandedGroups: {[key: string]: boolean} = {};
  currentUrl = '';
  private router = inject(Router);

  // Navigation items with nested structure
  primaryNavItems: NavItem[] = [
    { 
      path: '/dashboard', 
      icon: 'dashboard', 
      label: 'Dashboard', 
      translatedLabel: 'Dashboard' 
    },
    { 
      path: '/formations', 
      icon: 'school', 
      label: 'Formations', 
      translatedLabel: 'Formations',
      children: [
        { path: '/formations/all', icon: 'list', label: 'All Courses', translatedLabel: 'All Courses' },
        { path: '/formations/my-courses', icon: 'bookmark', label: 'My Courses', translatedLabel: 'My Courses' },
        { path: '/formations/certificates', icon: 'card_membership', label: 'Certificates', translatedLabel: 'Certificates' }
      ]
    },
    { 
      path: '/instructors', 
      icon: 'groups', 
      label: 'Instructors', 
      translatedLabel: 'Instructeurs' 
    },
    { 
      path: '/news', 
      icon: 'article', 
      label: 'News', 
      translatedLabel: 'Actualités',
      badge: 3 
    }
  ];

  secondaryNavItems: NavItem[] = [
    { 
      path: '/calendar', 
      icon: 'calendar_today', 
      label: 'Calendar', 
      translatedLabel: 'Calendrier',
      badge: 2
    },
    { 
      path: '/messages', 
      icon: 'mail', 
      label: 'Messages', 
      translatedLabel: 'Messages',
      badge: 4
    }
  ];

  constructor() {
    this.loadSidebarState();
    this.loadThemePreference();
  }

  ngOnInit() {
    // Handle responsive behavior
    this.handleResponsive();
    
    // Track current route for active state
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.updateExpandedGroups();
      }
    });

    // Set initial theme
    this.applyTheme();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // Check if we're in mobile mode
    this.isOverlayMode = window.innerWidth <= 768;
    
    // Auto-expand on larger screens if not explicitly collapsed by user
    if (window.innerWidth > 768 && !this.isOverlayMode && !localStorage.getItem('sidebarManuallyCollapsed')) {
      this.isExpanded = true;
    } else if (this.isOverlayMode) {
      this.isExpanded = false;
    }
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    this.saveSidebarState();
    this.expansionChanged.emit(this.isExpanded);
    
    // Track if user manually collapsed the sidebar on desktop
    if (!this.isOverlayMode) {
      localStorage.setItem('sidebarManuallyCollapsed', String(!this.isExpanded));
    }
  }

  toggleGroupExpansion(path: string) {
    this.expandedGroups[path] = !this.expandedGroups[path];
    localStorage.setItem('expandedGroups', JSON.stringify(this.expandedGroups));
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('darkTheme', String(this.isDarkTheme));
    this.applyTheme();
  }

  logout() {
    // Implement logout logic
    console.log('Logout clicked');
    // Add actual logout code here
  }

  private handleResponsive() {
    this.checkScreenSize();
  }

  private updateExpandedGroups() {
    // Auto-expand the group containing the current route
    this.primaryNavItems.forEach(item => {
      if (item.children && item.children.some(child => this.currentUrl.startsWith(child.path))) {
        this.expandedGroups[item.path] = true;
      }
    });
  }

  private saveSidebarState() {
    localStorage.setItem('sidebarExpanded', String(this.isExpanded));
  }

  private loadSidebarState() {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      this.isExpanded = savedState === 'true';
    }
    
    // Load expanded groups
    const savedGroups = localStorage.getItem('expandedGroups');
    if (savedGroups) {
      this.expandedGroups = JSON.parse(savedGroups);
    }
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme !== null) {
      this.isDarkTheme = savedTheme === 'true';
    } else {
      // Check system preference if no saved preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme = prefersDark;
    }
  }

  private applyTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}