import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios,{AxiosInstance} from 'axios';
import { ESGIService } from '../services/esgi.service';

@Injectable({
  providedIn: 'root'
})

export class UserService{
  token:string="";
  role:string="";
  name:string="Invité";
  instance!:AxiosInstance;
  pass:string="";

  async getUser(){    
    await this.instance.get('/auth/me')
    .then( (response) => {
      this.name=response.data.login
      this.role=response.data.role      
    });
  }
}