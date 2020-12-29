import { ElementRef } from '@angular/core';
import { Constructor } from '@angular/material/core/common-behaviors/constructor';
import { CorColorBackground, CorColorBackgroundType } from '@umbrelo/data';

export interface CanSetBackground {
  background: CorColorBackgroundType;
}
export interface HasElementRef {
  _elementRef: ElementRef;
}

export type CanSetBackgroundCor = Constructor<CanSetBackground>;

/** Mixin to augment a directive with a `background` property. */
export function mixinBackground<T extends Constructor<HasElementRef>>(
  base: T, defaultColor?:CorColorBackgroundType): CanSetBackgroundCor & T {
  return class extends base {

    _background:CorColorBackgroundType;
    _backgroundCssClass:string;
    get background(){return this._background;}
    set background(value:CorColorBackgroundType){
      const colorText = value ||  defaultColor;

      if(colorText !== this._background){
        if(this._background){
          this._elementRef.nativeElement.classList.remove(this._backgroundCssClass) ;
        }
        if(colorText){
          this._backgroundCssClass = CorColorBackground.getCssBgClass(colorText);
          this._elementRef.nativeElement.classList.add(this._backgroundCssClass) ;
        }
      }
      this._background = colorText;
    }

    constructor(...args: any[]) { super(...args); }
  };
}
