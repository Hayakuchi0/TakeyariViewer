import { Component, ViewChildren, QueryList, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BookselfComponent } from '../bookself/bookself.component'
import { Book, Books } from '../book'

@Component({
  selector: 'app-sidenavi',
  templateUrl: './sidenavi.component.html',
  styleUrls: ['./sidenavi.component.css']
})
export class SidenaviComponent implements AfterViewChecked {
  books:Books;
  @ViewChildren(BookselfComponent)
  bookself : QueryList<BookselfComponent>;
  constructor(private cdr:ChangeDetectorRef) { }
  ngAfterViewChecked() {
    let me = this;
    if(this.books) {
      this.bookself.forEach(function(oneStep:BookselfComponent, index:number, array:BookselfComponent[]){
        oneStep.books = me.books;
        oneStep.title = me.books.books[index].title;
        oneStep.dirname = me.books.books[index].dirname;
      })
    }
    this.cdr.detectChanges();
  }
}
