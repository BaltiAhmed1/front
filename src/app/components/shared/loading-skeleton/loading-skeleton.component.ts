import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  template: `
    <ngx-skeleton-loader
      [count]="count"
      [appearance]="appearance"
      [theme]="theme"
      [animation]="animation"
    ></ngx-skeleton-loader>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class LoadingSkeletonComponent {
  @Input() count = 1;
  @Input() appearance: 'circle' | 'line' = 'line';
  @Input() animation: 'progress' | 'progress-dark' | 'pulse' | 'false' = 'pulse';
  @Input() theme: any = {
    'border-radius': '4px',
    height: '15px',
    'background-color': 'rgba(0, 0, 0, 0.1)',
    'margin-bottom': '10px'
  };
}