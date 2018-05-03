import { TestBed, inject } from '@angular/core/testing';

import { DisponibleService } from './disponible.service';

describe('DisponibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisponibleService]
    });
  });

  it('should be created', inject([DisponibleService], (service: DisponibleService) => {
    expect(service).toBeTruthy();
  }));
});
