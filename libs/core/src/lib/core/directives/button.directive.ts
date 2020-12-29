import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[corButton]'
})
export class CorButtonDirective {

  _noRadius = false;

  @Input() set noButtonRadius(bool: boolean) {
    if (typeof bool !== 'boolean') return;
    if (!bool && this._noRadius) {
      this._noRadius = false;
      this._el.nativeElement.classList.remove('cor-button-radius');
    } else if (bool && !this._noRadius) {
      this._noRadius = true;
      this._el.nativeElement.classList.add('cor-button-radius');
    }
  };

  constructor(private _el: ElementRef) {
    this._el.nativeElement.classList.add('cor-button');
  }

}
