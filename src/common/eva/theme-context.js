import React from 'react';
import BuildConfig from 'react-native-build-config';
import { COLOR_SCHEME } from '../../common/constants';

let ColorScheme;
switch (BuildConfig.COLOR_SCHEME) {
  case COLOR_SCHEME.BLACK_LIGHT:
      ColorScheme = require('../../common/eva/themes/black-light.json');
      break;
  case COLOR_SCHEME.BLUE_LIGHT:
      ColorScheme = require('../../common/eva/themes/blue-light.json');
      break;
  default:
      ColorScheme = require('../../common/eva/themes/black-light.json');
      break;
}

export const ThemeContext = React.createContext({
  theme: ColorScheme,
  toggleTheme: () => {},
});