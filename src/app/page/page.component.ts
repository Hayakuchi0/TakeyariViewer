import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Book, Books, BooksListener } from '../book';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit,BooksListener {
  private _books: Books;
  @HostBinding('style.height') height: string;
  @HostBinding('tabIndex') tabIndex:string;
  private _nowpage:number;
  constructor() {
    this.nowpage = 1;
    this.height = (window.innerHeight).toString() + "px";
    this.tabIndex = "0";
  }
  get book():Book {
    if(this.books) {
      return this.books.nowbook;
    } else {
      return undefined;
    }
  }
  get nowpage():number {
    return this. _nowpage;
  }
  set nowpage(page:number) {
    if(this.book) {
      if(page < 1) {
        this._nowpage = 1;
     } else if (this.book.extname.length<=page) {
        this._nowpage = this.book.extname.length;
      } else {
        this._nowpage = page;
      }
      let objecttag = document.getElementById("viewing");
      if(objecttag) {
        objecttag["data"] = this.pageSrc;
      }
    } else {
      this._nowpage = 0;
    }
    let inputtag = document.getElementById("pagenumber");
    if(inputtag) {
      inputtag["value"] = this._nowpage;
    }
  }
  get pageSrc():string {
    return this.book.getSrcName(this.nowpage);
  }
  goBeforePage():void {
    this.nowpage--;
  }
  goNextPage():void {
    this.nowpage++;
  }
  jump():void {
    let inputtag = document.getElementById("pagenumber");
    if(inputtag["value"]) {
      this.nowpage = inputtag["value"];
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
        this.goNextPage();
        break;
      case "ArrowLeft":
        this.goBeforePage();
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
      this.books.listeners.push(this);
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
