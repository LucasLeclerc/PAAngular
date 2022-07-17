export class Recipe {
    id:string="";
    tittle:string = "";
    description:string="";
    price:number = 0;
    ingredient:string[] =[];
    timeToPrepare:number=0;
    instruction:string="";
    photo:string="";
    requirerTool:string[]=[];
    type:string[]=[];
    constructor(id:string="",title:string="",description:string="",price:number=0,ingredient:string[]=[],timeToPrepare:number=0,instruction:string="",photo:string="",requirerTool:string[]=[],type:string[]=[]) {
        this.id=id;
        this.tittle=title;
        this.description=description;
        this.price=price;
        this.ingredient=ingredient;
        this.timeToPrepare=timeToPrepare;
        this.instruction=instruction;
        this.photo=photo;
        this.requirerTool=requirerTool;
        this.type=type;    
    }
    setWithData(data: { _id: string; tittle: string; description: string; price: number; ingredient: string[]; timeToPrepare: number; instruction: string; photo: string; requirerTool: string[]; type: string[]; }){
        this.id=data._id;
        this.tittle=data.tittle;
        this.description=data.description;
        this.price=data.price;
        this.ingredient=data.ingredient;
        this.timeToPrepare=data.timeToPrepare;
        this.instruction=data.instruction;
        this.photo=data.photo;
        this.requirerTool=data.requirerTool;
        this.type=data.type;
    }
}