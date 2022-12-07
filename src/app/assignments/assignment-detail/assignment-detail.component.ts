import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?:Assignment;

  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router) {}

  ngOnInit() {
    // ici on va récupérer l'id depuis l'URL
    // Pour manipuler l'URL on utilise un objet de type ActivatedRoute
    // Le + permet de transformer une chaîne de caractères en nombre
    const id:number = +this.route.snapshot.params['id'];

    //console.log(id)

    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if(!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // et on demande au service de faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
      // ici on veut naviguer de nouveau vers la liste !!!
      this.router.navigate(['/home']);
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
