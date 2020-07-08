import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/AntDesign';
import utilities from '../../styles/utilities';
import typography from '../../styles/typography';

import {logout} from '../../redux/actions/auth';
import Profile from './Profile';
import color from '../../styles/color';

const mapDispatchToProps = {
  logout,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const logout_ = (props) => (e) => {
  props.logout();
  props.changePage('login');
};

const Stack = createStackNavigator();

const ListConfig = (styled, auth, o) => (props) => {
  return (
    <ScrollView
      style={{
        ...{
          flex: 1,
          width: '100%',
          paddingHorizontal: 25,
        },
      }}>
      <Text style={styled.label}>Settings</Text>
      <TouchableOpacity style={styled.card} onPress={logout_(o)}>
        <Icon
          name={Object.keys(auth.session).length > 0 ? 'logout' : 'user'}
          style={{...{marginRight: 20}}}
          size={typography.FONT_SIZE_APP}
        />
        <Text>{Object.keys(auth.session).length > 0 ? 'Logout' : 'Login'}</Text>
      </TouchableOpacity>

      <View style={{...{marginBottom: 27}}} />
    </ScrollView>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)((props) => (
  <Stack.Navigator>
    <Stack.Screen
      name="list_config"
      options={{
        headerShown: false,
      }}
      component={ListConfig(styled, props.auth, props)}
    />
    <Stack.Screen name="profile" component={Profile} />
  </Stack.Navigator>
));

const styled = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: typography.FONT_SIZE_LABEL,
    color: color.COLOR_FONT_PLAIN,
    marginVertical: 27,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: utilities.CONTAINER_CARD_PADDING_HORIZONTAL,
    paddingVertical: utilities.CONTAINER_CARD_PADDING_VERTICAL,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  status: {
    fontSize: typography.FONT_SIZE_SECONDARY,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    fontWeight: 'bold',
    color: 'white',
  },
  avail: {
    backgroundColor: 'green',
  },
  booked: {
    backgroundColor: 'red',
  },
});
