export class Resto {
    id:string = "";
    name:string = "";
    adress:string="";
    adminId:string = "";
    constructor(id:string="",name:string="",adress:string="",adminId:string="") {
        this.id=id;
        this.name=name;
        this.adress=adress;
        this.adminId=adminId;       
    }
}