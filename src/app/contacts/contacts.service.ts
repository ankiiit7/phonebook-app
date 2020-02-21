import{ contacts} from './contacts.model'


export class ContactsService{
    
    private contacts:contacts[] = [
         new contacts('Ankit','Singh','ankit@gmail.com','8700404083'),
    new contacts('Anmol','Mangla','anmol@gmail.com','9700404083'),
    new contacts('Surya','Pratap','surya@gmail.com','8700423453'),
    new contacts('Kumar','Shanu','anmol@gmail.com','9700404083'),
    new contacts('Aditi','Sharma','aditi@gmail.com','9700345083'),
    new contacts('Sheena','Malhotra','sheena@gmail.com','9134564083')
];
    
    getContacts()
        {
            return this.contacts.slice();
        }
}