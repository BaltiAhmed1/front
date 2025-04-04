import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="toggleSidebar.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>My App</span>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      position: fixed;
      top: 0;
      z-index: 1000;
    }
  `]
})
export class HeaderComponent {
  @Input() isMobile = false;
  @Input() sidebarExpanded = true;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() showSearchChange = new EventEmitter<boolean>();
  // @Output() showSearchChange = new EventEmitter<boolean>(); // This was added based on the changes but is not in original code.  The original error message refers to app.component.ts which is not included.
}