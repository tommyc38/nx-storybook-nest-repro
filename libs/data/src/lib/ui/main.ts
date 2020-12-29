import { Moment } from 'moment';
import { CorColorTextType, CorColorText, CorColorBackgroundType } from './color-background';

export interface ICorElementDimensions {
  height: number,
  width: number
}
/**
 * Image Base
 *
 * @param {imgURL} [imgURL] - The download url for the image
 * @param {boolean} [hasBorder] - Whether the image should have a border
 * @param {CorColorName} [borderColor] - The border color
 * @param {boolean} [hasLightFilter = false] - Apply a light grey transparent filter over the image
 * @param {ICorIconBase} [imgErrorIcon] - An icon to display if the image has an error
 * @param {CorColorName} [imgErrorIconColor = 'red'] - The color of the error icon
 * @param {string} [imgErrorLabel] - The text content to display if the image encounters an error
 * @param {string} [imgErrorClasses] - The space delimited set of classes to be applied to the error icon
 * @param {boolean} [imgError = false] - Whether the image encountered an error and could not be displayed
 * @param {boolean} [isRestricted = false] - Whether the image is restricted
 */
export interface ICorImageBase {
  imgURL?: string;
  hasBorder?: boolean;
  borderColor?: CorColorTextType;
  hasLightFilter?: boolean;
  imgErrorIcon?: ICorIconBase;
  imgErrorIconColor?: CorColorTextType;
  imgErrorLabel?: string;
  imgErrorClasses?: string;
  isRestricted?: boolean;
  imgError?: boolean;
}

/**
 * Avatar meta data.
 *
 * @param {CorAvatarType} type - The type of avatar (e.g. image, icon, etc.)
 * @param {number} [size = 40] - Pixel height/width
 * @param {'circle' | 'square'} [shape = 'circle'] - Pixel height/width
 * @param {string} imgURL - The url to download the avatar image
 * @param {ICorListItemBase[]} listItems - The list items to populate menu/bottomsheet.
 * @param {boolean} enableBottomSheetMobile - If set to false, the menu view will used in mobile and not the bottomsheet
 */

export interface ICorAvatar extends ICorClassStyleBase, ICorIconBase, ICorImageBase {

  avatarType: ICorAvatarType;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  shape?: 'circle' | 'square';
  label?: string;
  enableBottomSheetMobile?: boolean;
}

/**  Avatar types */
export type ICorAvatarType = 'image' | 'icon' | 'label' | 'iconOnly';

/**  Cor Custom Icons */
export type CorIcons = 'cor-admin'

/**
 * Icon Base
 *
 * @param {string} [iconClass = material-icons] - The icon class set to use (e.g. material-icons-outlined)
 * @param {string | CorIcons} icon - The specific icon name to use (e.g. person)
 * @param {boolean} [isFontLigature = true] - Determines the type of icon.  Font ligatures use the `icon` param inside the icon tag versus a class name (e.g. <i>person</i>)
 */
export interface ICorIconBase {
  iconSetClass?: string;
  icon?: string;
  iconSize?: number;
  iconIsLigature?: boolean;
}
export interface ICorIconPrefix {
  iconPrefixSetClass?: string;
  iconPrefix?: string;
  iconPrefixColor?: CorColorTextType;
  iconPrefixIsLigature?: boolean;
}
export interface ICorIconSuffix {
  iconSuffixSetClass?: string;
  iconSuffix?: string | CorIcons;
  iconSuffixColor?: CorColorTextType;
  iconSuffixIsLigature?: boolean;
}

export class CorIcon implements ICorIconBase {

  static readonly iconSetClass = 'material-icons';
  static readonly iconIsLigature = true;

  constructor(icon: any) {
    CorIcon.configIcon(icon);
  }

  static isInstance(object: any) {
    return 'icon' in object;
  }

  static configIcon(icon: any) {
    if (!icon.iconSetClass) {
      icon.iconSetClass = this.iconSetClass;
      icon.iconIsLigature = this.iconIsLigature;
    } else {
      this.configureFontAwesomeIcon(icon);
    }
    this.concatIconClasses(icon);
  }

