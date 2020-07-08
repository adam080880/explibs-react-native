import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Catalog from '../screens/DashboardScreens/Catalog';
import History from '../screens/DashboardScreens/History';
import Detail from '../screens/DashboardScreens/CatalogScreens/Detail';
import BrowseBook from '../screens/DashboardScreens/CatalogScreens/BrowseBook';
import Config from '../screens/DashboardScreens/Config';
import Profile from '../screens/DashboardScreens/Profile';
import Booking from '../screens/DashboardScreens/CatalogScreens/DetailScreens/Booking';

import BottomBar from './BottomBar';

import typography from '../styles/typography';
import color from '../styles/color';

export default {
  app: function (data, histories, changePage) {
    // eslint-disable-next-line consistent-this
    const fromThis = this;
    return function (props) {
      const _this = fromThis;
      return (
        <>
          <View>
            <View style={styled.nav}>
              <Text
                style={{
                  ...styled.title,
                  ...{marginVertical: 18, marginHorizontal: 25},
                }}>
                ExpL!bs
              </Text>
            </View>
          </View>
          <BottomBar
            data={data}
            page={_this}
            histories={histories}
            changePage={changePage}
          />
        </>
      );
    };
  },
  catalog: (data) => (props) => (
    <Catalog {...props} data={data} styled={styled} />
  ),
  profile: (changePage) => (props) => (
    <Profile {...props} changePage={changePage} styled={styled} />
  ),
  setting: (changePage) => (props) => (
    <Config {...props} styled={styled} changePage={changePage} />
  ),
  histories: (histories) => (props) => (
    <History {...props} styled={styled} histories={histories} />
  ),
  detail: (props) => <Detail {...props} />,
  browse: (props) => <BrowseBook styled={styled} {...props} />,
  booking: (props) => <Booking styled={styled} {...props} />,
};

const styled = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    elevation: 5,
  },
  icon: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: typography.FONT_SIZE_LABEL,
    color: color.COLOR_FONT_PLAIN,
    marginVertical: 27,
  },
  nav: {
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    elevation: 5,
  },
  container: {},
  title: {
    fontSize: typography.FONT_SIZE_APP,
    fontWeight: 'bold',
    color: color.COLOR_FONT_PLAIN,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    elevation: 10,
  },
  bottomBarLink: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: typography.FONT_SIZE_SECONDARY,
  },
});
