import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  data = {
    username: '',
    email: '',
    password: '',
    fullname: '',
  };

  constructor(public dialogRef: MatDialogRef<AddUserComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
