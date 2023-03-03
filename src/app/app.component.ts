import { Component, OnInit } from '@angular/core';
import { Book } from './Book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'pfefrontend';
  books!: Book[];
  selectedBook!: String;

  constructor(){
    this.books = [
      {name: 'Book1', author: 'Author1'},
      {name: 'Book2', author: 'Author2'},
      {name: 'Book3', author: 'Author3'},
      {name: 'Book4', author: 'Author4'},
      {name: 'Book5', author: 'Author5'}
  ];
   

  }

  ngOnInit() {
 
  }

}
