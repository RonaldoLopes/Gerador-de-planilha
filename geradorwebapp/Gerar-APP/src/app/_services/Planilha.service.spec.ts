/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanilhaService } from './Planilha.service';

describe('Service: Planilha', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanilhaService]
    });
  });

  it('should ...', inject([PlanilhaService], (service: PlanilhaService) => {
    expect(service).toBeTruthy();
  }));
});
