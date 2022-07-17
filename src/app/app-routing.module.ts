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
import { AllRecipeComponent } from './all-recipe/all-recipe.component';
import { OneRecipeComponent } from './one-recipe/one-recipe.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { NewToolComponent } from './new-tool/new-tool.component';
import { AllToolComponent } from './all-tool/all-tool.component';
import { OneToolComponent } from './one-tool/one-tool.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { FavListComponent } from './fav-list/fav-list.component';
import { AdminRecipeComponent } from './admin-recipe/admin-recipe.component';
import { AdminOneRecipeComponent } from './admin-one-recipe/admin-one-recipe.component';
import { CartDisplayComponent } from './cart-display/cart-display.component';
import { AdminAddRecipeComponent } from './admin-add-recipe/admin-add-recipe.component';
import { AdminModifRecipeComponent } from './admin-modif-recipe/admin-modif-recipe.component';
import { AskPreparatorComponent } from './ask-preparator/ask-preparator.component';
import { CurrDemandeComponent } from './curr-demande/curr-demande.component';
import { OneDemandeComponent } from './one-demande/one-demande.component';

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
  {path:"recipe",component:OneRecipeComponent},
  {path:"profile",component:UserProfileComponent},
  {path:"profil",component:UpdateProfileComponent},
  {path:"addTool",component:NewToolComponent},
  {path:"allTool",component:AllToolComponent},
  {path:"oneTool",component:OneToolComponent},
  {path:"panier",component:CartDisplayComponent},
  {path:"favorite",component:FavListComponent},
  {path:"wishlist",component:WishListComponent},
  {path:"adminRecipe",component:AdminRecipeComponent},
  {path:"oneRecipe",component:AdminOneRecipeComponent},
  {path:"addRecipe",component:AdminAddRecipeComponent},
  {path:"updateRecipe",component:AdminModifRecipeComponent},
  {path:"switchToPrep",component:AskPreparatorComponent},
  {path:"currentAsk",component:CurrDemandeComponent},
  {path:"choiseDemande",component:OneDemandeComponent},
  {path:"allRecipe",component:AllRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
