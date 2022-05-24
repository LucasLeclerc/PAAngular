import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Product } from '../models/product.models';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  listeProduct:Product[] =[];
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
  }
  showDisplayOneProduct(id:string){
    this.ESGIService.interPage=id;
    this.router.navigate(["/One-Product"]).then();
  }

  backToNeutral(){
    this.router.navigate(["/manage-Product"]).then();
  }

}
