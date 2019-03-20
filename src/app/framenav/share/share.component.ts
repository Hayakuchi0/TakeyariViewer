import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Clipboard } from 'ts-clipboard';

export interface DialogData {
  url:string;
  title:string;
  sitename:string;
}

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements AfterViewInit {
  constructor(
    public dialogRef:MatDialogRef<ShareComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onClickClose(dialogResult?): void {
    this.dialogRef.close(dialogResult);
  }
  onClickCopy(dialogResult?): void {
    let urlDialog = document.getElementById("url-dialog");
    Clipboard.copy(urlDialog["value"]);
  }
  ngAfterViewInit() {
    let element = document.getElementById("tweet-link");
    let params= "";
    let url = encodeURIComponent(this.data.url);
    params = params + "text=" + this.data.title + "&hashtags=" + this.data.sitename;
    let href = encodeURI("https://twitter.com/share?"+params)+"&url="+url;
    element.setAttribute("href",href);
  }
}
