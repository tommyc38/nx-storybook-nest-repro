export const PALETTE = <const> ['green', 'lightGreen', 'orange', 'brightOrange',
  'pink', 'purple', 'lightPurple', 'blue', 'lightBlue', 'lime', 'brown',
  'grey', 'gold', 'white'];

export type CorColorPaletteType = typeof PALETTE[number];

export const PALETTE_CONTRAST = <const> ['greenContrast', 'lightGreenContrast',
  'orangeContrast', 'brightOrangeContrast', 'pinkContrast', 'purpleContrast',
  'lightPurpleContrast', 'blueContrast', 'lightBlueContrast', 'limeContrast',
  'brownContrast', 'goldContrast', 'greyContrast', 'whiteContrast'];

export type CorColorPaletteContrastType = typeof PALETTE_CONTRAST[number];

export const APP = <const> ['isLoggedIn', 'rating', 'link', 'youtube'];

export type CorColorAppType = typeof APP[number];

export const APP_CONTRAST = <const> ['isLoggedInContrast', 'ratingContrast', 'linkContrast', 'youtubeContrast'];

export type CorColorAppContrastType = typeof APP_CONTRAST[number];

export const BG_COLOR = <const>[
  'default', 'primary', 'primaryHover', 'primaryLight',
  'primaryLightHover', 'primaryDark', 'accent', 'accentDark',
  'accentHover', 'accentLight', 'accentLightHover', 'hoverDefault',
  'hoverPrimary', 'hoverPrimaryLight', 'hoverAccent', 'hoverAccentLight',
  'hoverWarn', 'hoverWarnLight', 'hoverWarnDark', 'warn', 'warnHover',
  'warnLight', 'warnLightHover', 'warnDark'
];

export type CorColorBackgroundType = typeof BG_COLOR[number];

// defaultBlack and defaultWhite will not change when the theme is dark.
// Only use these values when you are certain the background won't change with
// a change to light / dark themes.
export const TXT_COLOR = <const>[ 'inherit', 'defaultBlack', 'defaultBlackBlink',
  'defaultWhiteBlink', 'default', 'defaultBlink', 'secondary', 'secondaryBlink',
  'primary', 'primaryBlink', 'accent', 'accentBlink', 'warn', 'warnBlink', 'disabled',
  'primaryLight', 'primaryDark', 'hoverPrimary', 'hoverPrimaryLight',
  'hoverPrimaryDarkContrast', 'hoverWarn', 'hoverWarnLight', 'hoverAccent',
  'hoverAccentLight', 'hoverAccentDarkContrast', 'accentLight', 'accentDark',
  'warnLight', 'warnDark', 'hoverWarn', 'hoverWarnLight', 'hoverDefault',
  'hoverSecondary','hoverWarnDarkContrast',
];

export type CorColorTxtType = typeof TXT_COLOR[number];

export const DISABLED = <const> ['disabled', 'disabledContrast'];

export type CorColorDisabledType = typeof DISABLED[number];

export const TXT_COLOR_CONTRAST = <const> [ 'defaultContrast',
  'defaultBlinkContrast', 'secondaryContrast', 'primaryHoverContrast',
  'secondaryBlinkContrast', 'primaryContrast', 'primaryBlinkContrast', 'accentHoverContrast',
  'accentContrast', 'accentBlinkContrast', 'warnContrast', 'warnBlinkContrast', 'warnHoverContrast',
  'disabledContrast', 'primaryLightContrast', 'primaryDarkContrast',
  'hoverPrimaryContrast', 'hoverPrimaryLightContrast', 'hoverPrimaryDarkContrast',
  'hoverWarnContrast', 'hoverWarnLightContrast', 'hoverAccentContrast',
  'hoverAccentLightContrast', 'hoverAccentDarkContrast', 'accentLightContrast',
  'accentDarkContrast', 'warnLightContrast', 'warnDarkContrast',
  'hoverWarnContrast', 'hoverWarnLightContrast', 'hoverWarnDarkContrast'
];

export type CorColorTxtContrastType = typeof TXT_COLOR_CONTRAST[number];

export type CorColorTextType = CorColorTxtType | CorColorTxtContrastType  |
  CorColorPaletteType | CorColorPaletteContrastType | CorColorAppType |
  CorColorAppContrastType | CorColorDisabledType;



export const CARET_TYPE = <const> ['r8','icon-r8' , 'r16' , 'l8', 'l', 'l16', 'r'];

export type CorIconCaretType = typeof CARET_TYPE[number];

class BuildColorBase {
  static buildColorMap(prefix, nameList) {
    const map = {};
    nameList.forEach(key => {
      const cssClass = key.replace(/[A-Z]/g, m => '-' + m.toLocaleLowerCase());
      map[key] = prefix + '-' + cssClass;
    });
    return map;
  }
}


export class CorColorText extends BuildColorBase {
  static get colorMap() {
    const text = this.buildColorMap('cor-color-txt', this._text);
    const textContrast = this.buildColorMap('cor-color-txt', this._textContrast);
    const disabled = this.buildColorMap('cor-color-txt', this._disabled);
    const pal = this.buildColorMap('cor-color-pal', this._palette);
    const palContrast = this.buildColorMap('cor-color-pal', this._paletteContrast);
    const app = this.buildColorMap('cor-color-app', this._app);
    const appContrast = this.buildColorMap('cor-color-app', this._appContrast);
    return { ...text, ...pal, ...app,...textContrast,...palContrast,...appContrast,...disabled };
  }

  static _text =  TXT_COLOR;
  static _textContrast = TXT_COLOR_CONTRAST;
  static _palette = PALETTE;
  static _paletteContrast = PALETTE_CONTRAST;
  static _app = APP;
  static _appContrast = APP_CONTRAST;
  static _disabled = DISABLED;


  static isInstance(string: any): boolean {
    if (typeof string !== 'string') return false;
    return CorColorText.colorMap.hasOwnProperty(string);
  }

  static getCssColorClass(str: any): string {
    return CorColorText.isInstance(str) ? this.colorMap[str] : '';
  }

}



export class CorColorBackground extends BuildColorBase {

  static get bgMap() {
    const text = this.buildColorMap('cor-bg-main', this._bg);
    const pal = this.buildColorMap('cor-bg-pal', this._palette);
    const app = this.buildColorMap('cor-bg-app', this._app);
    return { ...text, ...pal, ...app };
  }

  static _palette = PALETTE;
  static _bg = BG_COLOR;
  static _app = APP;

  static isInstance(string: any): boolean {
    if (typeof string !== 'string') return false;
    return this.bgMap.hasOwnProperty(string);
  }

  static getCssBgClass(str: any): string {
    return this.isInstance(str) ? this.bgMap[str] : '';
  }

  static getBgContrast(bgColor: string) {
    bgColor = bgColor === 'default' ? bgColor : bgColor + 'Contrast';
    if (/Hover/.test(bgColor)) {
      bgColor = bgColor.replace('Hover', '');
    }
    return CorColorText.getCssColorClass(bgColor);
  }

}


export class CorIconCaret{

  static getCssCaretClass(caret: CorIconCaretType){
    if(!CARET_TYPE.includes(caret))return;
    const base = 'cor-icon-caret-collapsed-';
    return base + caret;
  }
}
