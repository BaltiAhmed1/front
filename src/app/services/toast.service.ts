
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastPosition, ToastTheme, ToastRole } from '@ngneat/hot-toast/lib/hot-toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: HotToastService) {}

  private defaultOptions = {
    duration: 3000,
    position: 'bottom-center' as ToastPosition,
    theme: 'snackbar' as ToastTheme,
    autoClose: true,
    dismissible: true,
    role: 'status' as ToastRole,
    style: {
      border: '1px solid',
      padding: '16px',
      color: '#fff',
    },
    className: 'toast-notification',
    iconTheme: {
      primary: '#fff',
      secondary: 'transparent'
    }
  };

  success(message: string) {
    this.toast.success(message, {
      ...this.defaultOptions,
      ariaLive: 'polite',
      style: {
        ...this.defaultOptions.style,
        background: '#43a047'
      }
    });
  }

  error(message: string) {
    this.toast.error(message, {
      ...this.defaultOptions,
      duration: 4000,
      role: 'alert' as ToastRole,
      ariaLive: 'assertive',
      style: {
        ...this.defaultOptions.style,
        background: '#d32f2f'
      }
    });
  }

  info(message: string) {
    this.toast.info(message, {
      ...this.defaultOptions,
      style: {
        ...this.defaultOptions.style,
        background: '#1976d2'
      }
    });
  }

  loading(message: string) {
    return this.toast.loading(message, {
      ...this.defaultOptions,
      duration: 0,
      style: {
        ...this.defaultOptions.style,
        background: '#424242'
      }
    });
  }
}
