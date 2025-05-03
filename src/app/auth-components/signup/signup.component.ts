import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning?: boolean;
  validateForm: FormGroup;
  confirmationValidator = (control: FormControl):{[s:string]: boolean } => {
    if(!control.value ){
      return {required:true};
    } else if(control.value !== this.validateForm.controls['password'].value){
        return { confirm: true, error:true}
    }
    return {};
  } 

  constructor(private service: AuthService, 
    private fb: FormBuilder,
    private notification: NzNotificationService
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      email:["", Validators.required],
      password:["", Validators.required],
      checkPassword:["", [Validators.required, this.confirmationValidator]],
      name:["", Validators.required],
    })
  }

  register(){
    this.service.signup(this.validateForm.value).subscribe((res) => {
      if(res.id != null){
        this.notification.success("SUCCESS", "You are sign up successfully", {nzDuration:5000});
      } else {
        this.notification.error("ERROR", "Something went wrong", {nzDuration:5000});
      }
    })
  }

}
