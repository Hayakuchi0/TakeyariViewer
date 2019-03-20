import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatIconModule, MatTreeModule } from '@angular/material';

import { BooktreeComponent } from './booktree.component';

describe('BooktreeComponent', () => {
  let component: BooktreeComponent;
  let fixture: ComponentFixture<BooktreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooktreeComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooktreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
