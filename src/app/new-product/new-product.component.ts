import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      this.user=this.ESGIService.user;
    }
  }
  createProduct(){
    this.error=false
    this.valideMessage="validé";
    let productNameText=document.getElementById("productNameCreate");
    let productName=(<HTMLInputElement>productNameText).value;
    let productPrixText=document.getElementById("productPrixCreate");
    let productPrix=(<HTMLInputElement>productPrixText).value;
    let productDescriptionText=document.getElementById("productDescriptionCreate");
    let productDescription=(<HTMLInputElement>productDescriptionText).value;
    let productTypeText=document.getElementById("productTypeCreate");
    let productType=(<HTMLInputElement>productTypeText).value;
    if(productName==="" || productPrix===""|| productDescription===""|| productType===""){
      this.error=true;
      return
    }
    this.user.instance.post("/admin/addProduct",{
      name:productName,
      price:productPrix,
      description:productDescription,
      type:productType
  }).
  then((response) => {
    if(response.status===200){
      this.activity="valider";
      this.valideMessage="Le produit "+productName+" a été créer avec succès."
    }
  }, (error) => {
    console.log(error);
    this.error=true;
  });
  }
  backToNeutral(){
    this.router.navigate(["/manage-Product"]).then();
  }

}
