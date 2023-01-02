export class Assignment {
  _id?:string;
  id!:number;
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  note!:number
  remarque!:string
  matier!:string
  auteur!:string
  constructor(obj?:any){
    if(obj){
      this.id = Math.floor(Math.random()*10000000000000000);
      this.nom = obj.nomDevoir;
      this.dateDeRendu = obj.dateDeRendu;
      this.rendu = false;
      this.auteur =obj.auteur
      this.note =obj.note 
      this.remarque =obj.remarque
      this.matier=obj.matier
    }
 

  }

}
