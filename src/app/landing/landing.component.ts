import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Menu } from '../models/menu.models';
import { Promo } from '../models/promo.models';
import { Order } from '../models/order.models';
import { Product } from '../models/product.models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit { 

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  Order:Order=new Order;
  listeMenu:Menu[] =[];
  listeProduct:Product[] =[];
  listePromo:Promo[] =[];
  listeMenuOrder:Menu[] =[];
  listeProductOrder:Product[] =[];
  listePromoOrder:Promo[] =[];
  error=false
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    this.user=this.ESGIService.user;
    this.getAll()
  }
  getAll(){
    this.getAllProduct();
    this.getAllMenu();
    this.getAllPromo();
    console.log(this.listeProduct)
    console.log(this.listeMenu)
    console.log(this.listePromo)
  }

  getAllProduct(){
    this.listeProduct=[];
    this.user.instance.get("/admin/getAllProducts",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; price: number | undefined; description: string | undefined; type: string[] | undefined; }) => {
        this.listeProduct.push(new Product(element._id,element.name,element.price,element.description,element.type))
      });
      console.log(this.listeProduct);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  getAllMenu(){
    this.listeMenu=[];
    this.user.instance.get("/admin/getAllMenu",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; price: number | undefined; description: string | undefined; content: string[]; }) => {
        let tmp =new Menu(element._id,element.name,element.price,element.description);
        tmp.getContent(element.content,this.user);
        this.listeMenu.push(tmp);
      });
      console.log(this.listeMenu);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  getAllPromo(){    
    this.listePromo=[];
    this.user.instance.get("/admin/getAllPromos",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; price: number | undefined; promotionType: string | undefined; beginDate: string ; endDate: string; content: string[]; }) => {
        let tmp =new Promo(element._id,element.name,element.price,element.promotionType,element.beginDate.slice(0,10),element.endDate.slice(0,10));
        tmp.getContent(element.content,this.user);
        this.listePromo.push(tmp);
      });
      console.log(this.listePromo);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  addMenu(menu:Menu){
    
  }
  addProduct(product:Product){

  }
  addPromo(promo:Promo){

  }
  removeMenu(menu:Menu){
    
  }
  removeProduct(product:Product){

  }
  removePromo(promo:Promo){

  }
  setCommand(){

  }
}


