/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IGSService } from './IGS.service';

describe('Service: IGS', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IGSService]
    });
  });

  it('should ...', inject([IGSService], (service: IGSService) => {
    expect(service).toBeTruthy();
  }));
});
