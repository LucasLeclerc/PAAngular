export class Product {
    id:string = "";
    name:string = "";
    price:number=0;
    description:string = "";
    type:string[] = []
    constructor(id:string="",name:string="",price:number=0,description:string="",type:string[]=[]) {
        this.id=id;
        this.name=name;
        this.price=price;
        this.description=description;       
        this.type=type;
    }
}