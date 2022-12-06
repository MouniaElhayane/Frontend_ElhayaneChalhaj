import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs..";
  // Champs du formulaire
  nomDevoir="";
  dateDeRendu?:Date;

  assignments = [
    {
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu: "2022-12-31",
      rendu:false
    },
    {
      nom:"Devoir JavaEE De Richar Grin",
      dateDeRendu: "2023-01-20",
      rendu:false
    },
    {
      nom:"Devoir gestion de projet de Mr Winter",
      dateDeRendu: "2022-11-20",
      rendu:true
    }
  ];

  ngOnInit() {
    /*
    setTimeout(() => {
      this.boutonActive = true;
    }, 3000);
    */
  }

  onSubmit() {
    console.log(this.nomDevoir);
    console.log(this.dateDeRendu);
    return false;
  }
}
