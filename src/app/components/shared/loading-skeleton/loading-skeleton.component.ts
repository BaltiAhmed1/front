
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, CommonModule],
  template: `
    <div [class]="'skeleton-wrapper ' + variant">
      <ngx-skeleton-loader
        [count]="count"
        [appearance]="appearance"
        [theme]="computedTheme"
        [animation]="animation"
        [ariaLabel]="'Loading ' + variant + ' content'"
      ></ngx-skeleton-loader>
      @if (showLoadingText) {
        <div class="loading-text" role="status">{{ loadingText }}</div>
      }
    </div>
  `,
  styles: [`
    .skeleton-wrapper {
      width: 100%;
      position: relative;
    }

    .loading-text {
      text-align: center;
      color: #666;
      margin-top: 8px;
      font-size: 14px;
    }

    .card-variant {
      border-radius: 8px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.03);
    }

    .list-variant {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    :host-context(.dark-theme) {
      .loading-text {
        color: #999;
      }
      .card-variant {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  `]
})
export class LoadingSkeletonComponent {
  @Input() count = 1;
  @Input() appearance: 'circle' | 'line' = 'line';
  @Input() animation: 'progress' | 'progress-dark' | 'pulse' | 'false' = 'pulse';
  @Input() variant: 'card' | 'list' | 'text' = 'text';
  @Input() showLoadingText = false;
  @Input() loadingText = 'Loading...';
  @Input() theme: any = {
    'border-radius': '4px',
    height: '15px',
    'background-color': 'rgba(0, 0, 0, 0.1)',
    'margin-bottom': '10px'
  };

  get computedTheme() {
    return {
      ...this.theme,
      'animation-duration': '1.5s',
      'background-color': this.variant === 'card' ? 
        'rgba(0, 0, 0, 0.05)' : this.theme['background-color']
    };
  }
}
