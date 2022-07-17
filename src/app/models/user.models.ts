import axios, { AxiosInstance } from 'axios';
import { Adress } from './adress.models';

export class User {
    id:string="";
    login:string = "Invité";
    role:string="";
    token:string = "";
    name:string="";
    surname:string="";
    birthdate:string="";
    adress!:Adress;
    email:string="";
    cart:string="";
    wish:string="";
    favorite:string[]=[];
    stock:string="";
    history:string="";
    material:string="";
    orderinProgress:string="";
    photo:string="";    
    resto:string="";
    rest:string="";
    instance!:AxiosInstance;
    constructor(token:string="",id:string="",login:string="",role:string="",name:string="",surname:string="",birthdate:string="",adress:Adress=new Adress(),email:string="",cart:string="",wish:string="",favorite:string[]=[],stock:string="",history:string="",material:string="",orderinProgress:string="",photo:string="") {
        if(token!==""){
            this.token=token;
        }else{
            this.id=id;
            this.login=login;
            this.role=role;
            this.name=name;
            this.surname=surname;
            this.birthdate=birthdate;
            this.adress=adress;
            this.email=email;
            this.cart=cart;
            this.wish=wish;
            this.favorite=favorite;
            this.stock=stock;
            this.history=history;
            this.material=material;
            this.orderinProgress=orderinProgress;
            this.photo=photo;
        }
    }
    
    async init(url:string){
        this.setInstance(url);
        await this.getUser();
    }
    setWithData(data: { id: string; login: string; role: string; name: string; surname: string; birthdate: string; adress: Adress; email: string; cart: string; wish: string; favorite: string[]; stock: string; history: string; material: string; orderinProgress: string; photo: string; }){
            this.id=data.id;
            this.login=data.login;
            this.role=data.role;
            this.name=data.name;
            this.surname=data.surname;
            this.birthdate=data.birthdate;
            this.adress=data.adress;
            this.email=data.email;
            this.cart=data.cart;
            this.wish=data.wish;
            this.favorite=data.favorite;
            this.stock=data.stock;
            this.history=data.history;
            this.material=data.material;
            this.orderinProgress=data.orderinProgress;
            this.photo=data.photo;
    }
    async getUser(){
        await this.instance.get('/auth/me')
        .then( (response) => {
        this.id=response.data._id      
        this.login=response.data.login
        this.role=response.data.role
        this.name=response.data.name;
        this.surname=response.data.surname;
        this.birthdate=response.data.birthdate.slice(0,10);
        this.adress=new Adress(response.data.adress._id, response.data.adress.number,response.data.adress.street,response.data.adress.postalCode,response.data.adress.town,response.data.adress.country);
        this.email=response.data.email;
        this.cart=response.data.cart;
        this.wish=response.data.wishlist;
        this.favorite=response.data.favorite;
        this.stock=response.data.stock;
        this.history=response.data.history;
        this.material=response.data.material;
        this.orderinProgress=response.data.orderinProgress;
        this.photo=response.data.photo;
        });
    }
    /* async getResto(user:User){
        await user.instance.get(user.role+'/getResto/'+this.resto)
        .then( (response) => {
            this.rest=new Resto(this.resto,response.data.name,response.data.adress,response.data.admin)  
        });
    } */
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