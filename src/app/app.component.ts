import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = 'Application de gestion des assignments';

  constructor(private assignmentsService: AssignmentsService,
    private router:Router) { }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();
    this.assignmentsService.peuplerBDAvecForkJoin()
    .subscribe(() => {
      console.log("BD peuplée");
      this.router.navigate(['/home']);
    })
  }


}
