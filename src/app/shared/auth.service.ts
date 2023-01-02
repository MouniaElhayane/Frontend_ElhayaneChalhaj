import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $currentUSer = new BehaviorSubject({name:'',isLogged:false,role:''});
  URI = "http://localhost:8010/api/login";

  constructor(private http:HttpClient) { 
    let userString = localStorage.getItem('user')
    let user = userString ? JSON.parse(userString) : {name:'',username:null,role:''}

    this.$currentUSer.next(user)
  }

  login(username:string,password:string){
   
    return this.http.post(this.URI, {username:username,password:password}).pipe(
      tap((res:any)=>{
        console.log(res)
        let user:any = {...jwt_decode(res.token), token:res.token}
        this.$currentUSer.next({...user,isLogged:true}) ;
        localStorage.setItem('user',JSON.stringify(user))
      })
    );

    
  
  }

  logout(){
    localStorage.removeItem('user')
    this.$currentUSer.next({name:'',isLogged:false,role:''})

  }



}
