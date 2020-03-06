import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginRoute from './routes/Login';
import CheckInRoute from './routes/CheckIn';

const Stack = createStackNavigator();

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginRoute}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="CheckIn"
            component={CheckInRoute}
            options={{headers: () => null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
