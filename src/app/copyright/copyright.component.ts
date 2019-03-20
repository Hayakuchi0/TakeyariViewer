import { Component, OnInit } from '@angular/core';
import { COPYRIGHT } from '../siteinfo';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {
  copyright:string;
  constructor() { }

  ngOnInit() {
    this.copyright=COPYRIGHT;
  }

}
