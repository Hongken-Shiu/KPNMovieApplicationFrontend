import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  constructor(private themeService: ThemeService) {}

  selectTheme(theme: string) {
    if (theme === 'default') {
      this.themeService.resetTheme();
    } else {
      this.themeService.setTheme(theme);
    }
  }
}