import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  data = {
    _id: '',
    room_name: '',
    room_price: '',
    room_status: '',
    actions: '',
  };

  constructor(public dialogRef: MatDialogRef<AddRoomComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.data);
  }
}
