import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-product',
  imports: [SharedModule],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  categoryId: number;
  validateForm!: FormGroup;
  selectedFile:File | null;
  imagePreview:string | ArrayBuffer | null; 
  isSpinning = false;

  constructor(private service: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];

  }

  ngOnInit(): void{
    this.validateForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  submitForm():void {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("name", this.validateForm.get("name").value);
    formData.append("price", this.validateForm.get("price").value);
    formData.append("description", this.validateForm.get("description").value);

    this.service.postProduct(this.categoryId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        if(res.id != null){
          this.message.success("Product added successfully", {nzDuration: 5000});
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
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