  static configureFontAwesomeIcon(icon: any):boolean {
    if(!icon)return false;
    const str = { iconSetClass: null };
    if (typeof icon === 'string') str.iconSetClass = icon;
    if (icon.hasOwnProperty('iconSetClass') || str.iconSetClass) {
      if (/^fas|far|fab|fad|fal$/.test(icon.iconSetClass) ||
        /^fas|far|fab|fad|fal/.test(str.iconSetClass)) {

        if (!str.iconSetClass) icon.iconIsLigature = false;
        return true;
      }
      if (!str.iconSetClass) icon.iconIsLigature = this.iconIsLigature;
    }
    return false;
  }

  static concatIconClasses(icon) {
    if(!icon.iconClasses)icon.iconClasses = [];
    if(typeof icon.iconClasses === 'string') icon.iconClasses = icon.iconClasses.split(' ');
    if (icon.iconSetClass) icon.iconClasses.push(icon.iconSetClass);
    if (!icon.iconIsLigature) icon.iconClasses.push(icon.icon);
  }
}

/**
 * Class and Style Base
 *
 * @param {object} [styles] - A key / value pair of styles and value (e.g. { color: 'red'})
 * @param {string} [classes] - A space delimited list of classes (e.g. 'class-one class-two')
 */
export interface ICorClassStyleBase {
  styles?: object;
  classes?: string | string[];
}

/**
 * Background and Foreground Colors
 *
 * @param {CorColorName} [backgroundColor] - Defines the background content color
 * @param {CorColorName} [foregroundColor] - Defines the foreground content color
 */
export interface ICorColor {
 color?: CorColorTextType;
}
export interface ICorBackground {
 background?: CorColorBackgroundType;
}

/** Rating Size - set the size of the icons used in CorRating. */
export type RatingSize = 'small' | 'medium' | 'large';

/**
 * List item base
 *
 * > Used as a base for navigation and menu items, among others.
 *
 * @param {string} [id] - The Unique identifier
 * @param {string | ICorTextDelta[]} [title] - The main text header
 * @param {string[] | ICorTextDelta[][]} [subTitle] - The sub text / caption. Each entry in the array generates a new line
 * @param {boolean} [divider] - Whether the item should have a bottom divider
 * @param {number} [rating] - The average rating out of five stars
 * @param {boolean} [disabled = false] - The state of the item
 * @param {boolean} [hidden = false] - Whether the item should be hidden (Default is false)
 * @param {string} [tinyIconSuffix] - The icon name (e.g. person, alarm, etc.) displayed centered and to the right of the title and subTitle content
 * @param {string} [tinyIconSuffixClass = material-icons] - The icon class set (e.g. material-icons-outlined)
 */

export interface ICorListItemBase extends ICorClassStyleBase,ICorIconPrefix, ICorIconSuffix, ICorBackground, ICorColor {
  id?: string | number;
  command?: (event?: any) => void;
  badgeIconPrefix?: string | number;
  badgeIconPrefixBackground?: 'primary' | 'accent' | 'warn';
  badgeIconPrefixSize?: 'small' | 'medium' | 'large';
  badgeHidden?:boolean,
  hasDivider?: boolean,
  disabled?: boolean;
  canExpand?:boolean;
  isExpanded?:boolean;
  hasCaretExpandIcon?: boolean;
  showExpandHoverOnly?:boolean;
  iconPrefixAnimate90DegOnClick?: boolean;
}


/**
 * Navigation menu item
 *
 * @param {function} [command] - Function to execute on click event
 * @param {url} [url] - Url to another website
 * @param {any}  [routerLink] - Angular route object
 * @param {object}  [queryParams] - Angular route params
 * @param {ICorNavItem[]} [subNavItems] - Sub navigation routes
 * @param {boolean} [expanded = false] - Whether the nav item is expanded to reveal sub nav items
 * @param {any} [routerLinkActiveOptions] - Angular active route options
 * @param {boolean} [isActiveRoute = false] - Whether the nav item contains the active route
 * @param {boolean} [openInNewTab = false] - Whether url should be opened in a new tab
 * @param {boolean} [notificationLight] - Whether to show the red dot indicating new notifications/updates
 * @param {CorColorName} [notificationLightColor = 'red'] - Color of the notification light
 */

