import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from './data.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.setupPreloading();
  }

  private setupPreloading() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Preload based on current route
      if (event.url.includes('/formations')) {
        this.preloadInstructors();
      } else if (event.url.includes('/instructors')) {
        this.preloadFormations();
      }
    });
  }

  private preloadFormations() {
    this.dataService.getFormations().subscribe();
  }

  private preloadInstructors() {
    this.dataService.getInstructors().subscribe();
  }
}