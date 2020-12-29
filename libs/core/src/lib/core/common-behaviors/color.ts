import { HasElementRef } from './background';
import { CorColorText, CorColorTextType } from '@umbrelo/data';

type Constructor<T> = new(...args: any[]) => T;

export interface CanColorText {
  color: CorColorTextType | 'remove';
  _colorCssClass:string;
}
export type CanColorTextCor = Constructor<CanColorText>;

/** Mixin to augment a directive with a `color` property. */
export function mixinColorText<T extends Constructor<HasElementRef>>(
  base: T, defaultColor?: CorColorTextType): CanColorTextCor & T {
  return class extends base {

    _color:CorColorTextType = defaultColor;
   _colorCssClass:string = defaultColor? CorColorText.getCssColorClass(defaultColor):null;
    get color(){return this._color;}
    set color(value:CorColorTextType | 'remove'){
      if(value === 'remove'){
        if(this._color) this._elementRef.nativeElement.classList.remove(this._colorCssClass);
        this._color = null;
        this._colorCssClass = '';
        return
      }
      const colorText = value ||  defaultColor;

      if(colorText !== this._color){
        if(this._color){
          this._elementRef.nativeElement.classList.remove(this._colorCssClass) ;
        }
        if(colorText){
          this._colorCssClass = CorColorText.getCssColorClass(colorText);
          this._elementRef.nativeElement.classList.add(this._colorCssClass) ;
        }
      }
      this._color = colorText;
    }

    constructor(...args: any[]) { super(...args); }
  };
}
