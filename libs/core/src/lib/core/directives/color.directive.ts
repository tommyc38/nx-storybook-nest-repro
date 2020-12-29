import { Directive, ElementRef, Input } from '@angular/core';
import { CorColorText, CorColorTextType } from '@umbrelo/data';

@Directive({
  selector: '[corColor]'
})
export class CorColorDirective {

  _disabled:boolean;
  @Input()set colorDisabled(bool: boolean){
    if(typeof bool !== 'boolean')return;
    const dis = 'cor-color-disabled';
    if(bool){
      this._disabled = bool;
      this._el.nativeElement.classList.add(dis);
      return
    }
     if(this._disabled) this._disabled = false;
    this._el.nativeElement.classList.remove(dis);

  }
  _color:string;
  @Input('corColor') set color(color:CorColorTextType | 'remove'){
    if(color === 'remove'){
      this._el.nativeElement.classList.remove(this._color);
      this._color = '';
      return
    }
   if(!color || !CorColorText.getCssColorClass(color)) return;
   if(this._color) this._el.nativeElement.classList.remove(this._color);
   this._color = CorColorText.getCssColorClass(color);
   this._el.nativeElement.classList.add(this._color);
  }
  constructor(private _el: ElementRef) { }

}
