import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { ICorElementDimensions } from '@umbrelo/data';


@Directive({
  selector: '[corMeasureElement]'
})
export class CorMeasureElementDirective implements AfterViewInit{


  visible: ICorElementDimensions;
  scrollable: ICorElementDimensions;

  @Output() visibleDimensions = new EventEmitter<ICorElementDimensions>();
  @Output() scrollableDimensions = new EventEmitter<ICorElementDimensions>();

  constructor(public _elementRef: ElementRef, private resize: ViewportRuler) {

    this.resize.change().subscribe(size => {

      this.takeMeasurement();

    });
  }

  ngAfterViewInit(): void {
    this.takeMeasurement();

  }

  getOffsetWidth(): number {
    return this._elementRef.nativeElement.offsetWidth;
  }

  getOffsetHeight(): number{
    return this._elementRef.nativeElement.offsetHeight;
  }

  takeMeasurement() {
    this.scrollable = { height: this._elementRef.nativeElement.scrollHeight, width: this._elementRef.nativeElement.scrollWidth };
    this.visible = { height: this._elementRef.nativeElement.clientHeight, width: this._elementRef.nativeElement.clientWidth };

    this.visibleDimensions.emit(this.visible);
    this.scrollableDimensions.emit(this.scrollable);


  }

}
