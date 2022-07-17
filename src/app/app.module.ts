import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { UserPrepaComponent } from './user-prepa/user-prepa.component';
import { UserLivreurComponent } from './user-livreur/user-livreur.component';
import { UserCustomerComponent } from './user-customer/user-customer.component';
import { AllProductComponent } from './all-product/all-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OneProductComponent } from './one-product/one-product.component';
import { AllMenuComponent } from './all-menu/all-menu.component';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { OneMenuComponent } from './one-menu/one-menu.component';
import { AllPromoComponent } from './all-promo/all-promo.component';
import { NewPromoComponent } from './new-promo/new-promo.component';
import { OnePromoComponent } from './one-promo/one-promo.component';
import { OneOrderComponent } from './one-order/one-order.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ConvComponent } from './conv/conv.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { ManagePromoComponent } from './manage-promo/manage-promo.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { AddToolComponent } from './add-tool/add-tool.component';
import { AllRecipeComponent } from './all-recipe/all-recipe.component';
import { OneRecipeComponent } from './one-recipe/one-recipe.component';
import { ShowCartComponent } from './show-cart/show-cart.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NewToolComponent } from './new-tool/new-tool.component';
import { OneToolComponent } from './one-tool/one-tool.component';
import { AllToolComponent } from './all-tool/all-tool.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { UserBaseComponent } from './user-base/user-base.component';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { AdminOneRecipeComponent } from './admin-one-recipe/admin-one-recipe.component';
import { AdminModifRecipeComponent } from './admin-modif-recipe/admin-modif-recipe.component';
import { AdminAddRecipeComponent } from './admin-add-recipe/admin-add-recipe.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReturnComponent } from './return/return.component';
import { AskPreparatorComponent } from './ask-preparator/ask-preparator.component';
import { CurrDemandeComponent } from './curr-demande/curr-demande.component';
import { OneDemandeComponent } from './one-demande/one-demande.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    SubscribeComponent,
    UserPageComponent,
    UserAdminComponent,
    UserPrepaComponent,
    UserLivreurComponent,
    UserCustomerComponent,
    AllProductComponent,
    NewProductComponent,
    OneProductComponent,
    AllMenuComponent,
    NewMenuComponent,
    OneMenuComponent,
    AllPromoComponent,
    NewPromoComponent,
    OnePromoComponent,
    OneOrderComponent,
    AllOrderComponent,
    NewOrderComponent,
    ConvComponent,
    ManageProductComponent,
    ManageMenuComponent,
    ManagePromoComponent,
    ManageOrderComponent,
    AddToolComponent,
    AllRecipeComponent,
    OneRecipeComponent,
    ShowCartComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    NewToolComponent,
    OneToolComponent,
    AllToolComponent,
    ProfileAdminComponent,
    UserBaseComponent,
    CartDisplayComponent,
    FavListComponent,
    WishListComponent,
    AdminRecipeComponent,
    AdminOneRecipeComponent,
    AdminModifRecipeComponent,
    AdminAddRecipeComponent,
    SignUpComponent,
    ReturnComponent,
    AskPreparatorComponent,
    CurrDemandeComponent,
    OneDemandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
