import { Routes } from '@angular/router';
import { SignupComponent } from './auth-components/signup/signup.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './auth-components/login/login.component';

export const routes: Routes = [
    { path:"", component:MainPageComponent },
    { path:"signup", component:SignupComponent },
    { path:"login", component:LoginComponent },
];
