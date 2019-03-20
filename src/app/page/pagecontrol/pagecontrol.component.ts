import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostBinding } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book, Books, BooksListener } from '../../book';

export interface PagecontrolListener {
  onSetX(beforeX:number,afterX:number):void;
  onSetY(beforeY:number,afterY:number):void;
  onSetZoom(beforePercent:number,afterPercent:number):void
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
  private yInput: HTMLElement;
  private zoomInput: HTMLElement;
  private _nowpage:number;
  private _message:string[];
  listeners:PagecontrolListener[];
  @HostBinding('style.height') _height: string;
  get height():string {
    return this._height;
  }
  set height(height:string) {
    this._height = height;
  }
  constructor(private breakpointObserver:BreakpointObserver,private cdr:ChangeDetectorRef) { }
  ngOnInit() {
    this.listeners = [];
    this._message=[];
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
    if(isNaN(nowpage)) {
      nowpage = 1;
    }
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
      this.books.addBooksListener(this);
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
  get message():string[] {
    if(this._message) {
      return this._message;
    }
      return [];
  }
  setMessage(message:string) {
    if(message) {
      let store:string[] = message.split("\n");
      this._message = store;
    } else {
      this._message = [];
    }
  }
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void {
    this.nowpage = 1;
  }
  get contentX():number {
    if(this.xInput && (!isNaN(this.xInput["value"]))) {
      return parseInt(this.xInput["value"]);
    }
    return 0;
  }
  set contentX(x:number) {
    if(this.xInput) {
      let beforeX = 0;
      if(!isNaN(this.xInput["value"])) {
        beforeX = parseInt(this.xInput["value"]);
      }
      if(isNaN(x)) {
        this.xInput["value"]="";
      } else {
        this.xInput["value"]=x;
        if(this.listeners) {
          this.listeners.forEach(function(listener:PagecontrolListener) {
            listener.onSetX(beforeX,x);
          });
        }
      }
    }
  }
  onXEdited():void {
    if(!(this.xInput && (this.xInput["value"]==="-" || this.xInput["value"]===""))) {
      this.contentX=this.contentX;
    }
  }
  get contentY():number {
    if(this.yInput && (!isNaN(this.yInput["value"]))) {
      return parseInt(this.yInput["value"]);
    }
    return 0;
  }
  set contentY(y:number) {
    if(this.yInput) {
      let beforeY = 0;
      if(!isNaN(this.yInput["value"])) {
        beforeY = parseInt(this.yInput["value"]);
      }
      if(isNaN(y)) {
        this.yInput["value"]="";
      } else {
        this.yInput["value"]=y;
        if(this.listeners) {
          this.listeners.forEach(function(listener:PagecontrolListener) {
            listener.onSetY(beforeY,y);
          });
        }
      }
    }
  }
  onYEdited():void {
    if(!(this.yInput && (this.yInput["value"]==="-" || this.yInput["value"]===""))) {
      this.contentY=this.contentY;
    }
  }
  get zoomPercent():number {
    if(this.zoomInput && (!isNaN(this.zoomInput["value"]))) {
      return parseInt(this.zoomInput["value"]);
    }
    return 100;
  }
  set zoomPercent(percent:number) {
    if(this.zoomInput) {
      let beforeZoom = 0;
      if(!isNaN(this.zoomInput["value"])) {
        beforeZoom = parseInt(this.zoomInput["value"]);
      }
      if(isNaN(percent)) {
        this.zoomInput["value"]="";
      } else {
        this.zoomInput["value"]=percent;
        if(this.listeners) {
          this.listeners.forEach(function(listener:PagecontrolListener) {
            listener.onSetZoom(beforeZoom,percent);
          });
        }
      }
    }
  }
  onZoomEdited():void {
    this.zoomPercent = this.zoomPercent;
  }
  ngAfterViewInit() {
    this.zoomInput = document.getElementById("zoomPercent");
    this.pageInput = document.getElementById("pageNumber");
    this.xInput = document.getElementById("pageX");
    this.yInput = document.getElementById("pageY");
    let me = this;
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((state:BreakpointState)=> {
      if(state.matches) {
        let pcOnlyAreas = document.getElementsByClassName("only-pc");
        Array.prototype.forEach.call(pcOnlyAreas,divtag=>(divtag.style["display"] = "none"));
        let controlPanel = document.getElementById("control-panel");
        controlPanel.style["height"]="100%";
      }
    });
  }
}
