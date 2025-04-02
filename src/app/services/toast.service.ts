import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toast: HotToastService) {}

  success(message: string) {
    this.toast.success(message, {
      duration: 3000,
      position: 'bottom-center',
      role: 'status',
      ariaLive: 'polite'
    });
  }

  error(message: string) {
    this.toast.error(message, {
      duration: 4000,
      position: 'bottom-center',
      role: 'alert',
      ariaLive: 'assertive'
    });
  }

  info(message: string) {
    this.toast.info(message, {
      duration: 3000,
      position: 'bottom-center',
      role: 'status',
      ariaLive: 'polite'
    });
  }

  loading(message: string) {
    return this.toast.loading(message, {
      position: 'bottom-center',
      role: 'status',
      ariaLive: 'polite'
    });
  }
}