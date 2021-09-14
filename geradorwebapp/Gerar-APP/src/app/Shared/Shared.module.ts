import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaConfigComponent } from './consultaConfig/consultaConfig.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConsultaConfigComponent],
  exports: [ConsultaConfigComponent]
})
export class SharedModule { }
