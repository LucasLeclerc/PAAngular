import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';


import { Tool } from '../models/tool.models';
import { Recipe } from '../models/recipe.models';

@Component({
  selector: 'app-all-tool',
  templateUrl: './all-tool.component.html',
  styleUrls: ['./all-tool.component.css']
})

export class AllToolComponent implements OnInit {
  user:User;
  activity:string="neutre";
  valideMessage:string="";
  error=false;
  toolList:Tool[]=[];

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }

  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else if(this.ESGIService.user.role==="Admin"){
      this.user=this.ESGIService.user;
      this.user=this.ESGIService.user;
      this.toolList=[];
      this.user.instance.get("/cart/allTool",{}).
      then( (response) => {
        response.data.forEach((element: {
          name: string | undefined;
          photo: string | undefined;
          description: string | undefined;
          _id: string | undefined
        }) => {
          let tmp =new Tool(element._id,element.name,element.photo,element.description);
          this.toolList.push(tmp);
        });
        console.log(this.toolList);
        this.error=false;
      }, (error) => {
        console.log(error);
      });
    }else{
      this.ESGIService.setUserPage(this.router);   
    }
  }
  newTool(){
    this.router.navigate(["/addTool"]).then();
  }  
  showDisplayOneTool(id:string){
    this.UserService.pass=id;
    this.router.navigate(["/oneTool"]).then();
  }

}
