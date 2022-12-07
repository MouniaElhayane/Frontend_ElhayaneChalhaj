import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor() { }

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

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(a:Assignment):Observable<string> {
    this.assignments.push(a);
    return of("Assignment ajouté");
  }

  updateAssignment(a:Assignment):Observable<string> {
    // rien besoin de faire pour le moment,
    // plus tard -> requête PUT sur un web service
      return of("Assignment modifié");
  }

  deleteAssignment(a:Assignment):Observable<string> {
    const pos = this.assignments.indexOf(a);
    this.assignments.splice(pos, 1);
    
    // plus tard -> requête DELETE sur un web service
      return of("Assignment supprimé");
  }

}
