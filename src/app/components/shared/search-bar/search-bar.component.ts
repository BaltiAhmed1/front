
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule, FormsModule],
  template: `
    <div class="search-container">
      <mat-form-field appearance="outline">
        <mat-icon matPrefix>search</mat-icon>
        <input matInput placeholder="Search..." [(ngModel)]="searchQuery">
      </mat-form-field>
      <button mat-icon-button *ngIf="isMobile" (click)="close.emit()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .search-container {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class SearchBarComponent {
  @Input() isMobile = false;
  @Output() close = new EventEmitter<void>();
  searchQuery = '';
}
