import { Component } from '@angular/core';
import { noop } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    isLogged:boolean = false 
    username!: string;
    password!: string;
    currentUser:any = undefined
    constructor(private authService:AuthService){}

  ngOnInit() {
    this.authService.$currentUSer.subscribe(res=>{
      this.currentUser = res
    })
  }


  login() : void {
      this.authService.login(this.username,this.password).subscribe(noop)
  }


  logout(){
    this.authService.logout()
  }

  
  
}
