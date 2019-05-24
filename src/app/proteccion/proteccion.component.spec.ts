import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteccionComponent } from './proteccion.component';

describe('ProteccionComponent', () => {
  let component: ProteccionComponent;
  let fixture: ComponentFixture<ProteccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
