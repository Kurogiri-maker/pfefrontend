import { Component, ElementRef } from '@angular/core';
import { AppLayoutService } from '../../service/app.layout.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.css']
})
export class AppSidebarComponent {
  constructor(public layoutService: AppLayoutService, public el: ElementRef) { }

}
