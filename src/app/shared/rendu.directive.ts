import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(el:ElementRef) {
    el.nativeElement.style.backgroundColor = 'lightGreen';
    el.nativeElement.style.border = '1px solid green';
    el.nativeElement.style.borderRadius = '5px';
  }

}
