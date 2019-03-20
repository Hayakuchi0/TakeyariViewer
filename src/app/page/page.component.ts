import { Component, OnInit, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Book, Books, BooksListener } from '../book';
import { PagecontrolComponent, PagecontrolListener} from './pagecontrol/pagecontrol.component'
import { PageviewComponent } from './pageview/pageview.component'

export enum Context {
  ABOUT="about",
  TOP="top",
  PAGE="content"
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewInit, BooksListener {
  private _books: Books;
  private nowContext: Context=Context.ABOUT;
  @ViewChild(PagecontrolComponent)
  controller:PagecontrolComponent;
  @ViewChild(PageviewComponent)
  viewer:PageviewComponent;
  @HostBinding('style.height') _height:string;
  @HostBinding('style.top') top:string;
  constructor() {
  }
  ngOnInit() {
  }
  get height():string {
    return this._height;
  }
  set height(height:string) {
    if(height.slice(-2) === "px") {
      this._height = height;
      this.resize();
    }
  }
  viewTop():void {
    this.viewSpace(Context.TOP);
  }
  viewAbout():void {
    this.viewSpace(Context.ABOUT);
  }
  viewSpace(target:Context):void {
    let pageSpace = document.getElementById("pagespace");
    let aboutSpace = document.getElementById("aboutspace");
    let topSpace = document.getElementById("topspace");
    pageSpace.style["visibility"] = "hidden";
    topSpace.style["visibility"] = "hidden";
    aboutSpace.style["visibility"] = "hidden";
    if(target == Context.ABOUT) {
      aboutSpace.style["visibility"] = "visible";
    } else if(target == Context.TOP) {
      topSpace.style["visibility"] ="visible";
    } else {
      pageSpace.style["visibility"] = "visible";
      this.viewer.nowpage=1;
    }
    this.nowContext = target;
  }
  viewingSpace():Context {
    return this.nowContext;
  }
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void {
    if(afterbook) {
      this.viewSpace(Context.PAGE);
    }
  }
  get books():Books {
    return this._books;
  }
  set books(books:Books) {
    this._books = books;
    if(this._books) {
      this._books.addBooksListener(this);
    }
    if(this.controller) {
      this.controller.books = this._books;
    }
    if(this.viewer) {
      this.viewer.books = this._books;
      this.viewer.controller = this.controller;
      this.viewer.tabIndex = "0";
    }
    if(this._books) {
      if(document.location.search.length>0) {
        let query = document.location.search.substring(1);
        let valueAndNames:string[] = query.split("&");
        let parameters:{} = {};
        valueAndNames.forEach(function(valueAndName:string){
          let parameter:{name:string,value:string}={name:"",value:""};
          let decodedParam:string = decodeURI(valueAndName);
          let keySearch:number = decodedParam.search("=");
          if(keySearch>0) {
            parameter.name = decodedParam.slice(0,keySearch);
            parameter.value = decodedParam.slice(keySearch+1);
          }
          parameters[parameter.name] = parameter.value;
        });
        if(parameters["context"]) {
          if(parameters["context"]===Context.TOP) {
            this.viewTop();
          } else if(parameters["context"]===Context.ABOUT) {
            this.viewAbout();
          } else if((parameters["context"]===Context.PAGE) && (parameters["content"]) && (this.books.cansetBook(parameters["content"]))){
            this.books.setNowBook(parameters["content"]);
            if(parameters["page"]) {
              this.viewer.nowpage = parseInt(parameters["page"]);
            } else {
              this.viewer.nowpage=1;
            }
          }
        }
      }
    }
  }
  resize() {
    let controlSpace = document.getElementById("controlspace");
    let dataSpace = document.getElementById("dataspace");
    if(controlSpace && dataSpace) {
      let viewerHeight:number = 0;
      let controllerHeight:number = 0;
      if(this.height) {
        viewerHeight = parseInt(this.height.slice(0,-2));
        controllerHeight = parseInt(this.height.slice(0,-2));
      }
      let pageWidth = controlSpace.offsetWidth + dataSpace.offsetWidth;
      let pageHeight = controlSpace.offsetHeight + dataSpace.offsetHeight;
      if(controlSpace.offsetWidth == dataSpace.offsetWidth) {
        pageWidth = pageWidth/2;
      } else {
        pageHeight = pageHeight/2;
      }
      if(pageWidth>pageHeight) {
        controlSpace.style["top"] = "0";
        controlSpace.style["left"] = "0";
        controlSpace.style["width"] = "20%";
        controlSpace.style["height"] = "100%";
        dataSpace.style["top"] = "0";
        dataSpace.style["left"] = "20%";
        dataSpace.style["width"] = "80%";
        dataSpace.style["height"] = "100%";
      } else {
        controlSpace.style["top"] = "70%";
        controlSpace.style["left"] = "0";
        controlSpace.style["width"] = "100%";
        controlSpace.style["height"] = "30%";
        dataSpace.style["top"] = "0";
        dataSpace.style["left"] = "0";
        dataSpace.style["width"] = "100%";
        dataSpace.style["height"] = "70%";
        viewerHeight = pageHeight * 0.7;
        controllerHeight = pageHeight * 0.3;
      }
      if(this.viewer && this.controller) {
        this.viewer.height = viewerHeight + "px";
        this.controller.height = controllerHeight + "px";
      }
    }
  }
  ngAfterViewInit() {
    this.books = this.books;
  }
}
