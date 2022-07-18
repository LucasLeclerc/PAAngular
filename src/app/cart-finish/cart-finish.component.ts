import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { CartContent } from '../models/cartContent.models';
import { Recipe } from '../models/recipe.models';
import { Location } from '@angular/common'

@Component({
  selector: 'app-cart-finish',
  templateUrl: './cart-finish.component.html',
  styleUrls: ['./cart-finish.component.css']
})
export class CartFinishComponent implements OnInit {

  constructor(private ESGIService:ESGIService, private location: Location,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
  }

  ngOnInit(): void {
  }
  goToUser(){    
    this.router.navigate(['/allRecipe']).then()
  }

}
