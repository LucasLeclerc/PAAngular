import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Menu } from '../models/menu.models';

@Component({
  selector: 'app-all-menu',
  templateUrl: './all-menu.component.html',
  styleUrls: ['./all-menu.component.css']
})
export class AllMenuComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  listeMenu:Menu[] =[];
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
  }
  showDisplayOneMenu(id:string){
    this.ESGIService.interPage=id;
    this.router.navigate(["/One-Menu"]).then();
  }

  backToNeutral(){
    this.router.navigate(["/manage-Menu"]).then();
  }

}
