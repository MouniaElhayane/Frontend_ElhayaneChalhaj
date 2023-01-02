import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { noop } from 'rxjs';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titre = 'Application de gestion des assignments';

  constructor(private assignmentsService: AssignmentsService,
    private router:Router) { }
  ngOnInit(): void {
    this.assignmentsService.getMatier().subscribe(noop)
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBD();
    this.assignmentsService.peuplerBDAvecForkJoin()
    .subscribe(() => {
      console.log("BD peuplée");
      this.router.navigate(['/home']);
    })
  }


}
