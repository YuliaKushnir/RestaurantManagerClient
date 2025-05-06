import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-post-product',
  imports: [SharedModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  constructor(private service: AdminService,
  ){}

  ngOnInit(){
    this.getAllCategories();
  }

  getAllCategories(){
    this.service.getAllCategories().subscribe((res) => {
      console.log(res);
    })
  }

}
