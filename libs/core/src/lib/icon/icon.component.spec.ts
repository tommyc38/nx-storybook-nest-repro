import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: CorIconComponent;
  let fixture: ComponentFixture<CorIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
