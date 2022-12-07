import { Component, Input } from '@angular/core';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
  @Input() assignmentTransmis?:Assignment;

  constructor(private assignmentsService:AssignmentsService) {}

  onAssignmentRendu() {
    if(!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // et on demande au service de faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
    });
  }

  onDelete() {
    if(!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      // pour supprimer l'affichage du composant de détail
      this.assignmentTransmis = undefined;
    });
  }
}
