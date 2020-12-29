import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorIconComponent } from './icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [CorIconComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule,
  ],
  exports: [CorIconComponent]
})
export class CorIconModule { }
