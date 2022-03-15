import 'react-native-gesture-handler';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { icons, CommonScheme, ColorScheme } from './common/icons';
import configureStore from './redux';
import { AppNavigation } from './navigation';
import { toastConfig } from './config';
import mapping from './common/eva/mapping';
import Orientation from 'react-native-orientation-locker';
import { ThemeContext } from './common/eva/theme-context';
import { USER_TYPE } from './modules/user/constants';

Orientation.lockToPortrait();

// TODO: Remove when fixed
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.', // Some modules not using native driver for animations
  'Warning: Cannot update a component', // Stop redux-form log spamming
  'Warning: Cannot update during an existing state transition', // Happens due to slow emulator performance
  'componentWillReceiveProps', // componentWillReceiveProps deprecated
  'currentlyFocusedField', // currentlyFocusedField deprecated
  'TouchID error' // Stop TouchID is not supported warning in emulator 
]);

export const store = configureStore();

export default function App() {
  const [theme, setTheme] = React.useState(ColorScheme);

  const toggleTheme = (value) => {
    const BlackTheme = require('./common/eva/themes/black-light.json');
    const BlueTheme = require('./common/eva/themes/blue-light.json');
    if (value === USER_TYPE.CHILD) {
      setTheme(BlueTheme)
    } else {
      setTheme(BlackTheme);
    }
  };

  return (
    <Provider store={store}>
      <IconRegistry icons={icons} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} customMapping={mapping} theme={{ ...eva.light, ...CommonScheme, ...theme }}>
          <SafeAreaProvider>
            <AppNavigation />
            <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </Provider>
  );
}
