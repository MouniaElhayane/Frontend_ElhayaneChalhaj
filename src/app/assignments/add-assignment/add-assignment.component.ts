import { Component, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  // nouvelAssignment est à la fois le nom de l'événement et l'émmetteur de l'événement
  @Output() nouvelAssignment = new EventEmitter<Assignment>();

   // Champs du formulaire
   nomDevoir="";
   dateDeRendu?:Date;

  onSubmit() {
    console.log(this.nomDevoir);
    console.log(this.dateDeRendu)

    if((!this.dateDeRendu) || (!this.nomDevoir))
      return false;

    const assignment = new Assignment();
    assignment.nom = this.nomDevoir;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.rendu = false;

    //this.assignments.push(assignment);

    // on envoie un événement (celui déclaré dans @Output)
    // et on attache à l'événement l'assignement créé
    this.nouvelAssignment.emit(assignment);

    return false;
  }

}
