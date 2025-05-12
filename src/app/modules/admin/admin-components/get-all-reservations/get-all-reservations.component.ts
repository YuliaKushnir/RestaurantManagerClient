import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { SharedModule } from '../../../../shared/shared.module';

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
      private service: AdminService
    ){}
  
    ngOnInit(){
      this.getReservations();
    }
  
    getReservations(){
      this.service.getReservations().subscribe((res)=>{
        this.reservations = res;
      })
    }

    approveReservation(){

    }

    disapproveReservation(){
      
    }

}
