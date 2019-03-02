import { Component, OnInit, HostBinding, ViewChild, AfterViewInit } from '@angular/core';
import { Books } from '../book';
import { PagecontrolComponent, PagecontrolListener} from './pagecontrol/pagecontrol.component'
import { PageviewComponent } from './pageview/pageview.component'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit, AfterViewInit {
  private _books: Books;
  @ViewChild(PagecontrolComponent)
  controller:PagecontrolComponent;
  @ViewChild(PageviewComponent)
  viewer:PageviewComponent;
  @HostBinding('style.height') _height:string;
  @HostBinding('style.top') top:string;
  get height():string {
    return this._height;
  }
  set height(height:string) {
    this._height = height;
    if(this.viewer && this.controller) {
      let controlSpace = document.getElementById("controlspace");
      let dataSpace = document.getElementById("dataspace");
      if(controlSpace && dataSpace) {
        let pageWidth = controlSpace.offsetWidth + dataSpace.offsetWidth;
        let pageHeight = controlSpace.offsetHeight + dataSpace.offsetHeight;
        if(controlSpace.offsetWidth == dataSpace.offsetWidth) {
          pageWidth = pageWidth/2;
        } else {
          pageHeight = pageHeight/2;
        }
        if(pageWidth>pageHeight) {
          controlSpace.style["top"] = "0%";
          controlSpace.style["left"] = "0%";
          controlSpace.style["width"] = "20%";
          controlSpace.style["height"] = "100%";
          dataSpace.style["top"] = "0%";
          dataSpace.style["left"] = "20%";
          dataSpace.style["width"] = "80%";
          dataSpace.style["height"] = "100%";
        } else {
          controlSpace.style["top"] = "70%";
          controlSpace.style["left"] = "0%";
          controlSpace.style["width"] = "100%";
          controlSpace.style["height"] = "30%";
          dataSpace.style["top"] = "0%";
          dataSpace.style["left"] = "0%";
          dataSpace.style["width"] = "100%";
          dataSpace.style["height"] = "70%";
        }
        let viewerHeight = dataSpace.offsetHeight;
        let controllerHeight = controlSpace.offsetHeight;
        this.viewer.height = viewerHeight + "px";
        this.controller.height = controllerHeight + "px";
      }
    }
  }
  constructor() {
  }
  ngOnInit() {
    this.height = (window.innerHeight).toString() + "px";
  }
  get books():Books {
    return this._books;
  }
  set books(books:Books) {
    this._books = books;
    if(this.controller) {
      this.controller.books = this._books;
    }
    if(this.viewer) {
      this.viewer.books = this._books;
      this.viewer.controller = this.controller;
      this.viewer.tabIndex = "0";
    }
  }
  ngAfterViewInit() {
    this.books = this.books;
  }
}
