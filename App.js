import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Main';

import {Provider} from 'react-redux';
import MainStore from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Image, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import typography from './src/styles/typography';
import color from './src/styles/color';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      page: 'splash',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.changePage('home');
    }, 2000);
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
    splash: (props) => (
      <View
        style={{
          ...{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Image
          style={{...{width: 150, height: 150}}}
          source={require('./src/assets/images/explibs-app.png')}
        />
        <Spinner
          style={{
            ...{
              fontWeight: 'bold',
              fontSize: typography.FONT_SIZE_LABEL,
              color: color.COLOR_FONT_PLAIN,
              marginVertical: 27,
            },
            ...{opacity: 0.6},
          }}
          isVisible={true}
          size={typography.FONT_SIZE_APP * 3}
          type={'Pulse'}
          color={color.COLOR_UTILITIES_BACKGROUND}
        />
      </View>
    ),
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
              {this.state.page === 'splash' && (
                <Stack.Screen
                  name={'home'}
                  options={{
                    headerShown: false,
                  }}
                  component={this.page.splash}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
