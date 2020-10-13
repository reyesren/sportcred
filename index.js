/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';

export default function Main() {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1F6521',
      accent: '#D6CE15',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
