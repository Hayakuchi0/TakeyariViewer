import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Books } from '../book';

export interface BookselfListener {
  onBookselfClicked():void;
}
@Component({
  selector: 'app-bookself',
  templateUrl: './bookself.component.html',
  styleUrls: ['./bookself.component.css']
})
export class BookselfComponent implements OnInit {
  @Input('title') title:string;
  @Input('dirname') dirname:string;
  @Input('books') books:Books;
  listeners:BookselfListener[];
  constructor() {
  }
  ngOnInit() {
    this.listeners=[];
  }
  @HostListener('click',['$event'])
  onClick(event:any) {
    if(this.dirname) {
      this.listeners.forEach(function(listener:BookselfListener) {
        listener.onBookselfClicked();
      });
      this.books.setNowBook(this.dirname);
    }

  }
}
