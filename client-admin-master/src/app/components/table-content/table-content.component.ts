import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.css'],
})
export class TableContentComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    '_id',
    'fullname',
    'username',
    'email',
    'phone_number',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  searchControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  // Thêm MatDialog vào constructor
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.searchControl.valueChanges.subscribe((value) => {
      this.applyFilter(value);
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((res) => {
      this.dataSource.data = res.data.users;
    });
  }

  deleteUser(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(
              (user) => user._id !== userId
            );
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '50%',
      height: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.addUser(result).subscribe(
          (res) => {
            this.getUsers();
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '50%',
      height: '70%',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.editUser(result).subscribe(
          (res) => {
            console.log('User updated:', res);
            this.getUsers();
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      }
    });
  }
}
