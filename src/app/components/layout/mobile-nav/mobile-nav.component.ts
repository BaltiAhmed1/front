
import { Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [MatBottomSheetModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="mobile-nav">
      <a mat-list-item routerLink="/home" routerLinkActive="active">
        <mat-icon>home</mat-icon>
      </a>
      <a mat-list-item routerLink="/formations" routerLinkActive="active">
        <mat-icon>school</mat-icon>
      </a>
      <a mat-list-item routerLink="/instructors" routerLinkActive="active">
        <mat-icon>people</mat-icon>
      </a>
    </nav>
  `,
  styles: [`
    .mobile-nav {
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      background: white;
      padding: 8px 0;
      box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
    }
  `]
})
export class MobileNavComponent {}
