import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscribeComponent,
    UserPageComponent,
    UserAdminComponent,
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
    OneDemandeComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
