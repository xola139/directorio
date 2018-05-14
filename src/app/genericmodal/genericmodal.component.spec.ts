import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericmodalComponent } from './genericmodal.component';

describe('GenericmodalComponent', () => {
  let component: GenericmodalComponent;
  let fixture: ComponentFixture<GenericmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
