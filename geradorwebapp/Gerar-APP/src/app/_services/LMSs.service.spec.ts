/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LMSsService } from './LMSs.service';

describe('Service: LMSs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LMSsService]
    });
  });

  it('should ...', inject([LMSsService], (service: LMSsService) => {
    expect(service).toBeTruthy();
  }));
});
