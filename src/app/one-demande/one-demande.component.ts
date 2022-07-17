import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import * as sampleModule from 'axios';
import { User } from '../models/user.models';
import { Demande } from '../models/demande.models';

@Component({
  selector: 'app-one-demande',
  templateUrl: './one-demande.component.html',
  styleUrls: ['./one-demande.component.css']
})
export class OneDemandeComponent implements OnInit {

  user:User;
  error:boolean = false;
  activity:string="neutre";
  champ:string[]=[];
  champ2:number[]=[];
  valideMessage:string="";
  message: string="";
  demandeOne:Demande=new Demande();
  
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
   }

  ngOnInit(): void {
    console.log("coucou",this.ESGIService.user.login)
    if(this.ESGIService.user.login==="Invité"){
      this.ESGIService.setUserPage(this.router);
    
    }else if(this.ESGIService.user.role=="Admin"){
      this.user=this.ESGIService.user;
      this.demandeOne=new Demande();
      this.user.instance.get("/admin/getDemandeById"+this.UserService.pass,{}).
      then( (response) => {
        let element=response.data;
        const dat=element.user;
        let tmp =new Demande();
        tmp.setWithData(element);
        this.demandeOne=tmp;        
        console.log(this.demandeOne);
        this.error=false;
      }
      ,(error) => {
        console.log(error);
        this.error=true;
      });
    }else{      
      this.ESGIService.setUserPage(this.router);      
    }
  }
  toAccept(){
    this.activity="accepter"
    
  }  
  toRefuse(){
      this.activity="refuser"
  }  
  execute(){
    if(this.activity==="accepter"){
    this.user.instance.get("/admin/acceptDemande/"+this.demandeOne.id,{}).
      then( (response) => {
        this.activity="good"
        this.valideMessage="La demande à bien été accepter."
      }
      ,(error) => {
        console.log(error);
        this.error=true;
      });
    }else if(this.activity==="refuser"){
      this.user.instance.get("/admin/acceptDemande/"+this.demandeOne.id,{}).
        then( (response) => {
          this.activity="good"
          this.valideMessage="La demande à bien été refuser."
        }
        ,(error) => {
          console.log(error);
          this.error=true;
        });
    }else{
      this.activity="error"
      this.valideMessage="Erreur, veuillez réessayer plus tard."
    }
  }
  cancel(){
    this.activity="neutre"
  }
}
