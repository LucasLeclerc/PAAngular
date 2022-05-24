import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Product } from '../models/product.models';
import { Menu } from '../models/menu.models';

@Component({
  selector: 'app-new-promo',
  templateUrl: './new-promo.component.html',
  styleUrls: ['./new-promo.component.css']
})
export class NewPromoComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false
  listeAllProduct:Product[]=[];
  listeProduct:Product[]=[];
  listeAllMenu:Menu[]=[];
  listeMenu:Menu[]=[];
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
      this.getAll();
    }
  }
  getAll(){
    this.getAllProduct();
    this.getAllMenu();
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
  getAllMenu(){
    this.listeAllProduct=[];
    this.user.instance.get("/admin/getAllMenu",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; price: number | undefined; description: string | undefined; content: string[]; }) => {
        let tmp =new Menu(element._id,element.name,element.price,element.description);
        tmp.getContent(element.content,this.user);
        this.listeAllMenu.push(tmp);
      });
      console.log(this.listeMenu);
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  createPromo(){    
    this.error=false;
    this.valideMessage="validé";
    let promoNameText=document.getElementById("promoNameCreate");
    let promoName=(<HTMLInputElement>promoNameText).value;
    let promoPrixText=document.getElementById("promoPrixCreate");
    let promoPrix=(<HTMLInputElement>promoPrixText).value;
    let promoDateStartText=document.getElementById("promoDateStartCreate");
    let promoDateStart=(<HTMLInputElement>promoDateStartText).value;
    let promoDateEndText=document.getElementById("promoDateEndCreate");
    let promoDateEnd=(<HTMLInputElement>promoDateEndText).value;
    if(promoName==="" || promoPrix===""|| promoDateStart===""){
      this.error=true;
      return
    }
    promoDateStart+="T"
    if(promoDateEnd!==""){
      promoDateEnd+="T";
    }
    let listProductId:string[]=[]
    this.listeProduct.forEach(element => {
      listProductId.push(element.id);
    });
    this.listeMenu.forEach(element => {
      listProductId.push(element.id);
    });
    this.user.instance.post("/admin/addPromo",{
      name:promoName,
      price:promoPrix,
      beginDate:promoDateStart,
      endDate:promoDateEnd
  }).
  then((response) => {
    if(response.status===200){
      this.activity="valider";
      this.valideMessage="La promo "+promoName+" a été créer avec succès."
    }
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
  removeMenu(id:string){
    console.log(id)
    for(let i=0;i<this.listeMenu.length;i++){
      if(this.listeMenu[i].id===id){
        console.log(this.listeMenu[i].id,id,i)
        this.listeMenu.splice(i, 1);
        return
      }
    }
  }
  async addtoMenu(){    
    let productIdText=document.getElementById("listForPromo");
    let machinId=(<HTMLInputElement>productIdText).value;
    await this.user.instance.get("/admin/getProduct/"+machinId,{}).
    then((response) => {
      this.listeProduct.push(new Product(response.data._id,response.data.name,response.data.price,response.data.description,response.data.type));     
      console.log(this.listeProduct);
    }, (error) => {
      this.error=true;
      console.log(error);
    });
    if(this.error){
      this.user.instance.get("/admin/getMenu/"+machinId,{}).
    then((response) => {
      let tmp=new Menu(response.data._id,response.data.name,response.data.price,response.data.description);     
      let tmp2=response.data.content;
      tmp.getContent(tmp2,this.user);
      this.listeMenu.push(tmp);
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    }
  }
  backToNeutral(){
    this.router.navigate(["/manage-Promo"]).then();
  }

}
