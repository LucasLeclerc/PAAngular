import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Menu } from '../models/menu.models';
import { Promo } from '../models/promo.models';

@Component({
  selector: 'app-all-promo',
  templateUrl: './all-promo.component.html',
  styleUrls: ['./all-promo.component.css']
})
export class AllPromoComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  listePromo:Promo[] =[];
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
  }
  showDisplayOnePromo(id:string){
    this.ESGIService.interPage=id;
    this.router.navigate(["/One-Promo"]).then();
  }
  backToNeutral(){
    this.router.navigate(["/manage-Promo"]).then();
  }

}
