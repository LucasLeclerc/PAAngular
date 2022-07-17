import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import * as sampleModule from 'axios';
import { User } from '../models/user.models';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  error:boolean = false;
  
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
   }

  ngOnInit(): void {
    if(this.ESGIService.user.login!=="Invité"){
      this.ESGIService.setUserPage(this.router);
    }else{
    }
  }
  async login(){
    this.error=false;
    let loginText=document.getElementById("login");
    let login=(<HTMLInputElement>loginText).value;
    let passwordText=document.getElementById("password");
    let password=(<HTMLInputElement>passwordText).value;
    let token="";
    const instance=axios.create({
      baseURL: this.ESGIService.url,
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    })
    await instance.post('/auth/login',{
      login: login,
      password: password
    }).then( (response) => {
      token=response.data.token;      
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    if(!this.error){
      this.ESGIService.user=new User(token);
      await this.ESGIService.user.init(this.ESGIService.url);
      this.AppComponent.refreshName();
      this.router.navigate(["allRecipe"]).then();
    }
  }
  sign(){    
    this.router.navigate(["subscribe"]).then();
  }

}
