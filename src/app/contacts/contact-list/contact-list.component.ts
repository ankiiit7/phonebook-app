import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { contacts } from '../contacts.model';
import { FormGroup, FormControl } from '@angular/forms';
import { AddContactsService } from 'src/app/contacts.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableResource } from 'angular5-data-table';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],

})
export class ContactListComponent implements OnInit ,OnDestroy{
  // contacts:contacts[];
  contactsForm:FormGroup;
  contacts:{firstname:string}[];
  id: any;
  subscription:Subscription;
  filteredContacts:any[];
  // data table
  tableResource:DataTableResource<contacts>;
  items:contacts[]=[];
  itemCount:number;

  constructor( private contactsService:ContactsService,
               private addContactsService:AddContactsService,
               private router:Router,
               private route: ActivatedRoute,
              ) { 
             this.subscription= this.addContactsService.getAll().subscribe(contact=>{
              this.filteredContacts=this.contacts=contact;
              this.initializeTable(contact);
             
             });
              }


   private initializeTable(contacts:contacts[]) 
   {
    this.tableResource=new DataTableResource(contacts);
    this.tableResource.query({offset:0})
    .then(items=> this.items=items);
    this.tableResource.count()
    .then(count => this.itemCount = count);
   } 
   
   reloadItems(params){

    if(!this.tableResource) return;
    this.tableResource.query(params)
    .then(items=> this.items=items);
   }

  ngOnInit() {
  
    this.contacts=this.contactsService.getContacts();
  
  }

  filter(query:string){
    this.filteredContacts=(query)?
    this.contacts.filter(p =>p.firstname.toLowerCase().includes(query.toLowerCase())): this.contacts;
    this.initializeTable(this.filteredContacts);
  }

  onSubmit(){
    this.router.navigate(['contacts/contact-list'])
  }
 
  save(form){
   this.addContactsService.create(form);
   form.reset();
  }

  editpage(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  delete(){
  if(confirm('Are you sure you want to delete the contact?'))
  {
    this.addContactsService.delete(this.id);
  }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
