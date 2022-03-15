import AssetIconsBlack from './AssetIconsBlack';
import AssetIconsBlue from './AssetIconsBlue';
import MaterialCommunityIcons from './MaterialCommunityIcons';
import BuildConfig from 'react-native-build-config';
import { COLOR_SCHEME } from '../../common/constants';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

let AssetIcons, ColorScheme;
switch (BuildConfig.COLOR_SCHEME) {
    case COLOR_SCHEME.BLACK_LIGHT:
        AssetIcons = AssetIconsBlack;
        ColorScheme = require('../../common/eva/themes/black-light.json');
        break;
    case COLOR_SCHEME.BLUE_LIGHT:
        AssetIcons = AssetIconsBlue;
        ColorScheme = require('../../common/eva/themes/blue-light.json');
        break;
    default:
        AssetIcons = AssetIconsBlack;
        ColorScheme = require('../../common/eva/themes/black-light.json');
        break;
}
const CommonScheme = require('../../common/eva/themes/common-light.json');
const customIconsPack = [
    AssetIcons, MaterialCommunityIcons
];
const icons = [EvaIconsPack];
if (Object.keys(customIconsPack).length) {
    Object.keys(customIconsPack).forEach(p => icons.push(customIconsPack[p]));
}

export { icons, CommonScheme, ColorScheme };
