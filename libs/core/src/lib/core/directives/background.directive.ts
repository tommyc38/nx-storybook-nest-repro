import { Directive, ElementRef, Input } from '@angular/core';
import { CorColorBackground, CorColorBackgroundType } from '@umbrelo/data';

@Directive({
  selector: '[corBackground]'
})
export class CorBackgroundDirective {

  _background:string;

  @Input('corBackground') set background(bg:CorColorBackgroundType){
    if(!bg || !CorColorBackground.getCssBgClass(bg)) return;
    if(this._background) this._el.nativeElement.classList.remove(this._background);
    this._background = CorColorBackground.getCssBgClass(bg);
    this._el.nativeElement.classList.add(this._background);
  }
  constructor(private _el: ElementRef) { }


}
