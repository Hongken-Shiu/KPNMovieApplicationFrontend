import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('default');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  private initialTheme: string = 'default';
  constructor() {}

  setTheme(theme: string) {
    this.currentThemeSubject.next(theme);
  }

  resetTheme() {
    this.currentThemeSubject.next(this.initialTheme);
  }
}