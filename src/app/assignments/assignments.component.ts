import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des devoirs..';

  // injection du service, ne pas oublier private
  constructor(private assignmentsService: AssignmentsService) {}

  // tableau vide, on le remplira plus tard
  assignments: Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  totalDocs = 0;
  limit = 10;
  page = 1;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage = true;
  hasNextPage = true;
  prevPage = 1;
  nextPage = 0;

  ngOnInit() {
    this.getAssignments();
  }

  getAssignments() {
    // On va chercher les données
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit)
    .subscribe((data) => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  onPageSuivante() {
    this.page++;
    this.getAssignments();
  }

  onPagePrecedente() {
    this.page--;
    this.getAssignments();
  }

  onPremierePage() {
    this.page = 1;
    this.getAssignments();
  }

  onDernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  onPageChange(event: any) {
    console.log(event);
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAssignments();
  }
}
