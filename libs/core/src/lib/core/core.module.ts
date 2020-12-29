import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CorBackgroundDirective,
  CorButtonDirective,
  CorColorDirective,
  CorMeasureElementDirective
} from './directives';



@NgModule({
  declarations: [
    CorBackgroundDirective,
    CorColorDirective,
    CorMeasureElementDirective,
    CorButtonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CorBackgroundDirective,
    CorColorDirective,
    CorMeasureElementDirective,
    CorButtonDirective
  ]
})
export class CoreModule { }
