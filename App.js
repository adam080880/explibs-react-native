import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Main';

import {Provider} from 'react-redux';
import MainStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      page: 'home',
    };
  }

  changePage = (page) => {
    this.setState({
      page,
    });
  };

  page = {
    login: (props) => <Login {...props} changePage={this.changePage} />,
    register: (props) => <Register {...props} changePage={this.changePage} />,
    home: (props) => <Home {...props} changePage={this.changePage} />,
  };

  render() {
    return (
      <Provider store={MainStore.store}>
        <PersistGate persistor={MainStore.persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              {this.state.page === 'register' && (
                <Stack.Screen
                  name={'register'}
                  options={{
                    headerShown: false,
                  }}
                  component={this.page.register}
                />
              )}
              {this.state.page === 'login' && (
                <Stack.Screen
                  name={'login'}
                  options={{
                    headerShown: false,
                  }}
                  component={this.page.login}
                />
              )}
              {this.state.page === 'home' && (
                <Stack.Screen
                  name={'home'}
                  options={{
                    headerShown: false,
                  }}
                  component={this.page.home}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
