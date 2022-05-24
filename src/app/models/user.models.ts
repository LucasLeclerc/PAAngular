import axios, { AxiosInstance } from 'axios';
import { Resto } from './resto.models';
export class User {
    login:string = "Invité";
    id:string="";
    role:string="";
    token:string = "";
    resto:string = "";
    rest:Resto=new Resto();
    instance!:AxiosInstance;
    constructor(token:string="",id:string="",login:string="",role:string="",resto:string="") {
        if(token!==""){
            this.token=token;
        }else{
            this.id=id;
            this.login=login;
            this.role=role;
            this.resto=resto;
        }
    }
    
    async init(url:string){
        this.setInstance(url);
        await this.getUser();
    }
    async getUser(){
        await this.instance.get('/auth/me')
        .then( (response) => {
        this.id=response.data._id      
        this.login=response.data.login
        this.role=response.data.role
        this.resto=response.data.resto;    
        });
    }
    async getResto(user:User){
        await user.instance.get(user.role+'/getResto/'+this.resto)
        .then( (response) => {
            this.rest=new Resto(this.resto,response.data.name,response.data.adress,response.data.admin)  
        });
    }
    setInstance(url:string){
        this.instance=axios.create({
            baseURL: url,
            headers: {
            'authorization': 'Bearer '+this.token,
            'Access-Control-Allow-Origin':'*',
            }
        });
    }
}