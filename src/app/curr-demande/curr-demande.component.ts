import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { User } from '../models/user.models';
import { Demande } from '../models/demande.models';

@Component({
  selector: 'app-curr-demande',
  templateUrl: './curr-demande.component.html',
  styleUrls: ['./curr-demande.component.css']
})
export class CurrDemandeComponent implements OnInit {

  user:User;
  error:boolean = false;
  activity:string="neutre";
  champ:string[]=[];
  champ2:number[]=[];
  valideMessage:string="";
  message: string="";
  demandeList:Demande[]=[];
  
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
   }

  ngOnInit(): void {
    console.log("coucou",this.ESGIService.user.login)
    if(this.ESGIService.user.login==="Invité"){
      this.ESGIService.setUserPage(this.router);
    
    }else if(this.ESGIService.user.role=="Admin"){
      this.user=this.ESGIService.user;
      this.demandeList=[];
      this.user.instance.get("/admin/getCurrDemande",{}).
      then( (response) => {
        response.data.forEach((element: { id: string; message: string; user: User; }) => {
          const dat=element.user;
          let tmp =new Demande();
          tmp.setWithData(element);
          console.log(tmp)
          this.demandeList.push(tmp);
        });
        console.log(this.demandeList);
        this.error=false;
      }, (error) => {
        console.log(error);
      });
    }else{      
      this.ESGIService.setUserPage(this.router);      
    }
  }
  showDisplayDemande(id:string){
    console.log(id)
    this.UserService.pass=id;
    this.router.navigate(["/choiseDemande"]).then();
  }

}
