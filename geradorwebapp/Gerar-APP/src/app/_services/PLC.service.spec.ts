/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PLCService } from './PLC.service';

describe('Service: PLC', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PLCService]
    });
  });

  it('should ...', inject([PLCService], (service: PLCService) => {
    expect(service).toBeTruthy();
  }));
});
