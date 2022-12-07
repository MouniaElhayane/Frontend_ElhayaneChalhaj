import { Component, EventEmitter, Output } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  @Output() nouvelAssignment = new EventEmitter<Assignment>()

   // Champs du formulaire
   nomDevoir="";
   dateDeRendu?:Date;

   constructor(private assignmentsService:AssignmentsService) {}

  onSubmit() {
    console.log(this.nomDevoir);
    console.log(this.dateDeRendu)

    if((!this.dateDeRendu) || (!this.nomDevoir))
      return false;

    const assignment = new Assignment();
    assignment.nom = this.nomDevoir;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.rendu = false;

    // on utilise le service de gestion des assignments
    this.assignmentsService.addAssignment(assignment)
    .subscribe(message => {
      // on rentre ici que quand la donnée a été effectivement ajoutée
      console.log(message);

      // On affiche la liste en envoyant un message au père
      this.nouvelAssignment.emit(assignment);
    });
    return false;
  }

}
