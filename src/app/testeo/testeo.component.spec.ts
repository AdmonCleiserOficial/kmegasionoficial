import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteoComponent } from './testeo.component';

describe('TesteoComponent', () => {
  let component: TesteoComponent;
  let fixture: ComponentFixture<TesteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
