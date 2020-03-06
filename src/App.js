/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {create} from 'dva-core';
import {Provider} from 'react-redux';
import Router from './router';
import {ApplicationProvider} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {default as appTheme} from './theme.json';

import auth from './models/authModels';
import checkIn from './models/checkInModels';

const theme = {...darkTheme, ...appTheme};

// 註冊Ｍodels
const app = create();
app.model(auth);
app.model(checkIn);
app.start();
const store = app._store;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ApplicationProvider mapping={mapping} theme={theme}>
          <Router />
        </ApplicationProvider>
      </Provider>
    );
  }
}

export default App;
