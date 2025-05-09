import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  categories:any = [];
  isSpinning: boolean;
  validateForm: FormGroup;

  constructor(private service: UserService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, Validators.required]
    })
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

  submitForm(){
    this.isSpinning = true;
    this.categories = [];
    this.service.getAllCategoriesByTitle(this.validateForm.get(['title'])!.value).subscribe((res) => {
      res.forEach(el => {
        el.processedImg = 'data:image/jpeg;base64,' + el.returnedImg;
        this.categories.push(el);
        this.isSpinning = false;
      });
    });
  }

}
