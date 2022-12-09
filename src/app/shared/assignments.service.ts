import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { bdInitialAssignments } from './data';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http:HttpClient) { }

  assignments:Assignment[] = [];

  //URI = "http://localhost:8010/api/assignments";
  URI = "https://rabatback.herokuapp.com/api/assignments";

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.URI);
  }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    //return of(this.assignments);

    return this.http.get<Assignment[]>(`${this.URI}?page=${page}&limit=${limit}`);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    //const assignment = this.assignments.find(a => a.id === id);

    // APRES QUAND ON AURA UN WEB SERVICE on interrogera un URI
    // de type http://serveur.com/assignments/id avec un HTTP GET
    //return of(assignment);

    return this.http.get<Assignment>(this.URI + "/" + id);
  }

  addAssignment(a:Assignment):Observable<any> {
    //this.assignments.push(a);
    //return of("Assignment ajouté");
    return this.http.post<Assignment>(this.URI, a);

  }

  updateAssignment(a:Assignment):Observable<any> {
    // rien besoin de faire pour le moment,
    // plus tard -> requête PUT sur un web service
      //return of("Assignment modifié");
      return this.http.put<Assignment>(this.URI, a);
    }

  deleteAssignment(a:Assignment):Observable<any> {
    //const pos = this.assignments.indexOf(a);
    //this.assignments.splice(pos, 1);

    // plus tard -> requête DELETE sur un web service
      //return of("Assignment supprimé");
      return this.http.delete(this.URI + "/" + a._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      // On crée un objet de type Assignment
      let nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(reponseObjet => {
        console.log(reponseObjet.message);
      })
    })
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

}
