/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import configureStore from './configureStore';

const store = configureStore();

const LearnMovies = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('LearnMovies', () => LearnMovies);
