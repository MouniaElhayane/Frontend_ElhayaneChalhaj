import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit ,AfterViewInit {
  titre = 'Liste des devoirs..';
  currentUser:any 
  @ViewChild(MatSort)
  sort!: MatSort;
  searchName=""
  // injection du service, ne pas oublier private
  constructor(private route:Router, private _liveAnnouncer: LiveAnnouncer, private assignmentsService: AssignmentsService,private authService:AuthService) {}

  // tableau vide, on le remplira plus tard
  assignments= new MatTableDataSource<Assignment>([]) ;
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'auteur','matier','note','remarque', 'rendu','actions'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  totalDocs = 0;
  limit = 10;
  page = 1;
  totalPages = 0;
  pagingCounter = 0;
  hasPrevPage = true;
  hasNextPage = true;
  prevPage = 1;
  nextPage = 0;
  filter:any={}

  ngOnInit() {
   
    this.getAssignments();
    this.authService.$currentUSer.subscribe(res=>{
      this.currentUser =res
    })
  }
 
  search(inputsearch:string,rendu:any,nonrendu:any){
    console.log(inputsearch,rendu,nonrendu);
    
    this.filter = {nom : inputsearch }
    if(rendu && nonrendu) {this.getAssignments(); return}
    if(!rendu && !nonrendu) {this.getAssignments(); return}
    if(rendu) this.filter= {nom:this.filter.nom,rendu:true}
    else this.filter= {nom:this.filter.nom,rendu:false}
    this.getAssignments()

  }
  updateRendu(){
    this.getAssignments()
  }
  assignmentsSortChange(sortState:any){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngAfterViewInit() {
    this.assignments.paginator =  this.paginator
    this.assignments.sort = this.sort;

  }
  showDetails(row:any){
    this.route.navigate(['assignments',row.id])
  }
  getAssignments() {
    // On va chercher les données
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit,JSON.stringify(this.filter))
    .subscribe((data) => {
      this.assignments.data = data.docs;      
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
