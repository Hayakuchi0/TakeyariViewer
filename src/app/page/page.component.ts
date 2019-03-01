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
    if(this.viewer) {
      this.viewer.height = height;
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
