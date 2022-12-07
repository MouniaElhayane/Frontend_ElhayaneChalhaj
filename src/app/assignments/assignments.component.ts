import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs..";

  // injection du service, ne pas oublier private
  constructor(private assignmentsService:AssignmentsService) { }

  // tableau vide, on le remplira plus tard
  assignments:Assignment[] = [];

  ngOnInit() {
    // On va chercher les données
    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
    });
  }
}
