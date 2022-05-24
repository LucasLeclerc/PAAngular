import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Product } from '../models/product.models';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  oneProduct:Product=new Product()
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
      this.user.instance.get("/admin/getProduct/"+this.ESGIService.interPage,{}).
    then((response) => {
      this.oneProduct=new Product(response.data._id,response.data.name,response.data.price,response.data.description,response.data.type);     
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    }
  }
  updateProduct(){
    this.error=false
    this.valideMessage="validé";
    let productNameText=document.getElementById("productNameUpdate");
    let productName=(<HTMLInputElement>productNameText).value;
    let productPrixText=document.getElementById("productPrixUpdate");
    let productPrix=(<HTMLInputElement>productPrixText).value;
    let productDescriptionText=document.getElementById("productDescriptionUpdate");
    let productDescription=(<HTMLInputElement>productDescriptionText).value;
    let productTypeText=document.getElementById("productTypeUpdate");
    let productType=(<HTMLInputElement>productTypeText).value;
    if(productName==="" || productPrix===""|| productDescription===""|| productType===""){
      this.error=true;
      return
    }
    this.user.instance.post("/admin/updateProduct/"+this.oneProduct.id,{
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
  deleteProduct(){
    this.valideMessage="validé"; 
    this.error=false
    this.user.instance.delete("/admin/deleteProduct/"+this.oneProduct.id,{}).
    then((response) => {
      if(response.status===204){
        this.activity="valider";
        this.valideMessage="Le produit "+this.oneProduct.name+" a été supprimer avec succès.";
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }

}
