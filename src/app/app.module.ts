import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { BookselfComponent } from './bookself/bookself.component';
import { SidenaviComponent } from './sidenavi/sidenavi.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    BookselfComponent,
    SidenaviComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
