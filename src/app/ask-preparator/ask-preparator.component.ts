import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import * as sampleModule from 'axios';
import { User } from '../models/user.models';

@Component({
  selector: 'app-ask-preparator',
  templateUrl: './ask-preparator.component.html',
  styleUrls: ['./ask-preparator.component.css']
})
export class AskPreparatorComponent implements OnInit {
  user:User;
  error:boolean = false;
  activity:string="neutral";
  champ:string[]=[];
  champ2:number[]=[];
  valideMessage:string="";
  message: string="";
  
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
   }

  ngOnInit(): void {
    console.log("coucou",this.ESGIService.user.login)
    if(this.ESGIService.user.login==="Invité"){
      this.ESGIService.setUserPage(this.router);
    }else{
      this.user=this.ESGIService.user;
    }
  }
  confirm(){
    let mes:string=(<HTMLInputElement>document.getElementById('message')).value;
    if (mes===""){
      this.error=true;
      this.activity="error";      
      this.valideMessage="Le message ne doit pas être vide.";
      return;
    }
    this.activity='confirm';
    this.message=mes;
  }

  reset(){
    this.activity='neutral';
  }
  asking(){    
    this.user.instance.post("/auth/askPreparator",{
      message:this.message
    }).
      then( (response) => {
        this.valideMessage = "La demande à bien été envoyer aux admins",
        this.activity="good";
      }, (error) => {
        console.log(error);
        this.valideMessage = "La demande n'a pas pus être envoyer aux admins. Réessayer plsu tard.",
        this.activity="error";
      });
  }

}
