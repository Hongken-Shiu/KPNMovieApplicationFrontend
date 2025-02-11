import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FavouritemovieComponent } from './favouritemovie/favouritemovie.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { RecommendedComponent } from './recommended/recommended.component';
import { ViewonemovieComponent } from './viewonemovie/viewonemovie.component';
import { DefaultPageComponent } from './default-page/default-page.component';

import { MatDialogModule } from '@angular/material/dialog';

import { TrailerModalComponentComponent } from './trailer-modal-component/trailer-modal-component.component';
import { FooterComponent } from './footer/footer.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    
    FavouritemovieComponent,
    DashboardComponent,
    SearchComponent,
    RecommendedComponent,
    ViewonemovieComponent,
    DefaultPageComponent,
    TrailerModalComponentComponent,
    FooterComponent,
    ThemeToggleComponent,
  
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientJsonpModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    CommonModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
