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
      id:1,
      nom:"Devoir Angular de Mr Buffa",
      dateDeRendu: new Date("2022-12-31"),
      rendu:false
    },
    {
      id:2,
      nom:"Devoir JavaEE De Richar Grin",
      dateDeRendu: new Date("2023-01-20"),
      rendu:false
    },
    {
      id:3,
      nom:"Devoir gestion de projet de Mr Winter",
      dateDeRendu: new Date("2022-11-20"),
      rendu:true
    }
  ];

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    const assignment = this.assignments.find(a => a.id === id);

    // APRES QUAND ON AURA UN WEB SERVICE on interrogera un URI
    // de type http://serveur.com/assignments/id avec un HTTP GET
    return of(assignment);
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
