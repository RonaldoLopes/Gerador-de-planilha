/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfiguracoesService } from './Configuracoes.service';

describe('Service: Configuracoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguracoesService]
    });
  });

  it('should ...', inject([ConfiguracoesService], (service: ConfiguracoesService) => {
    expect(service).toBeTruthy();
  }));
});
