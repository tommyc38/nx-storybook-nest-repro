import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { CanColorText, CanColorTextCor, mixinColorText } from '@umbrelo/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

//mixin boiler plate
class CorIconBase {
  constructor(public _elementRef: ElementRef) {
  }
}

const _CorIconMixinBase: CanColorTextCor &
  typeof CorIconBase = mixinColorText(CorIconBase, 'secondary');

/**
 * Cor Icons
 *
 * A wrapper to help normalize the differences between Material Icons,
 * Font Awesome, and Cor Icons (internal icons).  Badges can also
 * be applied which uses Material Badge under the hood.
 *
 */
@Component({
  selector: 'cor-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorIconComponent extends _CorIconMixinBase implements OnInit, CanColorText {

  /** @Ignore * The CSS class to apply */
  _colorCssClass;

  /** * The color of the icon.  The default value is _secondary_. */
  @Input() color;

  /** The badge content. */
  @Input() badge: any;

  /** The size of the icon badge. */
  @Input() badgeSize: 'small' | 'medium' | 'large' = 'small';

  /** The background color of the badge. */
  @Input() badgeBackground: 'warn' | 'primary' | 'accent' = 'warn';

  /** Whether the badge should be hidden. */
  @Input() badgeIsHidden = false;

  @Input() inline = false;

  /** Whether Cor Icons should normalize to Material Icons. */
  @Input() corNormalizeToMat = true;

  _size = 24;
  /** The size of the icon (in pixels). */
  @Input() set size(num: number) {
    if (!num) return;
    this._size = num;
  };

  /** The size needed to normalize a Material Icon size to FA. */
  _faReductionFactor = .85;
  disabled = false;

  _iconIsLigature = true;
  /** Whether the icon is a ligature*/
  @Input() set iconIsLigature(value: boolean) {
    if (typeof value !== 'boolean') return;
    this._iconIsLigature = value;
  };
  get iconIsLigature(){
    return this._iconIsLigature;
  }

  _iconSetClass = 'material-icons';
  /** The icon class set. The default is material-icons */
  @Input() set iconSetClass(value: string) {
    if (typeof value !== 'string') return;
    this._iconSetClass = value;
  }
  get iconSetClass(){
    return this._iconSetClass;
  }

  _icon: string;
  _isCorIcon = false;

  /** The icon name. */
  @Input() set icon(icon: string) {
    if (typeof icon !== 'string') return;
    if (/^fa-/.test(icon) && this._iconSetClass !== 'material-icons') {
      this._iconIsLigature = false;
      this._icon = icon;
    } else if (/^cor-/.test(icon)) {
      this._isCorIcon = true;
      this._icon = icon;
    } else {
      this._icon = icon;
      this._isCorIcon = false;
    }
  };


  /** @ignore */
  @HostBinding('style.height') get height() {
    return this.inline ? 'inherit' : this._size + 'px';
  }

  /** @ignore */
  @HostBinding('style.width') get width() {
    return this.inline ? 'inherit' : this._size + 'px';
  }

  constructor(public elementRef: ElementRef, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    super(elementRef);

    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/icons/cor-icons.svg'));

    /** Set the default color */
    this._elementRef.nativeElement.classList.add(this._colorCssClass);
  }

  ngOnInit() {
  }

}
