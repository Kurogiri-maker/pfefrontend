import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  header: any[] = [];

  users: any[] = [];

  user: any = {};

  totalRecords !: number;


  pageSize !: number;

  currentPage!: number;

  searchTerm!: string;

  constructor(private adminServ: AdminService) { }


  ngOnInit(): void {
    this.pageSize = 10;
    this.currentPage = 0;
    this.getUsers();
  }


  //Get Users from database
  getUsers() {
    this.adminServ.getUsers(this.pageSize, this.currentPage).subscribe((data: any) => {
      this.users = data.content;
      this.totalRecords = data.totalElements;
      this.getHeader();
    })
  }

  //Get Header from backend
  getHeader() {
    this.adminServ.getHeader().subscribe((metadata: string[]) => {
      this.header = Object.values(metadata).map((key) => {
        return { field: key, header: key.charAt(0).toUpperCase() + key.slice(1) };
      });
      console.log(this.header);
      this.header.shift();
    });
  }

  // Pagination
  paginate(event: any) {
    this.currentPage = event.page;
    this.pageSize = event.rows;
    this.getUsers();
  }

  //Search for specific Users using any keyword
  search(): void {
    this.adminServ.search(this.searchTerm).subscribe({
      next: value => {
        this.users = value;
      },
      error: err => console.error(err),
      complete: () => { }
    });
  }





}
