import { Component, OnInit, HostBinding, HostListener, AfterViewInit } from '@angular/core';
import { Book, Books, BooksListener } from '../../book';
import { PagecontrolComponent, PagecontrolListener} from '../pagecontrol/pagecontrol.component'

enum ContentType {
  IMAGE,
  VIDEO,
  OBJECT
}
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
  get pageType():ContentType {
    if(this.book) {
      let nowExt = this.book.getNowExtName(this.controller.nowpage).toUpperCase();
      if((nowExt===".JPG") || (nowExt===".JPEG") || (nowExt===".PNG") || (nowExt===".GIF") || (nowExt===".SVG")) {
        return ContentType.IMAGE;
      } else if ((nowExt===".OGV")||(nowExt===".AVI")||(nowExt===".MP4")){
        return ContentType.VIDEO;
      }
    }
    return ContentType.OBJECT;
  }
  get pageIsImg():boolean {
    return (this.pageType === ContentType.IMAGE);
  }
  get pageIsVideo():boolean {
    return (this.pageType === ContentType.VIDEO);
  }
  get pageIsObject():boolean {
    return (this.pageType === ContentType.OBJECT);
  }
  get pageId():string {
    return this.getPageIdsString(this.pageType);
  }
  getPageIdsString(contentType :ContentType):string {
    switch(contentType) {
      case ContentType.IMAGE:
          return "viewingImg";
        break;
      case ContentType.VIDEO:
          return "viewingVideo";
        break;
      default:
        return "viewingObject";
        break;
    }
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
    let objecttag = document.getElementById(this.pageId);
    Array.from(document.getElementsByClassName("viewing")).forEach(function(tag:HTMLElement){
      tag.style["visibility"]="hidden";
    });
    objecttag.style["visibility"]="visible";
    objecttag.style["display"]="block";
    if(objecttag) {
      if(this.pageIsImg || this.pageIsVideo) {
        objecttag["src"] = "";
        objecttag["src"] = this.pageSrc;
      } else {
        objecttag["data"] = "";
        objecttag["data"] = this.pageSrc;
      }
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
      this._books.addBooksListener(this);
      this.controller.books = books;
    }
  }
  get books():Books {
    return this._books;
  }
  onReadObject():void {
    let objecttag = document.getElementById(this.pageId);
    let dataspace = document.getElementById("dataspace");
    if(dataspace && objecttag) {
      dataspace.style.height = this.height;
      let deg:number = this.book.spindeg;
      let rad = deg*Math.PI/180;
      let objectWidth:number = (Math.cos(rad)*dataspace.offsetWidth)+(Math.sin(rad)*dataspace.offsetHeight);
      let objectHeight:number = (Math.cos(rad)*dataspace.offsetHeight)+(Math.sin(rad)*dataspace.offsetWidth);
      if(this.pageIsImg) {
        objectHeight = objecttag["naturalHeight"];
        objectWidth = objecttag["naturalWidth"];
      } else if(this.pageIsVideo) {
        let videotag = <HTMLVideoElement>objecttag;
        videotag.controls = true;
      }
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
        drawWidth = drawHeight / objectAspect;
      } else {
        drawHeight = drawWidth * objectAspect;
      }
      drawWidth = drawWidth * (zoomPercent/100);
      drawHeight = drawHeight * (zoomPercent/100);
      drawLeft = ((spaceWidth - drawWidth )/2)+controlX;
      if(isNaN(drawLeft)) {
        drawLeft = 0;
      }
      drawTop = ((spaceHeight - drawHeight)/2)+controlY;
      if(isNaN(drawTop)) {
        drawTop = 0;
      }
      if(!isNaN(drawWidth)) {
        objecttag["width"] = drawWidth.toString();
      }
      if(!isNaN(drawHeight)) {
        let videotag = document.getElementById(this.getPageIdsString(ContentType.VIDEO));
        videotag["height"]= "0px";
        let imgtag = document.getElementById(this.getPageIdsString(ContentType.IMAGE));
        imgtag["height"]= "0px";
        let objtag = document.getElementById(this.getPageIdsString(ContentType.OBJECT));
        objtag["height"]= "0px";
        objecttag["height"] = drawHeight.toString();
      }
      objecttag.style["left"] = drawLeft.toString() + "px";
      objecttag.style["top"] = drawTop.toString() + "px";
      objecttag.style.transform = "rotate(" + deg.toString() + "deg)";
    }
  }
  ngOnInit() {
    this.tabIndex = "0";
    this.focusing = false;
    this.mouseEntering = false;
  }
}
