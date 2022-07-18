import { User } from "./user.models";

export class Demande {
    id:string="";
    user:User = new User();
    message:string="";
    constructor(id:string="",message:string="",user:User=new User()) {
        this.id=id;
        this.message=message;
        this.user=user;
    }
    setWithData(data: { id: string; message: string; user: User; }){
        this.id=data.id;
        this.message=data.message;
        this.user=new User();
        this.user.setWithData(data.user)
    }
}