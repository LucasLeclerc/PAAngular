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

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  listeOrder:Order[] =[];
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
      this.listeOrder=[];
      this.user.instance.get("/admin/getAllOrder",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; status: string | undefined; price: number | undefined; date: string; destination: string | undefined; content: string[]; customerId: string; }) => {
        let tmp =new Order(element._id,element.status,element.price,element.date.slice(0,10),element.destination);
        tmp.getInfo(element.content,element.customerId,this.user);
        this.listeOrder.push(tmp);
      });
      console.log(this.listeOrder);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
    }
  }
  showDisplayOneOrder(id:string){
    this.ESGIService.interPage=id;
    this.router.navigate(["/One-Order"]).then();
  }
  backToNeutral(){
    this.router.navigate(["/manage-Order"]).then();
  }

}
