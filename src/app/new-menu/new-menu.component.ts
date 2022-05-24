import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Product } from '../models/product.models';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent implements OnInit {
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false
  listeAllProduct:Product[]=[];
  listeProduct:Product[]=[];
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
      this.getAllProduct();
    }
  }

  getAllProduct(){
    this.listeAllProduct=[];
    this.user.instance.get("/admin/getAllProducts",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; price: number | undefined; description: string | undefined; type: string[] | undefined; }) => {
        this.listeAllProduct.push(new Product(element._id,element.name,element.price,element.description,element.type))
      });
      console.log(this.listeProduct);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  createMenu(){
    this.error=false;
    this.valideMessage="validé";
    let menuNameText=document.getElementById("menuNameCreate");
    let menuName=(<HTMLInputElement>menuNameText).value;
    let menuPrixText=document.getElementById("menuPrixCreate");
    let menuPrix=(<HTMLInputElement>menuPrixText).value;
    let menuDescriptionText=document.getElementById("menuDescriptionCreate");
    let menuDescription=(<HTMLInputElement>menuDescriptionText).value;
    if(menuName==="" || menuPrix===""|| menuDescription===""){
      this.error=true;
      return
    }
    let listProductId:string[]=[]
    this.listeProduct.forEach(element => {
      listProductId.push(element.id);
    });
    this.user.instance.post("/admin/addMenu",{
      name:menuName,
      price:menuPrix,
      description:menuDescription,
      content:listProductId
  }).
  then((response) => {
    if(response.status===200){
      this.activity="valider";
      this.valideMessage="Le menu "+menuName+" a été créer avec succès."
    }
  }, (error) => {
    console.log(error);
    this.error=true;
  });
  }

  addProduct(){
    let productIdText=document.getElementById("listProductForMenu");
    let productId=(<HTMLInputElement>productIdText).value;
    this.user.instance.get("/admin/getProduct/"+productId,{}).
    then((response) => {
      this.listeProduct.push(new Product(response.data._id,response.data.name,response.data.price,response.data.description,response.data.type));     
      console.log(this.listeProduct);
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    
  }
  removeProduct(id:string){
    console.log(id)
    for(let i=0;i<this.listeProduct.length;i++){
      if(this.listeProduct[i].id===id){
        console.log(this.listeProduct[i].id,id,i)
        this.listeProduct.splice(i, 1);
        return
      }
    }
  }
  backToNeutral(){
    this.router.navigate(["/manage-Menu"]).then();
  }

}
