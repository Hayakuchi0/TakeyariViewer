import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Book, Books } from './book'
import { PageComponent } from './page/page.component'
import { BookselfComponent } from './bookself/bookself.component'
import { SidenaviComponent } from './sidenavi/sidenavi.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  books:Books;
  title:string;
  @ViewChild(PageComponent)
  pageobject:PageComponent;
  @ViewChild(SidenaviComponent)
  sidenavi:SidenaviComponent;
  constructor(private cdr:ChangeDetectorRef) {
    this.title = "ImageViewer";
    this.books = new Books("assets/books");
  }
  ngAfterViewInit(){
    this.pageobject.books = this.books;
    this.pageobject.nowpage = 1;
    this.sidenavi.books = this.books;
    this.cdr.detectChanges();
  }
}
