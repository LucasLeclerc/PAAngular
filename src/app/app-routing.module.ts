import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { ManagePromoComponent } from './manage-promo/manage-promo.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
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
import {WelcomeComponent} from "./welcome/welcome.component";
import { CartRecapComponent } from './cart-recap/cart-recap.component';
import { CartValidationComponent } from './cart-validation/cart-validation.component';
import { CartPlanificationComponent } from './cart-planification/cart-planification.component';
import { CartFinishComponent } from './cart-finish/cart-finish.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"user-BigBoss",component:UserPageComponent},
  {path:"user-Admin",component:UserAdminComponent},
  {path:"manage-Product",component:ManageProductComponent},
  {path:"manage-Menu",component:ManageMenuComponent},
  {path:"manage-Promo",component:ManagePromoComponent},
  {path:"manage-Order",component:ManageOrderComponent},
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
  {path:"cartValid",component:CartValidationComponent},
  {path:"cartRecap",component:CartRecapComponent},
  {path:"allRecipe",component:AllRecipeComponent},
  {path:"plannification",component:CartPlanificationComponent},
  {path:"sucess",component:CartFinishComponent},
  {path:"",component:WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
