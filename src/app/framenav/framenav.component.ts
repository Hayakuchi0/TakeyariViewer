import { Component, HostBinding, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BookselfComponent, BookselfListener } from '../bookself/bookself.component'
import { PageComponent } from '../page/page.component'
import { Book, Books } from '../book'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-framenav',
  templateUrl: './framenav.component.html',
  styleUrls: ['./framenav.component.css']
})
export class FramenavComponent implements AfterViewInit, BookselfListener {
  books:Books;
  @ViewChild(PageComponent)
  pageobject:PageComponent;
  @ViewChildren(BookselfComponent)
  bookself : QueryList<BookselfComponent>;
  @HostBinding('style.height') height:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private cdr:ChangeDetectorRef) {
    this.books = new Books("assets/books");
    this.resize();
  }
  ngAfterViewInit() {
    let me = this;
    this.bookself.forEach(function(oneStep:BookselfComponent, index:number, array:BookselfComponent[]){
      oneStep.books = me.books;
      oneStep.title = me.books.books[index].title;
      oneStep.dirname = me.books.books[index].dirname;
      oneStep.listeners.push(me);
    });
    this.resize();
    this.pageobject.books = this.books;
    this.cdr.detectChanges();
  }
  get title():string {
    if(this.books) {
      if(this.books.nowbook) {
        if(this.books.nowbook.title) {
          return this.books.nowbook.title;
        }
      }
    }
    return "ImageViewer";
  }
  resize():void {
    this.height = window.innerHeight.toString() + "px";
    let toolbar = document.getElementById("toolbar");
    if(toolbar) {
      this.pageobject.top = (toolbar.offsetHeight).toString() + "px";
      this.pageobject.height = (parseInt(this.height.slice(0,-2))-toolbar.offsetHeight).toString() + "px";
    }
  }
  onBookselfClicked():void {
    this.resize();
  }
}
