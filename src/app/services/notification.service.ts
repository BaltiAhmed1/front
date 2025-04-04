
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toast: HotToastService) {}

  success(message: string) {
    this.toast.success(message);
  }

  error(message: string) {
    this.toast.error(message);
  }

  info(message: string) {
    this.toast.info(message);
  }
}
