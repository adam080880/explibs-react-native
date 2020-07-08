import React from 'react';
import {SafeAreaView} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

import PageController from '../components/PageController';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {image: require('../assets/images/viking.jpg'), key: 1},
        {image: require('../assets/images/tere_liye.jpg'), key: 2},
        {image: require('../assets/images/book2.jpg'), key: 3},
        {image: require('../assets/images/book.jpg'), key: 4},
      ],
      histories: [
        {title: 'Tere Liye', status: false, key: 1},
        {title: 'Book-2', status: false, key: 2},
        {title: 'Vinland Saga', status: true, key: 3},
        {title: 'How to be Gamer', status: false, key: 4},
        {title: 'Vikings', status: true, key: 5},
      ],
    };
  }
  render() {
    return (
      <>
        <SafeAreaView style={{...{justifyContent: 'space-between', flex: 1}}}>
          <Stack.Navigator>
            <Stack.Screen
              name={'catalog'}
              options={{
                headerShown: false,
              }}
              component={PageController.app(
                this.state.data,
                this.state.histories,
                this.props.changePage,
              )}
            />
            <Stack.Screen name={'browse'} component={PageController.browse} />
            <Stack.Screen name={'detail'} component={PageController.detail} />
            <Stack.Screen name={'booking'} component={PageController.booking} />
          </Stack.Navigator>
        </SafeAreaView>
      </>
    );
  }
}
