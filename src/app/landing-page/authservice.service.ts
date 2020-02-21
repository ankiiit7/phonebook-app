import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  kind:string,
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string;
  localId:string,
  registered?:boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  user=new Subject<User>();

  constructor( private http:HttpClient,
    private router:Router) { }

  signUp(email:string,password:string){
     return this.http.post<AuthResponseData>(
       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvbSPfuaEenGlg5QT53vf250Fg8w8SWLs',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }
    )
    .pipe(catchError(this.handleError),tap(resData =>{
      this.handleAuthentication(
          resData.email,
          resData.localId, 
          resData.idToken,
          +resData.expiresIn);
     
  }));
  }



  logIn(email:string,password:string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvbSPfuaEenGlg5QT53vf250Fg8w8SWLs',
   {
     email:email,
     password:password,
     returnSecureToken:true
   }
    ).pipe(catchError(this.handleError),tap(resData =>{
      this.handleAuthentication(
          resData.email,
          resData.localId, 
          resData.idToken,
          +resData.expiresIn);
     
  }));
  }


  logOut(){
    this.user.next(null);
    this.router.navigate(['auth'])
}

  private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
    const expirationDate =new Date( new Date().getTime() + expiresIn *1000);
    const user=new User(email,userId,token,expirationDate);

     this.user.next(user);
     
     localStorage.setItem('userData',JSON.stringify(user));
        

}
  

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage="An Unknown Error Occured";
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }

      switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage="The Email Already Exists";
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage="The User Does Not Exists";
            break;
        case 'INVALID_PASSWORD':
            errorMessage="Please Enter a valid Password";
    }
       return throwError(errorMessage);

  }

}
