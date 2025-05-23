import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { AddCategoryComponent } from './admin-components/add-category/add-category.component';
import { PostProductComponent } from './admin-components/post-product/post-product.component';
import { ViewProductsComponent } from './admin-components/view-products/view-products.component';
import { UpdateProductComponent } from './admin-components/update-product/update-product.component';
import { GetAllReservationsComponent } from './admin-components/get-all-reservations/get-all-reservations.component';

const routes: Routes = [
  {path:"dashboard", component:DashboardComponent},
  {path:"category", component:AddCategoryComponent},
  {path:":categoryId/product", component:PostProductComponent},
  {path:":categoryId/products", component:ViewProductsComponent},
  {path:"edit-product/:productId", component:UpdateProductComponent},
  {path:"reservations", component:GetAllReservationsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
