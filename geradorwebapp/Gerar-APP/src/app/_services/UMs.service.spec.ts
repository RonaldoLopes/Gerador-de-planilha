/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UMsService } from './UMs.service';

describe('Service: UMs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UMsService]
    });
  });

  it('should ...', inject([UMsService], (service: UMsService) => {
    expect(service).toBeTruthy();
  }));
});
