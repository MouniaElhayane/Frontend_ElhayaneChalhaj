import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
   // Champs du formulaire
   nomDevoir="";
   dateDeRendu?:Date;

   constructor(private assignmentsService:AssignmentsService,
    private router:Router) {}

  onSubmit() {
    console.log(this.nomDevoir);
    console.log(this.dateDeRendu)

    if((!this.dateDeRendu) || (!this.nomDevoir))
      return false;

    const assignment = new Assignment();
    assignment.id = Math.floor(Math.random()*10000000000000000);
    assignment.nom = this.nomDevoir;
    assignment.dateDeRendu = this.dateDeRendu;
    assignment.rendu = false;

    // on utilise le service de gestion des assignments
    this.assignmentsService.addAssignment(assignment)
    .subscribe(message => {
      // on rentre ici que quand la donnée a été effectivement ajoutée
      console.log(message);

      // On affiche la liste en envoyant avec le router
      this.router.navigate(['/home']);
    });
    return false;
  }

}
