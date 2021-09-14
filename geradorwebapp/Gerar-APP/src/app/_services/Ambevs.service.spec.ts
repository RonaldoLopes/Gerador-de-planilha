/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AmbevsService } from './Ambevs.service';

describe('Service: Ambevs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmbevsService]
    });
  });

  it('should ...', inject([AmbevsService], (service: AmbevsService) => {
    expect(service).toBeTruthy();
  }));
});
