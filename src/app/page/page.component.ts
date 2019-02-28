import { Component, OnInit, HostBinding, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { Book, Books, BooksListener } from '../book';
import { PagecontrolComponent, PagecontrolListener} from './pagecontrol/pagecontrol.component'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, BooksListener, PagecontrolListener {
  private _books: Books;
  @ViewChild(PagecontrolComponent)
  controller:PagecontrolComponent;
  @HostBinding('style.height') height: string;
  @HostBinding('tabIndex') tabIndex:string;
  @HostBinding('style.top') top:string;
  private _nowpage:number;
  constructor() {
    this.height = (window.innerHeight).toString() + "px";
    this.tabIndex = "0";
  }
  ngAfterViewInit() {
    if(this.controller) {
      this.controller.listeners.push(this);
    }
  }
  get book():Book {
    if(this.books) {
      return this.books.nowbook;
    } else {
      return undefined;
    }
  }
  set nowpage(page:number) {
    if(this.controller) {
      this.controller.nowpage = page;
    }
  }
  get nowpage():number {
    if(this.controller) {
      return this.controller.nowpage;
    } else {
      return 0;
    }
  }
  get pageSrc():string {
    if(this.book && this.controller) {
      return this.book.getSrcName(this.controller.nowpage);
    }
    return "";
  }
  onSetX(beforeX:number, beforeY:number):void {
    //まだ
  }
  onSetY(beforeX:number, beforeY:number):void {
    //まだ
  }
  onSetPage(beforePage:number, afterPage:number):void {
    let objecttag = document.getElementById("viewing");
    if(objecttag) {
      objecttag["data"] = this.pageSrc;
    }
    let objectLinkTag = document.getElementById("viewing-link");
    if(objectLinkTag) {
      objectLinkTag["href"] = this.pageSrc;
    }
  }
  get title():string {
    if(this.book) {
      return this.book.title;
    } else {
      return "本が選ばれていません";
    }
  }
  @HostListener('keyup',['$event'])
  onKeyUp(event: any) {
    switch(event.key) {
      case "ArrowRight":
        if(this.controller) {
          this.controller.goNextPage();
        }
        break;
      case "ArrowLeft":
        if(this.controller) {
          this.controller.goBeforePage();
        }
        break;
      default:
        break;
    }
  }
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void {
    this.nowpage = 1;
  }
  set books(books:Books) {
    if(books) {
      this._books = books;
      if(books.listeners) {
        let notAdded:boolean = true;
        let me = this;
        books.listeners.forEach(function(listener) {
          notAdded = (notAdded && (listener==me));
        });
        if(notAdded) {
          books.listeners.push(this);
        }
      }
      this.controller.books = books;
    }
  }
  get books():Books {
    return this._books;
  }
  onReadObject():void {
    let objecttag = document.getElementById("viewing");
    let dataspace = document.getElementById("dataspace");
    if(dataspace && objecttag) {
      let deg:number = this.book.spindeg;
      objecttag.style.width = "";
      objecttag.style.height = "";
      let objectWidth:number = objecttag.offsetWidth;
      let objectHeight:number = objecttag.offsetHeight;
      let spaceWidth:number = dataspace.offsetWidth;
      let spaceHeight:number = dataspace.offsetHeight;
      let objectAspect:number = objectHeight / objectWidth;
      let spaceAspect:number = spaceHeight / spaceWidth;
      let drawWidth:number = spaceWidth;
      let drawHeight:number = spaceHeight;
      let drawRight:number = 0;
      let drawTop:number = 0;
      if(objectAspect > spaceAspect ) {
        drawWidth = objectWidth * spaceHeight / objectHeight;
      } else {
        drawHeight = objectHeight * spaceWidth / objectWidth;
      }
      drawRight = (spaceWidth - drawWidth )/2;
      drawTop = (spaceHeight - drawHeight)/2;
      objecttag.style.width = drawWidth + "px";
      objecttag.style.height = drawHeight + "px";
      objecttag.style.right = drawRight + "px";
      objecttag.style.top = drawTop + "px";
      objecttag.style.transform = "rotate(" + deg.toString() + "deg)";
    }
  }
  ngOnInit() {
  }
}
