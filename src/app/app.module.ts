import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { BookselfComponent } from './bookself/bookself.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { FramenavComponent } from './framenav/framenav.component';
import { PagecontrolComponent } from './page/pagecontrol/pagecontrol.component';
import { PageviewComponent } from './page/pageview/pageview.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    BookselfComponent,
    FramenavComponent,
    PagecontrolComponent,
    PageviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
