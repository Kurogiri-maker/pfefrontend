import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{

  token!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.verifyEmail();
  }

  verifyEmail() {
    this.apiService.verifyEmail(this.token)
      .subscribe(response => {
        // Redirect to the home page or any other page
        window.location.href = response.headers.get('Location');
        console.log(response.headers.get('Location'));
      },
      error => {
        console.log(error);
      });
  }

}
