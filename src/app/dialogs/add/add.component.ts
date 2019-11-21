import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Contact} from '../../models/contact';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})

export class AddComponent {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Contact,
              public fireService: FirebaseService) {

               }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :'';
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dialogRef.close(this.data);
  }
}
