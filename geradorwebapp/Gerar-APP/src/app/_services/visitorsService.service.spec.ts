/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisitorsServiceService } from './visitorsService.service';

describe('Service: VisitorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitorsServiceService]
    });
  });

  it('should ...', inject([VisitorsServiceService], (service: VisitorsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
