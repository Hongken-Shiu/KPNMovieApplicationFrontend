import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // selectedLanguage: string = 'en'; //setting english as default language
  IsloggedIn: boolean = false
selectedLanguage: any;
  constructor(private router: Router,private authService: AuthService, private themeService: ThemeService) {
    this.authService.IsloggedIn.subscribe((response) => {
      this.IsloggedIn = response
    })
    const data = localStorage.getItem("auth_token")
    if (data) {
      this.IsloggedIn = true;

    }
  }
  logout() {
    this.authService.IsloggedIn.next(false)
    localStorage.clear()
    this.router.navigateByUrl("/login")
  }
  searchingItems(text: string) {
    if (text.length == 0) {
      return;
    }
    console.log(text);
    this.router.navigate(['/dashboard/search-items', text])
  }
  // changeLanguage(event: any) {
  //   this.selectedLanguage = event.target.value;
  //   // Add code here to change the language of the application
  // }
  
}
