import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red';

interface ThemeSettings {
  mode: ThemeMode;
  color: ThemeColor;
  highContrast: boolean;
  reducedMotion: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeSettings = new BehaviorSubject<ThemeSettings>({
    mode: 'system',
    color: 'blue',
    highContrast: false,
    reducedMotion: false
  });

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Initialize from local storage
    this.loadSavedSettings();

    // Listen for system preference changes
    this.setupSystemPreferenceListeners();

    // Apply initial theme
    this.applyTheme();
  }

  // Public observables to subscribe to theme changes
  get isDarkTheme$(): Observable<boolean> {
    return this.themeSettings.pipe(
      map(settings => {
        if (settings.mode === 'system') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return settings.mode === 'dark';
      }),
      distinctUntilChanged()
    );
  }

  get themeMode$(): Observable<ThemeMode> {
    return this.themeSettings.pipe(
      map(settings => settings.mode),
      distinctUntilChanged()
    );
  }

  get themeColor$(): Observable<ThemeColor> {
    return this.themeSettings.pipe(
      map(settings => settings.color),
      distinctUntilChanged()
    );
  }

  get highContrast$(): Observable<boolean> {
    return this.themeSettings.pipe(
      map(settings => settings.highContrast),
      distinctUntilChanged()
    );
  }

  get reducedMotion$(): Observable<boolean> {
    return this.themeSettings.pipe(
      map(settings => settings.reducedMotion),
      distinctUntilChanged()
    );
  }

  // Theme control methods
  setThemeMode(mode: ThemeMode): void {
    const current = this.themeSettings.value;
    this.themeSettings.next({ ...current, mode });
    this.saveSettings();
    this.applyTheme();
  }

  setThemeColor(color: ThemeColor): void {
    const current = this.themeSettings.value;
    this.themeSettings.next({ ...current, color });
    this.saveSettings();
    this.applyTheme();
  }

  toggleDarkMode(): void {
    const current = this.themeSettings.value;
    const isDark = current.mode === 'dark';
    this.themeSettings.next({ ...current, mode: isDark ? 'light' : 'dark' });
    this.saveSettings();
    this.applyTheme();
  }

  toggleHighContrast(): void {
    const current = this.themeSettings.value;
    this.themeSettings.next({ ...current, highContrast: !current.highContrast });
    this.saveSettings();
    this.applyTheme();
  }

  toggleReducedMotion(): void {
    const current = this.themeSettings.value;
    this.themeSettings.next({ ...current, reducedMotion: !current.reducedMotion });
    this.saveSettings();
    this.applyTheme();
  }

  // Private helper methods
  private loadSavedSettings(): void {
    try {
      const savedSettings = localStorage.getItem('themeSettings');
      if (savedSettings) {
        this.themeSettings.next(JSON.parse(savedSettings));
      } else {
        // Initialize based on system preferences
        this.themeSettings.next({
          mode: 'system',
          color: 'blue',
          highContrast: window.matchMedia('(prefers-contrast: more)').matches,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
      }
    } catch (error) {
      console.error('Error loading theme settings:', error);
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem('themeSettings', JSON.stringify(this.themeSettings.value));
    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  }

  private setupSystemPreferenceListeners(): void {
    // Listen for system dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.themeSettings.value.mode === 'system') {
        this.applyTheme();
      }
    });

    // Listen for system contrast preference changes
    window.matchMedia('(prefers-contrast: more)').addEventListener('change', e => {
      if (e.matches) {
        const current = this.themeSettings.value;
        this.themeSettings.next({ ...current, highContrast: true });
        this.applyTheme();
      }
    });

    // Listen for system motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
      if (e.matches) {
        const current = this.themeSettings.value;
        this.themeSettings.next({ ...current, reducedMotion: true });
        this.applyTheme();
      }
    });
  }

  private applyTheme(): void {
    const settings = this.themeSettings.value;
    const isDark = settings.mode === 'dark' || 
                  (settings.mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply dark mode
    if (isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }

    // Apply theme color
    document.body.setAttribute('data-theme-color', settings.color);

    // Apply accessibility settings
    if (settings.highContrast) {
      this.renderer.addClass(document.body, 'high-contrast');
    } else {
      this.renderer.removeClass(document.body, 'high-contrast');
    }

    if (settings.reducedMotion) {
      this.renderer.addClass(document.body, 'reduced-motion');
    } else {
      this.renderer.removeClass(document.body, 'reduced-motion');
    }
  }
}