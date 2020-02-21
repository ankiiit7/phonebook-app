import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthserviceService } from '../landing-page/authservice.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub:Subscription;
  isAuthenticated=false;

  constructor(private authService:AuthserviceService) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe( user =>{
      this.isAuthenticated=!!user;
      console.log(!user);
      console.log(!!user);

    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogOut(){
    this.authService.logOut();
  }

}
