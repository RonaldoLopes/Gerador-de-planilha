/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoriansService } from './Historians.service';

describe('Service: Historians', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoriansService]
    });
  });

  it('should ...', inject([HistoriansService], (service: HistoriansService) => {
    expect(service).toBeTruthy();
  }));
});
