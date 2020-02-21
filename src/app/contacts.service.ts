import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AddContactsService {

  constructor( private db:AngularFireDatabase) { }

  create(form){
 return   this.db.list('/contacts').push(form);
  }

  getAll(){
    return this.db.list('/contacts');
  }

  get(contactId){
    return this.db.object('/contacts/' + contactId );
  }
  // get(productId){
 
  //   return this.db.object('/products/' + productId).snapshotChanges().pipe(map(categories=>{
     
  //       const value = categories.payload.val();
  //       const key = categories.payload.key;
  //       return {key, ...value};
  //   }));

  // }

  update(contactId,contact){
    return this.db.object('/contacts/' + contactId).update(contact);
  }

  delete(contactId){
    return this.db.object('/contacts/' + contactId).remove();
  }
}
