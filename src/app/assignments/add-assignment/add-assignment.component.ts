import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
   // Champs du formulaire
    matieres:any[] | undefined;
   firstFormGroup = this._formBuilder.group({
    nomDevoir: ['', Validators.required],
    dateDeRendu: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    auteur: ['', Validators.required],
    note: ['', [Validators.required,Validators.min(0),Validators.max(20)]],
    remarque: ['', Validators.required],
    matier: ['', Validators.required],
  });

   constructor(private assignmentsService:AssignmentsService,
    private _formBuilder: FormBuilder ,
    private router:Router) {}
  ngOnInit(): void {
   this.assignmentsService.getMatier().subscribe((res:any)=>{
    this.matieres =res
   })
  }

  onSubmit() {

    let obj = {...this.firstFormGroup.value,...this.secondFormGroup.value}
    const assignment = new Assignment(obj);
    assignment.id = Math.floor(Math.random()*10000000000000000);



    // on utilise le service de gestion des assignments
    this.assignmentsService.addAssignment(assignment)
    .subscribe(responseObjet => {
      // on rentre ici que quand la donnée a été effectivement ajoutée
      console.log(responseObjet.message);

      // On affiche la liste en envoyant avec le router
      this.router.navigate(['/home']);
    });
    return false;
  }

}
