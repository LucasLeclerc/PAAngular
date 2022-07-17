import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import * as sampleModule from 'axios';
import { User } from '../models/user.models';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  error:boolean = false;
  activity:string="1";
  champ:string[]=[];
  champ2:number[]=[];
  
  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
   }

  ngOnInit(): void {
    if(this.ESGIService.user.login!=="Invité"){
      this.ESGIService.setUserPage(this.router);
    }else{
    }
  }
  async sub(){
    let login:string=(<HTMLInputElement>document.getElementById('login')).value;
    let mdp:string=(<HTMLInputElement>document.getElementById('mdp')).value;
    let prenom=this.champ[0];
    let nom=this.champ[1];
    let date=this.champ[2];
    let email=this.champ[3];
    let numero=this.champ2[0];
    let rue=this.champ[4];
    let postal=this.champ[5];
    let ville=this.champ[6];
    let pays=this.champ[7];
    let token="";
    console.log(login,mdp,prenom,nom,date,numero,rue,postal,ville,pays,email);
    const instance=axios.create({
      baseURL: this.ESGIService.url,
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    })
    await instance.post('/auth/subscribe',{
      login: login,
      password: mdp,
      name:prenom,
      surname:nom,
      birthdate: date,
      adress:{ 
        number:numero,
        street:rue,
        postalCode:postal,
        town:ville,
        country:pays
      },
      email:email,
      photo:"test"
    })
    .then( (response) => {
      token=response.data.token;
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    if(!this.error){const instance=axios.create({
      baseURL: this.ESGIService.url,
      headers: {
        'Access-Control-Allow-Origin':'*',
      },
    })
    await instance.post('/auth/login',{
      login: login,
      password: mdp
    })
    .then( (response) => {
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
  }
  switch1To2(){
    let prenom:string=(<HTMLInputElement>document.getElementById('surname')).value;
    let nom:string=(<HTMLInputElement>document.getElementById('name')).value;
    let date:string=(<HTMLInputElement>document.getElementById('birthdate')).value;
    let email:string=(<HTMLInputElement>document.getElementById('email')).value;
    this.champ.push(prenom,nom,date,email)
    this.activity='2';
  }
  switch2To3(){
    let numero:number=+(<HTMLInputElement>document.getElementById('number')).value;
    let rue:string=(<HTMLInputElement>document.getElementById('street')).value;
    let postal:string=(<HTMLInputElement>document.getElementById('postalCode')).value;
    let ville:string=(<HTMLInputElement>document.getElementById('town')).value;
    let pays:string=(<HTMLInputElement>document.getElementById('country')).value;
    this.champ2.push(numero)
    this.champ.push(rue,postal,ville,pays)
    this.activity='3';
  }

  log(){
    this.router.navigate(["login"]).then();
  }



}
