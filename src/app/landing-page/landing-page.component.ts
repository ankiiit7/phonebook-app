import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthserviceService } from './authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  isLoginMode=true;
  isLoading=false;
  error:string=null;

  constructor( private authService:AuthserviceService, private router :Router) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }


  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
   const email=form.value.email;
   const password=form.value.password;
   this.isLoading=true;

   if(this.isLoginMode){
      this.authService.logIn(email,password).subscribe(resData=> {
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/contacts'])
      },errorMessage =>{
        console.log(errorMessage);
        this.error=errorMessage;
        this.isLoading=false;
      })
   }
   else{
    this.authService.signUp(email,password).subscribe(resData=> {
      console.log(resData);
      this.isLoading=false;
    },errorMessage =>{
      console.log(errorMessage);
      this.error=errorMessage;
      this.isLoading=false;
    });
   }

  
    form.reset();

  }
}
