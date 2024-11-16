import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EditOrderComponent } from '../edit-order/edit-order.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    '_id',
    'createdAt',
    'check_in_date',
    'check_out_date',
    'booking_status',
    'total_amount',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe((res) => {
      this.dataSource.data = res;
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

  openEditDialog(order: any, event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditOrderComponent, {
      width: '50%',
      height: '70%',
      data: this.dataSource.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Cập nhật dữ liệu sau khi sửa
        const index = this.dataSource.data.findIndex((u) => u.id === result.id);
        if (index !== -1) {
          this.dataSource.data[index] = result;
          this.dataSource._updateChangeSubscription(); // Cập nhật bảng
        }
      }
    });
  }

  openDetailDialog(row: any): void {
    this.dialog.open(OrderDetailComponent, {
      width: '30%',
      data: row,
    });
  }
}
