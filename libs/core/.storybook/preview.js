import '!style-loader!css-loader!sass-loader!./scss-loader.scss';
import { setCompodocJson } from '@storybook/addon-docs/dist/frameworks/angular';
import docJson from './documentation.json';

setCompodocJson(docJson);

export const parameters = { docs: { iframeHeight: '200px' }, layout: 'centered' }
