import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs..";
  formVisible = false;

  // l'assignment qui a été cliqué
  assignmentSelectionne?:Assignment;

  assignments:Assignment[] = [
    {
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu: new Date("2022-12-31"),
      rendu:false
    },
    {
      nom:"Devoir JavaEE De Richar Grin",
      dateDeRendu: new Date("2023-01-20"),
      rendu:false
    },
    {
      nom:"Devoir gestion de projet de Mr Winter",
      dateDeRendu: new Date("2022-11-20"),
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

  assignmentClique(a:Assignment) {
    this.assignmentSelectionne = a;
  }

  ajouterAssignment(a:Assignment) {
    this.assignments.push(a);
    this.formVisible = false;
  }
}
