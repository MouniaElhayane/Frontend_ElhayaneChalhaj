import { Pipe, PipeTransform } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';

@Pipe({
  name: 'getMatiere'
})
export class GetMatierePipe implements PipeTransform {
  
  constructor(private matierService:AssignmentsService){
  }

  transform(value: unknown, ...args: unknown[]) {
    let matier =   this.matierService.matiers.find((m:any)=>m._id ==value)    
    return matier ?  matier['label'] : value;
  }

}
