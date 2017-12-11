import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentThreeComponent } from './component-three.component';

describe('ComponentThreeComponent', () => {
  let component: ComponentThreeComponent;
  let fixture: ComponentFixture<ComponentThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
