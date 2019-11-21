import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from './models/contact';
import { FirebaseService } from './services/firebase.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './dialogs/add/add.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'country', 'actions'];
  dataSource = new ContactDataSource(this.fireService);
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public fireService: FirebaseService
  ) {

  }


  ngOnInit() {

  }

  addContact(contact: Contact) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.phone) {

        this.fireService.addContact(result);
      }
    });
  }

  editContact(index, data) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.phone) {

        this.fireService.updateContact(result);
      }
    });
  }

  deleteContact(index, data) {
    this.fireService.deleteContact(data);
  }
}


export class ContactDataSource extends DataSource<any> {

  constructor(public fireService: FirebaseService) {
    super()
  }

  connect() {
    return this.fireService.getContacts();
  }

  disconnect() {

  }
}
