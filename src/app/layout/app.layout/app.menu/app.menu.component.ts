import { Component, OnInit } from '@angular/core';
import { AppLayoutService } from '../../service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.css']
})
export class AppMenuComponent implements OnInit {


  model: any[] = [];


  constructor(public layoutService: AppLayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Files manager',
        items: [
          { label: 'Upload', icon: 'pi pi-fw pi-file-excel', routerLink: ['upload'] },
          { label: 'Files', icon: 'pi pi-fw pi-home', routerLink: ['crud'] },
          { label: 'sign out', icon: 'pi pi-fw pi-sign-out', routerLink: ['auth/signout'] }
        ]
      }

    ];

  }

}
