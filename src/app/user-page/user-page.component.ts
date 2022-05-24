import { Component, OnInit } from '@angular/core';
import { ESGIService } from '../services/esgi.service';
import { UserService } from '../services/user.service';
import axios,{AxiosInstance} from 'axios';
import {AppComponent} from '../app.component';
import { Router } from '@angular/router';
import { User } from '../models/user.models';
import { Resto } from '../models/resto.models';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  user:User;
  activity:string="neutre";
  nbResto:number=0;
  nbAdmin:number=0;
  valideMessage:string[]=["Valide"]
  listeResto:Resto[]=[]
  oneResto:Resto= new Resto()
  listeAdmin:User[]=[]
  oneAdmin:User= new User()
  error=false;

  constructor(private ESGIService:ESGIService,private UserService:UserService,private router:Router,private AppComponent:AppComponent) {
    this.user=this.ESGIService.user;
  }
  
  ngOnInit(): void {
    this.user=this.ESGIService.user;
    if(this.user.login==="Invité"){
      console.log("merde")
      this.router.navigate(["/login"]).then();
    }else{
      this.user=this.ESGIService.user;
      this.getStat();
    }
  }
  showCreateResto(){
    this.activity="createResto";
    this.error=false;
  }
  showCreateBigBoss(){
    this.activity="createBigBoss";
    this.error=false;
  }
  showDisplayOneResto(id:string){
    this.oneResto= new Resto();
    this.user.instance.get("/bigboss/getResto/"+id,{}).
    then( (response) => {
      this.oneResto=new Resto(response.data._id,response.data.name,response.data.adress,);
      console.log(this.oneResto);
      this.activity="displayOneResto";
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  showDisplayRestos(){
    this.listeResto=[]
    this.user.instance.get("/bigboss/getAllResto",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; adress: string | undefined; }) => {
        this.listeResto.push(new Resto(element._id,element.name,element.adress))
      });
      console.log(this.listeResto);
      this.activity="displayResto";
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }
  showCreateAdmin(){
    this.activity="createAdmin";
    this.error=false;
  }
  showDisplayAdmin(){
    this.listeAdmin=[]
    this.user.instance.get("/bigboss/getAllAdmin",{}).
    then( (response) => {
      response.data.forEach((element: { _id: string | undefined; login: string | undefined; role: string | undefined; restaurant: string | undefined; }) => {
        this.listeAdmin.push(new User("",element._id,element.login,element.role,element.restaurant))
      });
      this.activity="displayAdmin";
      this.error=false;
    }, (error) => {
      console.log(error);
    });
    this.activity="displayAdmin";
    this.error=false;
  }

  showDisplayOneAdmin(id:string){
    this.oneAdmin= new User();
    this.user.instance.get("/bigboss/getAdmin/"+id,{}).
    then( (response) => {
      this.oneAdmin=new User("",response.data._id,response.data.login,response.data.role,response.data.restaurant);
      if(this.oneAdmin.resto!=="000000000000000000000000"){
        this.oneAdmin.getResto(this.user)
      }
      console.log(this.oneAdmin);
      this.activity="displayOneAdmin";
      this.error=false;
    }, (error) => {
      console.log(error);
    });
  }

  createResto(){
    this.error=false
    this.valideMessage=["validé"];
    let restoNameText=document.getElementById("restoNameCreate");
    let restoName=(<HTMLInputElement>restoNameText).value;
    let restoAddressText=document.getElementById("restoAddressCreate");
    let restoAddress=(<HTMLInputElement>restoAddressText).value;
    if(restoName==="" || restoAddress===""){
      this.error=true;
      return
    }
    this.user.instance.post("/bigboss/createResto",{
        name:restoName,
        adress:restoAddress,
        admin:"000000000000000000000000"
    }).
    then((response) => {
      if(response.status===200){
        this.activity="valider";
        this.valideMessage.push("Le restaurant "+restoName+" a été créer avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }

  updateResto(){
    this.valideMessage=["validé"];
    this.error=false
    let restoNameText=document.getElementById("restoNameUpdate");
    let restoName=(<HTMLInputElement>restoNameText).value;
    let restoAddressText=document.getElementById("restoAddressUpdate");
    let restoAddress=(<HTMLInputElement>restoAddressText).value;
    if(restoName==="" || restoAddress===""){
      this.error=true;
      return
    }
    this.user.instance.put("/bigboss/updateResto/"+this.oneResto.id,{
        name:restoName,
        adress:restoAddress
    }).
    then((response) => {
      if(response.status===200){
        this.activity="valider";
        this.valideMessage.push("Le restaurant "+restoName+" a été modifié avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    
  }
  createAdmin(){
    this.valideMessage=["validé"];
    this.error=false
    let adminNameText=document.getElementById("restoNameCreate");
    let adminName=(<HTMLInputElement>adminNameText).value;
    let adminPassword1Text=document.getElementById("restoAddressCreate");
    let adminPassword1=(<HTMLInputElement>adminPassword1Text).value;
    let adminPassword2Text=document.getElementById("restoAddressCreate");
    let adminPassword2=(<HTMLInputElement>adminPassword2Text).value;
    let adminRoleTxt=document.getElementById("roleNewUser");
    let adminRole=(<HTMLInputElement>adminRoleTxt).value;
    if(adminName==="" || adminPassword1==="" || adminPassword2==="" || adminPassword1!==adminPassword2){
      this.error=true;
      return
    }
    this.user.instance.post("/bigboss/subscribeAdmin",{
        login:adminName,
        password:adminPassword1,
        role:adminRole
    }).
    then((response) => {
      if(response.status===200){
        this.activity="valider";
        this.valideMessage.push("Le compte "+adminName+" a été créer avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }

  
  async updateAdmin(){
    this.error=false
    let nameResto=""
    this.valideMessage=["validé"];
    let adminNameText=document.getElementById("adminLoginUpdate");
    let adminName=(<HTMLInputElement>adminNameText).value;
    let adminPassword1Text=document.getElementById("adminPasswordUpdate1");
    let adminPassword1=(<HTMLInputElement>adminPassword1Text).value;
    let adminPassword2Text=document.getElementById("adminPasswordUpdate2");
    let adminPassword2=(<HTMLInputElement>adminPassword2Text).value;
    let adminRestoId=""
    if (this.oneAdmin.resto==='000000000000000000000000'){
      let adminRestoIdText=document.getElementById("listRestoForAdmin");
      adminRestoId=(<HTMLInputElement>adminRestoIdText).value;
      console.log("value id ",adminRestoId);
    }else{
      adminRestoId='000000000000000000000000'
    }
    if(adminName==="" || adminPassword1==="" || adminPassword2==="" || adminPassword1!==adminPassword2){
      this.error=true;
      return
    }
    if(this.oneAdmin.resto!==adminRestoId && adminRestoId!=="000000000000000000000000"){
      await this.user.instance.get("/bigboss/getResto/"+adminRestoId,{}).
      then( (response) => {
        nameResto=response.data.name;
        console.log(response.data.admin,adminRestoId,nameResto,this.oneAdmin.id)
        if ((response.data.admin!=="000000000000000000000000"&& response.data.admin!==undefined) && response.data.admin!==this.oneAdmin.id){
          console.log("deja assigner");
          this.error=true;
        }
      }, (error) => {
        console.log(error);
        this.error=true;
      });
    }
    if (this.error){
      return
    }else if (adminRestoId!=="000000000000000000000000"){
      await this.user.instance.put("/bigboss/affectAdminToResto",{
        resto_id:adminRestoId,
        admin_id:this.oneAdmin.id
      }).
      then( (response) => {
        this.valideMessage.push('Le restaurant '+ nameResto+' à bien été affecter à '+ adminName+"\n");
        
      }, (error) => {
        console.log(error);
        this.error=true;
      }); 
    }
    this.user.instance.put("/bigboss/updateAdmin/"+this.oneAdmin.id,{
      login:adminName,
      password:adminPassword1,
      role:"Admin"
    }).
    then((response) => {
      if(response.status===200){
        this.activity="valider";
        this.valideMessage.push("L'admin "+adminName+" a été modifié avec succès.\n")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });

  }
  showAdminFunction(){    
    this.router.navigate(["/user-Admin"]).then();
  }

  deleteResto(){   
    this.valideMessage=["validé"]; 
    this.error=false
    this.user.instance.delete("/bigboss/deleteResto/"+this.oneResto.id,{}).
    then((response) => {
      if(response.status===204){
        this.activity="valider";
        this.valideMessage.push("Le restaurant "+this.oneResto.name+" a été supprimer avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }
  deleteAdmin(){    
    this.error=false
    this.user.instance.delete("/bigboss/deleteAdmin/"+this.oneAdmin.id,{}).
    then((response) => {
      if(response.status===204){
        this.activity="valider";
        this.valideMessage.push("L'admin "+this.oneAdmin.login+" a été supprimer avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }

  removeResto(){
    console.log("debut");
    this.valideMessage=["validé"];
    this.user.instance.put("/bigboss/updateResto/"+this.oneAdmin.rest.id,{
      admin:"000000000000000000000000"
    }).
    then((response) => {
      if(response.status===200){
        this.activity="valider";
        this.valideMessage.push("Le restaurant "+this.oneAdmin.rest.name+" a été dissocier avec succès.\n")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    this.user.instance.put("/bigboss/updateAdmin/"+this.oneAdmin.id,{
      restaurant:"000000000000000000000000"
    }).
    then((response) => {
      if(response.status===200){
        this.activity="valider";
        this.valideMessage.push("L'admin "+this.oneAdmin.login+" a été dossocier avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    console.log("fin",this.activity);
    
  }
  createBigBoss(){
    this.error=false;
    this.valideMessage=["validé"];
    let BBNameText=document.getElementById("bigBossLoginCreate");
    let BBName=(<HTMLInputElement>BBNameText).value;
    let BBPassword1Text=document.getElementById("bigBossPasswordCreate1");
    let BBPassword1=(<HTMLInputElement>BBPassword1Text).value;
    let BBPassword2Text=document.getElementById("bigBossPasswordCreate2");
    let BBPassword2=(<HTMLInputElement>BBPassword2Text).value;
    if(BBName==="" || BBPassword1==="" || BBPassword2==="" || BBPassword1!==BBPassword2){
      this.error=true;
      return
    }
    this.user.instance.put("/bigboss/newBigBoss/"+this.user.id,{
      login:BBName,
      password:BBPassword1
    }).
    then((response) => {
      if(response.status===204){
        this.activity="valider";
        this.user.role="renew";
        this.valideMessage.push("Le nouveau Big Boss "+BBName+" a été crée avec succès.")
      }
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }

  async backToNeutral(){ 
    if(this.user.role==="renew"){
      this.ESGIService.user=new User("","","Invité")      
      this.router.navigate(["/login"]).then();
    }else{
      await this.getStat()
      this.activity="neutre"
      this.valideMessage=["validé"];
    }
  }

  async getStat(){
    this.error=false;
    this.listeResto=[];
    this.listeAdmin=[];
    this.user.instance.get("/bigboss/getAllResto",{}).
    then( (response) => {
      this.nbResto=response.data.length;
      response.data.forEach((element: { _id: string | undefined; name: string | undefined; adress: string | undefined; }) => {
        this.listeResto.push(new Resto(element._id,element.name,element.adress))
      });  
    }, (error) => {
      console.log(error);
      this.error=true;
    });
    this.user.instance.get("/bigboss/getAllAdmin",{}).
    then( (response) => {
      this.nbAdmin=response.data.length;
      response.data.forEach((element: { _id: string | undefined; login: string | undefined; role: string | undefined; restaurant: string | undefined; }) => {
        this.listeAdmin.push(new User("",element._id,element.login,element.role,element.restaurant))
      });    
    }, (error) => {
      console.log(error);
      this.error=true;
    });
  }
}


