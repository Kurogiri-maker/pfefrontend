import { Component, OnInit } from '@angular/core';
import { AppLayoutService } from '../../service/app.layout.service';
import { JwtClientService } from 'src/app/demo/components/auth/login/service/jwt-client.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.css']
})
export class AppMenuComponent implements OnInit {


  model: any[] = [];


  constructor(public layoutService: AppLayoutService, private authService: JwtClientService) { }

  ngOnInit() {
    if (this.authService.isAdmin()) {
      this.model.push({
        label: 'Admin',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['dashboard'] },
          { label: 'User management', icon: 'pi pi-fw pi-users', routerLink: ['admin'] }
        ]
      })
    }

    this.model.push(
      {
        label: 'Files manager',
        items: [
          { label: 'Files', icon: 'pi pi-fw pi-folder', routerLink: ['crud'] },
          { label: 'CSV Upload', icon: 'pi pi-fw pi-file-excel', routerLink: ['upload'] },
          { label: 'PDF Upload', icon: 'pi pi-fw pi-file-pdf', routerLink: ['pdf'] }        ]
      }

    );
    console.log(this.model);


  }

}
