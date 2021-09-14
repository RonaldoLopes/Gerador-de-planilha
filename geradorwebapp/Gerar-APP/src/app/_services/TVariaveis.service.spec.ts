/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TVariaveisService } from './TVariaveis.service';

describe('Service: TVariaveis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TVariaveisService]
    });
  });

  it('should ...', inject([TVariaveisService], (service: TVariaveisService) => {
    expect(service).toBeTruthy();
  }));
});
