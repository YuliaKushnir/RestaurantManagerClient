import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { UserService } from '../../user-service/user.service';

@Component({
  selector: 'app-get-all-reservations',
  imports: [SharedModule],
  templateUrl: './get-all-reservations.component.html',
  styleUrl: './get-all-reservations.component.scss'
})
export class GetAllReservationsComponent {

  isSpinning: boolean = false;
  reservations: any;

  constructor(
    private service: UserService
  ){}

  ngOnInit(){
    this.getReservationsByUser();
  }

  getReservationsByUser(){
    this.service.getReservationsByUser().subscribe((res)=>{
      console.log(res);

      this.reservations = res;
      console.log("RESERVATION ", this.reservations);
    })
  }

}
