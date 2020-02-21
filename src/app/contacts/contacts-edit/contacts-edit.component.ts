import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddContactsService } from './../../contacts.service';
import  'rxjs/add/operator/take';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  contact;
  id;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private contactsService:AddContactsService,
  ) { 

    // let id = this.route.snapshot.paramMap.get('id');
    // if(this.id)
    // {
    //    this.contactService.get(this.id).pipe(take(1)).subscribe(p => this.contact= p );
    // }

     this.id= this.route.snapshot.paramMap.get('id');
    if(this.id){ 
      this.contactsService.get(this.id).take(1).subscribe(p => {
        console.log('res',p)
        this.contact = p
    
      });
    }
     
  


  }
  onUpdate(){
    this.contactsService.update(this.id,this.contact);
    this.router.navigate(['contacts/contact-list'])
  }

  onDelete(){
    if(!confirm('Are you sure you want to delete the contact?')) return;
  
    this.contactsService.delete(this.id);
    this.router.navigate(['contacts/contact-list'])
  

  }

 
  ngOnInit() {
  }
  

}