export interface ICorNavItem extends ICorListItemBase, ICorRouterLink, ICorNestedData<ICorNavItem> {
  url?: string;
  target?: string;
  label?: string;
  badgeSuffix?: number | string;
  badgeSuffixAgg?: number;
  title?: string,
  hasFeatureNav?: boolean;
}

export interface ICorMentionItem extends ICorListItemBase, ICorAvatar{
  title?: string,
  subtitle?: string,
  type: string,
}

export interface ICorTimeLineItem {
  position?: 'left' | 'middle' | 'right';
  title?: string;
  caption?: string;
  url?: string;
}

export interface ICorPriorityMenuItem extends ICorClassStyleBase, ICorRouterLink, ICorNestedData<ICorPriorityMenuItem> {
  id?:string | number;
  command?: (event:any) => void;
  hidden?: boolean;
  title?: string;
  label?: string;
  icon?:string;
  disabled?:boolean;
}

export interface ICorNestedData<T> {
  items?: T[];
  parent?: T;
  level?: number;
  paddingFactor?: number;
}

export interface ICorRouterLink {
  routerLink?:string | any[];
  routerLinkActive?: string | string[];
  routerLinkActiveOptions?: {exact:boolean};
  fragment?:string;
  queryParams?: {[k:string]:any};
  preserveFragment?:boolean;
}

export type CorTextType = 'header' | 'title' | 'subtitle' | 'caption' | 'subscript' | 'superSubscript';

export const COR_TEXT_MAP = {
  header: 'cor-text-header',
  title: 'cor-text-title',
  subtitle: 'cor-text-sub-title',
  caption: 'cor-text-caption',
  subscript: 'cor-text-subscript',
  superSubscript: 'cor-text-super-subscript'

};

export class CorText {
  static readonly textMap = COR_TEXT_MAP;

  static isInstance(string: any): boolean {
    if (typeof string !== 'string') return false;
    return this.textMap.hasOwnProperty(string);
  }

  static getCssTypeClass(str: any): string {
    return this.textMap[str] || '';
  }
}


/**
 * Text Editor Delta
 *
 * The data structure used as a lightweight WYSIWYG rich text text but also
 * compatible with Quill.
 */
export interface ICorTextDelta {
  insert: string | number | ICorIconBase | ICorTextDeltaDateInsert | ICorTextDeltaRouterLinkInsert
  attributes?: ICorTextDeltaAttributes;
}

export interface ICorTextDeltaAttributes extends ICorClassStyleBase{
  corColor?: CorColorText;
}

export type CorTextDeltaInsertDiscriminate = 'routerLink' | 'date' | 'icon' | 'string';

/**
 * Text Delta Class
 */
export class CorTextDelta implements ICorTextDelta {
  insert: string & number & ICorIconBase & ICorTextDeltaDateInsert & ICorTextDeltaRouterLinkInsert;

  /**
   *
   * @param {any} object - Uses an object property discriminator ('insert') to
   * derive whether the object is an instance of CorTextDela.
   * @returns boolean
   */
  static isInstance(object: any): boolean {
    if (typeof object === 'string') return true;
    return 'insert' in object;
  }

  static getCorTextDeltaType(delta: ICorTextDelta): CorTextDeltaInsertDiscriminate {
    if (!this.isInstance(delta)) return null;
    if (typeof delta === 'string' || typeof delta.insert === 'string' ||
      typeof delta.insert === 'number') {
      return 'string';
    } else if (delta.insert.hasOwnProperty('date')) {
      return 'date';
    } else if (delta.insert.hasOwnProperty('icon')) {
      return delta.insert.hasOwnProperty('routerLink') ? 'routerLink' : 'icon';
    } else if (delta.insert.hasOwnProperty('routerLink')) {
      return 'routerLink';
    }
    return null;
  }
}

/**
 * Date Insert
 *
 * @param {string | Date | Moment} date
 */
export interface ICorTextDeltaDateInsert {
  date: string | Date | Moment;
}

/**
 * Link Insert
 *
 * @param {string} text - The text to display
 * @param {any} routerLink - Angular route
 * @param {any} routerLinkParams - Angular route parameters
 * @param {string} routerLinkActive - The class to apply when the link is active
 */
export interface ICorTextDeltaRouterLinkInsert extends ICorIconBase, ICorRouterLink {
  text: string;
}


