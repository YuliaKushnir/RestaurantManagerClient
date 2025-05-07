import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-products',
  imports: [SharedModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss'
})
export class ViewProductsComponent {

  categoryId:any;
  products: any = [];
  isSpinning: boolean;
  validateForm!: FormGroup;

  constructor(private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ){
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  submitForm(){
    this.isSpinning = true;
    this.products = [];
    this.service.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value).subscribe((res) => {
      res.forEach(el => {
        el.processedImg = 'data:image/jpeg;base64,' + el.returnedImg;
        this.products.push(el);
        this.isSpinning = false;
      });
    });
  }

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
