import React from 'react';
import {AppRegistry} from 'react-native';
import {initializeI18n} from './src/i18n';
import {name as appName} from './app.json';
import App from './src/App';

initializeI18n();

const Root = () => <App />;

AppRegistry.registerComponent(appName, () => Root);
