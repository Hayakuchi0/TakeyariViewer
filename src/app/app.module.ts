import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { BookselfComponent } from './bookself/bookself.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { FramenavComponent } from './framenav/framenav.component';
import { PagecontrolComponent } from './page/pagecontrol/pagecontrol.component';
import { PageviewComponent } from './page/pageview/pageview.component';
import { AboutComponent } from './about/about.component';
import { BooktreeComponent } from './booktree/booktree.component';
import { TopComponent } from './top/top.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { ShareComponent } from './framenav/share/share.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    BookselfComponent,
    FramenavComponent,
    PagecontrolComponent,
    PageviewComponent,
    AboutComponent,
    BooktreeComponent,
    TopComponent,
    CopyrightComponent,
    ShareComponent
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
    MatListModule,
    MatTreeModule,
    MatDialogModule
  ],
  entryComponents: [
    ShareComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
