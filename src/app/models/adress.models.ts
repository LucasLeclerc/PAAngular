export class Adress {
    id:string = "";
    number:number = 0;
    street:string="";
    postalCode:number=0;
    town:string = "";
    country:string = "";
    constructor(id:string="",number:number=0,street:string="",postalCode:number=0,town:string = "",country:string = "") {
        this.id=id;
        this.number=number;
        this.street=street;
        this.postalCode=postalCode;       
        this.town=town;       
        this.country=country;       
    }
}