import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-product',
  imports: [SharedModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  productId: number;
  validateForm!: FormGroup;
  imagePreview:string | ArrayBuffer | null = null; 
  isSpinning = false;
  imgChanged = false;
  selectedFile: any;
  existingImage: string | null = null;

  constructor(private fb: FormBuilder,
    private service: AdminService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.productId = this.activatedRoute.snapshot.params['productId'];
  }

  ngOnInit():void{
    this.validateForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getProductById();
  }

  getProductById(){
    this.service.getProductById(this.productId).subscribe((res)=>{
      console.log(res);
      const productDto= res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
      this.validateForm.patchValue(productDto);
    })
  }

  updateProduct():void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append("img", this.selectedFile);
    }
    formData.append("name", this.validateForm.get("name").value);
    formData.append("price", this.validateForm.get("price").value);
    formData.append("description", this.validateForm.get("description").value);

    this.service.updateProduct(this.productId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        if(res.id != null){
          this.message.success("Product updated successfully", {nzDuration: 5000});
          this.router.navigateByUrl('/admin/dashboard');
        } else if(res.id == null){
          this.message.error("Product was not added", {nzDuration: 5000});
        }
      }
    )
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
