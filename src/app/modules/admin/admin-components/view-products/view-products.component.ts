import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';

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

  constructor(private service: AdminService,
    private activatedRoute: ActivatedRoute
  ){
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];

  }

  ngOnInit(): void {
    this.getProductsByCategory();
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
