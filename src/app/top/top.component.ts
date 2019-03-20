import { Component, OnInit } from '@angular/core';
import { SITENAME } from '../siteinfo';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  sitename:string = SITENAME;
  constructor() { }

  ngOnInit() {
  }

}
