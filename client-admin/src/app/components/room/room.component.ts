import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { RoomService } from '../../services/room.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    '_id',
    'room_name',
    'room_price',
    'room_status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.dataSource.data = rooms.data;
      console.log(this.dataSource.data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(room: any): void {
    const dialogRef = this.dialog.open(EditRoomComponent, {
      width: '50%',
      height: '50%',
      data: room,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Cập nhật dữ liệu sau khi sửa
        const index = this.dataSource.data.findIndex(
          (u) => u._id === result._id
        );
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription(); // Cập nhật bảng
        }
      }
    });
  }
  
  deleteRoom(roomId: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roomService.deleteRoom(roomId).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(
              (room) => room._id !== roomId
            );
          },
          (error) => {
            console.error('Error deleting room:', error);
          }
        );
      }
    });
  }
}
