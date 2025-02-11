import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kpnmuzix';
  themeClass!: string;

  constructor(private themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass = theme;
    });
  }
}
