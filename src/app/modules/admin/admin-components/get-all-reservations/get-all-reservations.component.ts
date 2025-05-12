import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { SharedModule } from '../../../../shared/shared.module';
import { NzMessageService } from 'ng-zorro-antd/message';

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
      private service: AdminService,
      private message: NzMessageService
    ){}
  
    ngOnInit(){
      this.getReservations();
    }
  
    getReservations(){
      this.service.getReservations().subscribe((res)=>{
        this.reservations = res;
      })
    }

    changeReservationStatus(reservationId: number, status:string){
      console.log(reservationId);
      console.log(status);

      this.service.changeReservationStatus(reservationId, status).subscribe((res)=>{
        if(res.id != null){
          this.getReservations();
          this.message.success("Reservation status changed successfully", {nzDuration: 5000});
        } else {
          this.message.error("Something went wrong", {nzDuration: 5000});
        }
      })

    }

    approveReservation(){

    }

    disapproveReservation(){

    }

}
