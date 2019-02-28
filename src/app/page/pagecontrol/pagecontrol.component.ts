import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Book, Books, BooksListener } from '../../book';

export interface PagecontrolListener {
  onSetX(beforeX:number,afterX:number):void;
  onSetY(beforeY:number,afterY:number):void;
  onSetPage(beforePage:number,afterPage:number):void;
}
@Component({
  selector: 'app-pagecontrol',
  templateUrl: './pagecontrol.component.html',
  styleUrls: ['./pagecontrol.component.css']
})
export class PagecontrolComponent implements OnInit, AfterViewInit, BooksListener {
  private _books:Books;
  private pageInput: HTMLElement;
  private xInput: HTMLElement;
  private yInput:HTMLElement;
  private _nowpage:number;
  listeners:PagecontrolListener[];
  constructor(private cdr:ChangeDetectorRef) { }
  ngOnInit() {
    this.listeners = [];
  }
  get nowpage():number {
    if((this.pageInput) && (this.pageInput["value"]) && (!isNaN(this.pageInput["value"]))) {
      return parseInt(this.pageInput["value"]);
    }
    return 0;
  }
  set nowpage(page:number) {
    let beforePage:number = this.nowpage;
    let nowpage:number = page;
    if(this.book) {
      if(page < 1) {
        nowpage = 1;
      } else if (this.book.extname.length<=page) {
        nowpage = this.book.extname.length;
      }
    } else {
      nowpage = 0;
    }
    if(this.pageInput) {
      this.pageInput["value"] = nowpage;
      if(this.listeners) {
        this.listeners.forEach(function(listener:PagecontrolListener) {
          listener.onSetPage(beforePage,nowpage);
        });
      }
    }
  }
  goBeforePage():void {
    this.nowpage--;
  }
  goNextPage():void {
    this.nowpage++;
  }
  jump():void {
    if((this.pageInput) && (this.pageInput["value"])) {
      this.nowpage = this.pageInput["value"];
    }
  }
  set books(books:Books) {
    if(books) {
      this._books = books;
      this.books.listeners.push(this);
    }
  }
  get books():Books {
    return this._books;
  }
  get book():Book {
    if(this.books) {
      return this.books.nowbook;
    } else {
      return undefined;
    }
  }
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void {
    this.nowpage = 1;
  }
  ngAfterViewInit() {
    this.pageInput = document.getElementById("pagenumber");
    this.xInput = document.getElementById("pageX");
    this.yInput = document.getElementById("pageY");
  }
}
