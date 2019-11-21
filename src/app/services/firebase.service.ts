import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  contactCollectionRef: AngularFirestoreCollection<Contact>;
  contact$ :Observable<Contact[]>;
  constructor(private fs:AngularFirestore){
    this.contactCollectionRef = this.fs.collection<Contact>('Contacts');
    this.contact$ = this.contactCollectionRef.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Contact;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    }));
  }
  getContacts(){
    return this.contact$;
  }

  addContact(contactObj) {
    if (contactObj) {
      this.contactCollectionRef.add(contactObj);
    }
  }

  updateContact(contact: Contact) {
    this.contactCollectionRef.doc(contact.id).update(contact);
  }

  deleteContact(contact: Contact) {
    this.contactCollectionRef.doc(contact.id).delete();
  }
}
