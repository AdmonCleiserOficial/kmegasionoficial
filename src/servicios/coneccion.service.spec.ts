import { TestBed } from '@angular/core/testing';

import { ConeccionService } from './coneccion.service';

describe('ConeccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConeccionService = TestBed.get(ConeccionService);
    expect(service).toBeTruthy();
  });
});
