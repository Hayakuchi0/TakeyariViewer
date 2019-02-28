import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecontrolComponent } from './pagecontrol.component';

describe('PagecontrolComponent', () => {
  let component: PagecontrolComponent;
  let fixture: ComponentFixture<PagecontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagecontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagecontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
