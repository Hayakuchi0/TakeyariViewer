import { Component, OnInit, HostListener } from '@angular/core';
import { Books } from '../book';

@Component({
  selector: 'app-bookself',
  templateUrl: './bookself.component.html',
  styleUrls: ['./bookself.component.css']
})
export class BookselfComponent implements OnInit {
  title:string;
  dirname:string;
  books:Books
  constructor() {
  }
  ngOnInit() {
  }
  @HostListener('click',['$event'])
  onClick(event:any) {
    if(this.dirname) {
      this.books.setNowBook(this.dirname);
    }
  }
}
