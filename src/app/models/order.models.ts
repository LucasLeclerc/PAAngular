import { Menu } from "./menu.models";
import { Product } from "./product.models";
import { Promo } from "./promo.models";
import { Resto } from "./resto.models";
import { User } from "./user.models";

export class Order {
    id:string = "";
    status:string = "";
    nb:number = 0;
    price:number=0;
    customer:User=new User();
    preparator:User=new User();
    date:Date=new Date();
    resto:Resto=new Resto();
    destination:string="";
    contentProduct:Product[] =[];
    contentMenu:Menu[]=[] ;
    contentPromo:Promo[]=[];
    constructor(id:string="",status:string="",price:number=0,date:string="",destination:string="") {
        this.id=id;
        this.status=status;
        this.price=price;
        this.date=new Date(date);
        this.destination=destination;
    }
    getInfo(tabId:string[],userId:string,user:User){
        user.instance.get("/auth/getUser/"+userId,{}).
            then( (response) => {
                this.customer=new User("",response.data._id,response.data.login,response.data.role,response.data.restaurant);
            }, (error) => {
                console.log(error);
            });
            tabId.forEach(elemen=>{
                let verif=false;
                user.instance.get("/admin/getProduct/"+elemen,{}).
                then( (response) => {
                    this.contentProduct.push(new Product(response.data._id,response.data.name,response.data.price,response.data.description,response.data.type));
                }, (error) => {
                    console.log(error);
                    verif=true;
                });
                if(verif){
                    user.instance.get("/admin/getMenu/"+elemen,{}).
                    then( async (response) => {
                        let tmp=new Menu(response.data._id,response.data.name,response.data.price,response.data.description);
                        await tmp.getContent(response.data.content,user);
                        this.contentMenu.push(tmp);
                        verif=false;
                    }, (error) => {
                        console.log(error);
                        verif=true;
                    }); 
                }
                if(verif){
                    user.instance.get("/admin/getPromo/"+elemen,{}).
                    then( (response) => {
                        let tmp=new Promo(response.data._id,response.data.name,response.data.price,response.data.promotionType,response.data.beginDate.substring(0,10),response.data.endDate.substring(0,10));
                        tmp.getContent(response.data.content,user);
                        this.contentPromo.push(tmp);
                        verif=false;
                    }, (error) => {
                        console.log(error);
                        verif=true;
                    });
                }
            })
    }
}