import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StorageService } from '../auth-services/storage-service/storage.service';
import { UserService } from '../modules/user/user-service/user.service';

@Component({
  selector: 'app-main-page',
  imports: [SharedModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  constructor(private service: UserService){}

  ngOnInit(): void {
    this.pushesDb();
  }

  isLoggedIn(): boolean {
    return StorageService.isUserLoggedIn();
  }

  pushesDb(): void{
    this.service.getAllCategories();
  }
}
