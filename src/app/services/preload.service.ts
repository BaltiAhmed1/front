
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from './data.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private cache = new Map<string, any>();

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
        // Preload first 3 formation details
        this.dataService.getFormations().subscribe(formations => {
          formations.slice(0, 3).forEach(formation => {
            this.preloadFormationDetail(formation.id);
          });
        });
      } else if (event.url.includes('/instructors')) {
        this.preloadFormations();
      }
    });
  }

  private preloadFormations() {
    if (!this.cache.has('formations')) {
      this.dataService.getFormations().subscribe(data => {
        this.cache.set('formations', data);
      });
    }
  }

  private preloadInstructors() {
    if (!this.cache.has('instructors')) {
      this.dataService.getInstructors().subscribe(data => {
        this.cache.set('instructors', data);
      });
    }
  }

  private preloadFormationDetail(id: string) {
    const cacheKey = `formation-${id}`;
    if (!this.cache.has(cacheKey)) {
      this.dataService.getFormation(id).subscribe(data => {
        this.cache.set(cacheKey, data);
      });
    }
  }

  getCached<T>(key: string): T | undefined {
    return this.cache.get(key) as T;
  }

  clearCache() {
    this.cache.clear();
  }

  preloadAssets(): Observable<void> {
    return new Observable(observer => {
      // Simulate asset preloading
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 1000);
    });
  }
}
