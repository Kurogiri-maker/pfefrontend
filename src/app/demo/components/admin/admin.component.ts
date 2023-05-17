import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  enabled: boolean = true;

  role: string = "USER";

  header: any[] = [];

  viewHeader: any[] = [];

  formViewHeader: any[] = [];

  editViewHeader: any[] = [];

  addUserHeader: any[] = [];

  users: any[] = [];

  user: any = {};

  totalRecords !: number;

  roles: string[] = ["ADMIN", "USER"];

  pageSize !: number;

  currentPage!: number;

  searchTerm!: string;

  formData: any = {};

  selectedUsers: any[] = [];

  submitted: boolean = false;

  userDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  deleteUserDialog: boolean = false;

  editUserDialog: boolean = false;



  constructor(private adminServ: AdminService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.getHeader();
    this.pageSize = 10;
    this.currentPage = 0;
    this.getUsers();


  }

  //Get Header
  getHeader() {
    this.adminServ.getHeader().subscribe((metadata: string[]) => {
      this.header = Object.values(metadata).map((key) => {
        return { field: key, header: key.charAt(0).toUpperCase() + key.slice(1) };
      });
      this.header.shift();
      this.formViewHeader = this.header.filter((attr: any) => attr.field !== 'password');
      this.editViewHeader = this.header.filter((attr: any) => attr.field !== 'password' && attr.field !== 'enabled' && attr.field !== 'role');
      this.viewHeader = this.header.filter((attr: any) => attr.field !== 'password' && attr.field !== 'enabled');
      this.addUserHeader = this.header.filter((attr: any) => attr.field !== 'enabled' && attr.field !== 'role');

    })
  }

  //Get Users from database
  getUsers() {
    this.adminServ.getUsers(this.pageSize, this.currentPage).subscribe((data: any) => {
      this.users = data.content;
      this.totalRecords = data.totalElements;
      console.log("View Header: ", this.viewHeader);
      console.log("Users : ", this.users);



    })


  }


  //Open the dialog to create a new user
  openNew() {
    this.user = {};
    this.formData = {};
    this.submitted = false;
    this.userDialog = true;
  }

  // hide the dialog
  hideDialog() {
    this.formData = {};
    this.userDialog = false;
    this.submitted = false;
  }

  //Save a user
  saveUser() {

    this.submitted = true;
    this.addUserHeader.forEach(col => {
      this.formData[col.field] = (<HTMLInputElement>document.getElementById(col.field)).value;

      if (!this.formData[col.field]) {
        this.submitted = false;

        return;
      }
    });
    if (!this.submitted) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Field missing', life: 3000 });
      return;
    } else {
      this.adminServ.saveUser(this.formData).subscribe({
        next: (response) => console.log("Response status :", response),
        error: (error) => console.log("Error :", error),
        complete: () => this.getUsers()
      });
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
    }

    this.formData = {};
    this.submitted = false;
    this.userDialog = false;
  }

  //Open updateUser dialog
  editUser(user: any) {
    this.formData["id"] = user["id"];
    this.formData["enabled"] = user["enabled"];
    this.formData["role"] = user["role"];
    this.editViewHeader.forEach(col => {
      this.formData[col.field] = user[col.field];

    });
    console.log("form", this.formData);

    this.user = {};
    this.editUserDialog = true;
  }

  // hide the dialog
  hideEditDialog() {
    this.formData = {};
    this.editUserDialog = false;
    this.submitted = false;
  }

  //Update a user
  updateUser() {
    this.submitted = true;
    this.editViewHeader.forEach(col => {
      this.formData[col.field] = (<HTMLInputElement>document.getElementById(col.field)).value;


      if (!this.formData[col.field]) {
        this.submitted = false;
        console.log("missing field", col.field);

        return;
      }
    });
    if (!this.submitted) {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Field missing', life: 3000 });
      return;
    } else {
      this.adminServ.updateUser(this.formData).subscribe({
        next: (response) => console.log("Response status :", response),
        error: (error) => console.log("Error :", error),
        complete: () => this.getUsers()
      }

      );
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
    }
    this.formData = {};
    this.submitted = false;
    this.editUserDialog = false;


  }

  //Delete User
  deleteUser(user: any) {
    this.user = user;
    this.deleteUserDialog = true;

  }

  // Confirm the delete and refresh the table
  confirmDelete() {
    this.adminServ.deleteUser(this.user.id).subscribe((response) => {
      this.getUsers();
    });
    this.user = {};
    this.deleteUserDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
  }


  deleteSelectedUsers() {
    this.deleteUsersDialog = true;
  }

  // Confirm the deletion fo selected documetns
  confirmDeleteSelected() {
    this.selectedUsers.forEach(val => {
      this.adminServ.deleteUser(val.id).subscribe((response) => {
        this.getUsers();
      });
    });
    this.selectedUsers = [];
    this.deleteUsersDialog = false;
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });

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
