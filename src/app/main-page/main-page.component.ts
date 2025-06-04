import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StorageService } from '../auth-services/storage-service/storage.service';

@Component({
  selector: 'app-main-page',
  imports: [SharedModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(){}

  isLoggedIn(): boolean {
    return StorageService.isUserLoggedIn();
  }
}
