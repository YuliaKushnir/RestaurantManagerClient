import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user-service/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-reservation',
  imports: [SharedModule],
  templateUrl: './post-reservation.component.html',
  styleUrl: './post-reservation.component.scss'
})
export class PostReservationComponent {

  validateForm!: FormGroup;
  isSpinning: boolean = false;

  TableType: string[] = [
    "Standard table",
    "Booth",
    "Bar table",
    "Communal table",
    "Outdoor table",
    "Banquette",
    "Window-side table",
    "Corner table",
    "Lounge table",
    "Round table",
    "Private dining table",
    "Family-style table"
  ];

  constructor(private service: UserService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
  ){

  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      tableType: [null, Validators.required],
      dateTime: [null, Validators.required],
      description: [null, Validators.required],
    })
  }

  postReservation(){
    console.log(this.validateForm.value);

    this.service.postReservation(this.validateForm.value).subscribe(
      (res) => {
          console.log(res);

        if(res.id != null){
          this.message.success("Reservation send for approving", {nzDuration: 5000});
          this.router.navigateByUrl('/admin/dashboard');
        } else if(res.id == null){
          this.message.error("Reservation was not send", {nzDuration: 5000});
        }
      }
    )
  }

}
