import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Book, Books } from './book'
import { PageComponent } from './page/page.component'
import { BookselfComponent } from './bookself/bookself.component'
import { FramenavComponent } from './framenav/framenav.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private cdr:ChangeDetectorRef) {
  }
  ngAfterViewInit(){
  }
}
