import { Component, HostBinding, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShareComponent } from './share/share.component';
import { BooktreeComponent } from '../booktree/booktree.component';
import { Context, PageComponent } from '../page/page.component';
import { Book, Books, BooksListener } from '../book';
import { SITENAME } from '../siteinfo';

@Component({
  selector: 'app-framenav',
  templateUrl: './framenav.component.html',
  styleUrls: ['./framenav.component.css']
})
export class FramenavComponent implements AfterViewInit, BooksListener {
  books:Books;
  @ViewChild(PageComponent)
  pageobject:PageComponent;
  @ViewChild(BooktreeComponent)
  booktree: BooktreeComponent;
  @HostBinding('style.height') height:string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, private cdr:ChangeDetectorRef, public dialog:MatDialog) {
    this.books = new Books("assets/CONTENT");
    this.books.addBooksListener(this);
    this.resize();
  }
  ngAfterViewInit() {
    let me = this;
    this.pageobject.books = this.books;
    this.booktree.setBooks(this.books);
    this.resize();
    this.cdr.detectChanges();
  }
  get title():string {
    if((this.books) && (this.books.nowbook) && (this.books.nowbook.title)) {
          return this.books.nowbook.title;
    }
    return SITENAME;
  }
  resize():void {
    this.height = window.innerHeight.toString() + "px";
    let toolbar = document.getElementById("toolbar");
    if(toolbar) {
      this.pageobject.top = (toolbar.offsetHeight).toString() + "px";
      this.pageobject.height = (parseInt(this.height.slice(0,-2))-toolbar.offsetHeight).toString() + "px";
    }
  }
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void {
    this.resize();
  }
  viewAbout():void {
    if(this.pageobject) {
      this.pageobject.viewAbout();
    }
  }
  viewTop():void {
    if(this.pageobject) {
      this.pageobject.viewTop();
    }
  }
  openShare():void {
    const dialogRef=this.dialog.open(ShareComponent, {
      width: '250px',
      data: {url:this.createUrl(),title:this.title,sitename:SITENAME}
    });
  }
  createUrl():string {
    let ret:string = location.origin+location.pathname;
    ret = ret.split("?")[0];
    ret = ret + "?context=" + this.pageobject.viewingSpace();
    if(this.pageobject.viewingSpace() === Context.PAGE) {
      ret = ret + "&content=" + decodeURI(this.books.nowbook.dirname) + "&page="+this.pageobject.viewer.nowpage.toString();
    }
    return ret;
  }
}
