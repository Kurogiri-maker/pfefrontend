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
          { label: 'Gestion des utilisateurs', icon: 'pi pi-fw pi-user', routerLink: ['admin'] }
        ]
      })
    }

    this.model.push(
      {
        label: 'Files manager',
        items: [
          { label: 'Upload', icon: 'pi pi-fw pi-file-excel', routerLink: ['upload'] },
          { label: 'Files', icon: 'pi pi-fw pi-home', routerLink: ['crud'] },
          { label: 'Upload a pdf', icon: 'pi pi-fw pi-file-pdf', routerLink: ['pdf'] },
          { label: 'sign out', icon: 'pi pi-fw pi-sign-out', routerLink: ['auth/signout'] }
        ]
      }

    );
    console.log(this.model);


  }

}
