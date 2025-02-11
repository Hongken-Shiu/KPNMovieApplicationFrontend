import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewonemovieComponent } from './viewonemovie/viewonemovie.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { FavouritemovieComponent } from './favouritemovie/favouritemovie.component';
import { DefaultPageComponent } from './default-page/default-page.component';


const routes: Routes = [
  { path: "", component:DefaultPageComponent  },
  

  {
    path: "register", component: RegisterComponent
  },
  { path: "login", component: LoginComponent },
  
  { 
    path: "dashboard", component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: "view-favourite-list", component: FavouritemovieComponent,
    canActivate: [authGuard]
  },
  {
    path: "view-one-movie/:id",
    component: ViewonemovieComponent
  },
  {
    path: "recommended", component: RecommendedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
