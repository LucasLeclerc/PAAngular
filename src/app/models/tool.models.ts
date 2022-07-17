export class Tool {
    id:string = "";
    name:string = "";
    photo:string="";
    description:string="";
    constructor(id:string="",name:string="",photo:string="",description:string = "") {
        this.id=id;
        this.name=name;
        this.photo=photo;      
        this.description=description;      
    }
}