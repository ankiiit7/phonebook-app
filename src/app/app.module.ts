import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsService } from './contacts/contacts.service';
import { AddModalComponent } from './add-modal/add-modal.component';
// import { ModalModule } from 'ngx-bootstrap/modal';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddContactsService } from './contacts.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { CustomFormsModule } from 'ng2-validation';
import { ContactsEditComponent } from './contacts/contacts-edit/contacts-edit.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { EmergencyComponent } from './emergency/emergency.component'
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AuthService } from './landingPageComponent/authservice.service';
import {DataTableModule} from 'angular5-data-table';




@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    AddContactsComponent,
    AddModalComponent,
    ContactsEditComponent,
    FavouritesComponent,
    EmergencyComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    DataTableModule,
    CustomFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTooltipModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NoopAnimationsModule ,   
    RouterModule.forRoot([
      {path:'' , component:LandingPageComponent},
      {path:'contacts' , component:ContactsComponent},
      {path:'favourites' , component:FavouritesComponent},
      {path:'emergency' , component:EmergencyComponent},
      // {path:'edit' , component:ContactsEditComponent},
      {path:'contacts/contact-list' , component:ContactsComponent},
      {path:'contacts/contact-list/:id' , component:ContactsEditComponent},
      // {path:':id/edit' , component:ContactsEditComponent},
      {path:'auth' , component:LandingPageComponent},
    
     
    ]),
   
  ],
  providers: [ContactsService,AddContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
