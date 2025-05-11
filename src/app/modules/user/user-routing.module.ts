import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { ViewProductsByCategoryComponent } from './user-components/view-products-by-category/view-products-by-category.component';
import { PostReservationComponent } from './user-components/post-reservation/post-reservation.component';
import { GetAllReservationsComponent } from './user-components/get-all-reservations/get-all-reservations.component';

const routes: Routes = [
    {path:"dashboard", component:DashboardComponent},
    {path:":categoryId/products", component:ViewProductsByCategoryComponent},
    {path:"reservation", component:PostReservationComponent},
    {path:"reservations", component:GetAllReservationsComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
