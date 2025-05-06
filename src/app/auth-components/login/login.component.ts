import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../auth-services/storage-service/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
  ) {}

  
  loginForm!: FormGroup;
  isSpinning: boolean;

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null, Validators.required],
      password:[null, Validators.required],
    })
  }

  submitForm(){
    this.service.login(this.loginForm.value).subscribe((res)=>{
      this.message.success(`Login Success`, {nzDuration: 5000});

      const user = {
        id:res.userId,
        role:res.role
      }

      StorageService.saveToken(res.jwt);
      StorageService.saveUser(user);

      if(StorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("admin/dashboard");
      } else if(StorageService.isUserLoggedIn()){
        this.router.navigateByUrl("user/dashboard");
      } 
    }, error=> {
      this.message.error(`Bad credentials`, {nzDuration: 5000});
  })
  }



}
