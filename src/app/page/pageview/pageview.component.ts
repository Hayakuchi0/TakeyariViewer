import { Component, OnInit, HostBinding, HostListener, AfterViewInit } from '@angular/core';
import { Book, Books, BooksListener } from '../../book';
import { PagecontrolComponent, PagecontrolListener} from '../pagecontrol/pagecontrol.component'

@Component({
  selector: 'app-pageview',
  templateUrl: './pageview.component.html',
  styleUrls: ['./pageview.component.css']
})

export class PageviewComponent implements OnInit, BooksListener, PagecontrolListener {
  private _books: Books;
  private _controller:PagecontrolComponent;
  private focusing:boolean;
  private mouseEntering:boolean;
  @HostBinding('tabIndex') tabIndex:string;
  @HostBinding('style.height') height:string;
  constructor() {}
  get controller():PagecontrolComponent {
    return this._controller;
  }
  set controller(controller:PagecontrolComponent) {
    if(controller) {
      this._controller=controller
      this._controller.listeners.push(this);
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
    this.onReadObject();
  }
  onSetY(beforeX:number, beforeY:number):void {
    this.onReadObject();
  }
  onSetZoom(beforePercent:number, afterPercent:number):void {
    this.onReadObject();
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
  showKeyboardShortCut() {
    if(this.controller) {
      if(this.focusing) {
        this.controller.setMessage("キーボード・ショートカット\na:前のページ\nd:次のページ\nw:10%拡大\ns:10%縮小\nx:元のサイズ\n↑↓←→:画像の移動(画面サイズの5%)");
      } else {
        this.controller.setMessage("");
      }
    }
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseEntering = true;
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseEntering = false;
  }
  @HostListener('focus',['$event'])
  onFocus(event:any) {
    this.focusing = true;
    this.showKeyboardShortCut();
  }
  @HostListener('blur',['$event'])
  onBlur(event:any) {
    this.focusing = false;
    this.showKeyboardShortCut();
  }
  @HostListener('keyup',['$event'])
  onKeyUp(event: any) {
    if(this.controller) {
      switch(event.key) {
        case "d":
          this.controller.goNextPage();
          break;
        case "a":
          this.controller.goBeforePage();
          break;
        case "w":
          this.controller.zoomPercent+=10;
          break;
        case 's':
          this.controller.zoomPercent-=10;
          break;
        case 'x':
          this.controller.zoomPercent=100;
          break;
        case 'ArrowRight':
          this.controller.contentX+=(window.innerWidth/20);
          break;
        case 'ArrowLeft':
          this.controller.contentX-=(window.innerWidth/20);
          break;
        case 'ArrowUp':
          this.controller.contentY-=(window.innerHeight/20);
          break;
        case 'ArrowDown':
          this.controller.contentY+=(window.innerHeight/20);
          break;
        default:
          break;
      }
    }
  }
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void {
    this.controller.contentX=0;
    this.controller.contentY=0;
    this.controller.zoomPercent=100;
    this.nowpage = 1;
  }
  set books(books:Books) {
    if(books) {
      this._books = books;
      if(books.listeners) {
        let notAdded:boolean = true;
        let me = this;
        books.listeners.forEach(function(listener) {
          notAdded = (notAdded && (!(listener==me)));
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
      dataspace.style.height = this.height;
      let deg:number = this.book.spindeg;
      let rad = deg*Math.PI/180;
      objecttag.style.width = "";
      objecttag.style.height = "";
      let objectWidth:number = objecttag.offsetWidth;
      let objectHeight:number = objecttag.offsetHeight;
      let spaceWidth:number = dataspace.offsetWidth;
      let spaceHeight:number = dataspace.offsetHeight;
      let drawWidth:number = (Math.cos(rad)*spaceWidth)+(Math.sin(rad)*spaceHeight);
      let drawHeight:number = (Math.cos(rad)*spaceHeight)+(Math.sin(rad)*spaceWidth);
      let objectAspect:number = objectHeight / objectWidth;
      let spaceAspect:number = drawHeight / drawWidth;
      let drawLeft:number = 0;
      let drawTop:number = 0;
      let controlX = 0;
      let controlY = 0;
      let zoomPercent = 100.0;
      if(this.controller) {
        controlX = this.controller.contentX;
        controlY = this.controller.contentY;
        zoomPercent = this.controller.zoomPercent;
      }
      if(objectAspect > spaceAspect ) {
        drawWidth = objectWidth * drawHeight / objectHeight;
      } else {
        drawHeight = objectHeight * drawWidth / objectWidth;
      }
      drawWidth = drawWidth * (zoomPercent/100);
      drawHeight = drawHeight * (zoomPercent/100);
      drawLeft = ((spaceWidth - drawWidth )/2)+controlX;
      drawTop = ((spaceHeight - drawHeight)/2)+controlY;
      objecttag.style.width = drawWidth + "px";
      objecttag.style.height = drawHeight + "px";
      objecttag.style.left = drawLeft + "px";
      objecttag.style.top = drawTop + "px";
      objecttag.style.transform = "rotate(" + deg.toString() + "deg)";
    }
  }
  ngOnInit() {
    this.tabIndex = "0";
    this.focusing = false;
    this.mouseEntering = false;
  }
}
