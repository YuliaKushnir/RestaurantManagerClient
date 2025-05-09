import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../user-service/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  categories:any = [];
  isSpinning: boolean;

  constructor(private service: UserService){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categories = [];
    this.service.getAllCategories().subscribe((res) => {
      res.forEach(el => {
        el.processedImg = 'data:image/jpeg;base64,' + el.returnedImg;
        this.categories.push(el);
      });
    });
  }

}
