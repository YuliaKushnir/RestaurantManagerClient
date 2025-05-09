import { Component } from '@angular/core';
import { UserService } from '../../user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-view-products-by-category',
  imports: [SharedModule],
  templateUrl: './view-products-by-category.component.html',
  styleUrl: './view-products-by-category.component.scss'
})
export class ViewProductsByCategoryComponent {

  categoryId:any;
  products: any = [];
  isSpinning: boolean;
  validateForm!: FormGroup;

  constructor(private service: UserService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
  ){
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  // submitForm(){
  //   this.isSpinning = true;
  //   this.products = [];
  //   this.service.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value).subscribe((res) => {
  //     res.forEach(el => {
  //       el.processedImg = 'data:image/jpeg;base64,' + el.returnedImg;
  //       this.products.push(el);
  //       this.isSpinning = false;
  //     });
  //   });
  // }

  getProductsByCategory(){
    this.products = [];
    this.service.getProductsByCategory(this.categoryId).subscribe((res) => {
      res.forEach(el => {
        el.processedImg = 'data:image/jpeg;base64,' + el.returnedImg;
        this.products.push(el);
      });
    });
  }

  

}
