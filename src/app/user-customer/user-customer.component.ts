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
  selector: 'app-user-customer',
  templateUrl: './user-customer.component.html',
  styleUrls: ['./user-customer.component.css']
})
export class UserCustomerComponent implements OnInit {
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
  total:number=0;
  error=false
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
    this.user=this.ESGIService.user;
    this.getAll()}
  }
  getAll(){
    this.getAllProduct();
    this.getAllMenu();
    this.getAllPromo();
    console.log(this.listeProduct)
    console.log(this.listeMenu)
    console.log(this.listePromo)
  }

  calcTot(){
    this.total=0;
    for(var i=0;i<this.listeProductOrder.length;i++){
      this.total+=this.listeProductOrder[i].price;
    }
    for(var i=0;i<this.listeMenuOrder.length;i++){
      this.total+=this.listeMenuOrder[i].price;
    }
    for(var i=0;i<this.listePromoOrder.length;i++){
      this.total+=this.listePromoOrder[i].price;
    }
  }
  getAllProduct(){
    this.listeProduct=[];
    this.user.instance.get("/customer/getAllProducts",{}).
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
    this.user.instance.get("/customer/getAllMenu",{}).
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
    this.user.instance.get("/customer/getAllPromos",{}).
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
    this.listeMenuOrder.push(menu);
    this.calcTot()
    
  }
  addProduct(product:Product){
    this.listeProductOrder.push(product);
    this.calcTot()
    
  }
  addPromo(promo:Promo){
    this.listePromoOrder.push(promo);
    this.calcTot()

  }
  removeMenu(menu:Menu){
    
  }
  removeProduct(product:Product){

  }
  removePromo(promo:Promo){

  }
  setCommand(){
    let content:string[];
    content=[];
    for(var i=0;i<this.listeProductOrder.length;i++){
      content.push(this.listeProductOrder[i].id);
    }
    for(var i=0;i<this.listeMenuOrder.length;i++){
      content.push(this.listeMenuOrder[i].id);
    }
    for(var i=0;i<this.listePromoOrder.length;i++){
      content.push(this.listePromoOrder[i].id);
    }
    console.log()
    this.user.instance.post("/customer/newOrder",{
    price:this.total,
    status: 1,
    customerId: this.user.id,
    preparatorId: "000000000000000000000000",
    date: "2022-05-25T15:39:40.000Z",
    content: content,
    idResto: "6274124723471514844e6ae7"
    }).
    then( (response) => {
      this.activity="validé";
      this.error=false;
    }, (error) => {
      console.log(error);
    });

  }
}



