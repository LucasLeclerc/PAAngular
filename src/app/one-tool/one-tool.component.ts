import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Recipe } from '../models/recipe.models';
import { Tool } from '../models/tool.models';

@Component({
  selector: 'app-one-tool',
  templateUrl: './one-tool.component.html',
  styleUrls: ['./one-tool.component.css']
})
export class OneToolComponent implements OnInit {

  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  tool:Tool=new Tool();

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }
  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      if(this.user.role!=="Admin"){
        console.log("merde")
        this.ESGIService.setUserPage(this.router);
      }
      if(this.UserService.pass===""){
        console.log("merde")
        this.router.navigate(["/allTool"]).then();
      }
      this.tool= new Tool();
      this.user=this.ESGIService.user;
      this.user.instance.get("/cart/tool/"+this.UserService.pass,{}).
      then( (response) => {
        let tmp =new Tool(response.data._id,response.data.name,response.data.photo,response.data.description);
        this.tool=tmp;       
        console.log(this.tool);
        this.UserService.pass="";
        this.error=false;
      }, (error) => {
        console.log(error);
        this.activity="null";
      });
    };
  }

  verifDelTool(){
    this.activity="preDell";
  }

  delTool(){
    try{
    this.user.instance.delete("/cart/deleteTool/"+this.tool.id,{}).
    then( (response) => {
      this.activity="good"
      this.valideMessage="L'outil à bien été supprimer."
    }, (error) => {
      console.log(error);
      this.activity="error";
      this.valideMessage="Outil non trouver, veuillez réessayer plus tard."
    });
    }catch{
      this.activity="error";
      this.valideMessage="Outil non trouver, veuillez réessayer plus tard."
    }
  }
  return(){
    this.router.navigate(["/allTool"]).then();
  }
}


