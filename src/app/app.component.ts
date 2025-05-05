import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { StorageService } from './auth-services/storage-service/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Restaurant Management';

  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();
  isUserLoggedIn:boolean = StorageService.isUserLoggedIn();

  constructor(private router:Router){

  }

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name === 'NavigationEnd'){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isUserLoggedIn = StorageService.isUserLoggedIn();
      }
    })
  }

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('/login');
  }

}
