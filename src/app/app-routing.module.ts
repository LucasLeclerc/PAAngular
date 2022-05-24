import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UserLivreurComponent } from './user-livreur/user-livreur.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserCustomerComponent } from './user-customer/user-customer.component';
import { UserPrepaComponent } from './user-prepa/user-prepa.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { ManagePromoComponent } from './manage-promo/manage-promo.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { AllProductComponent } from './all-product/all-product.component';
import { OneProductComponent } from './one-product/one-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AllMenuComponent } from './all-menu/all-menu.component';
import { OneMenuComponent } from './one-menu/one-menu.component';
import { AllPromoComponent } from './all-promo/all-promo.component';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { OnePromoComponent } from './one-promo/one-promo.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { NewPromoComponent } from './new-promo/new-promo.component';
import { OneOrderComponent } from './one-order/one-order.component';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"command",component:LandingComponent},
  {path:"user-BigBoss",component:UserPageComponent},
  {path:"user-Livreur",component:UserLivreurComponent},
  {path:"user-Admin",component:UserAdminComponent},
  {path:"user-Customer",component:UserCustomerComponent},
  {path:"user-Preparator",component:UserPrepaComponent},
  {path:"manage-Product",component:ManageProductComponent},
  {path:"manage-Menu",component:ManageMenuComponent},
  {path:"manage-Promo",component:ManagePromoComponent},
  {path:"manage-Order",component:ManageOrderComponent},
  {path:"All-Product",component:AllProductComponent},
  {path:"One-Product",component:OneProductComponent},
  {path:"New-Product",component:NewProductComponent},
  {path:"All-Menu",component:AllMenuComponent},
  {path:"One-Menu",component:OneMenuComponent},
  {path:"New-Menu",component:NewMenuComponent},
  {path:"All-Promo",component:AllPromoComponent},
  {path:"One-Promo",component:OnePromoComponent},
  {path:"New-Promo",component:NewPromoComponent},
  {path:"All-Order",component:AllOrderComponent},
  {path:"One-Order",component:OneOrderComponent},
  {path:"New-Order",component:NewOrderComponent},
  {path:"subscribe",component:SubscribeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
