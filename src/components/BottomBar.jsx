import React from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

const BottomTab = createBottomTabNavigator();
import color from '../styles/color';
import typography from '../styles/typography';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

class BottomBar extends React.Component {
  render() {
    return (
      <BottomTab.Navigator
        tabBarOptions={{activeTintColor: color.COLOR_UTILITIES_BACKGROUND}}>
        <BottomTab.Screen
          options={{
            title: 'Dashboard',
            tabBarIcon: ({color: colorProps}) => (
              <Icon
                name="home"
                color={colorProps}
                size={typography.FONT_SIZE_APP}
              />
            ),
          }}
          component={this.props.page.catalog(this.props.data)}
          name="home"
        />
        {Object.keys(this.props.auth.session).length > 0 &&
          this.props.auth.session.name != null && (
            <BottomTab.Screen
              options={{
                title: 'Histories',
                tabBarIcon: ({color: colorProps}) => (
                  <Icon
                    name="clockcircleo"
                    color={colorProps}
                    size={typography.FONT_SIZE_APP}
                  />
                ),
              }}
              component={this.props.page.histories(this.props.histories)}
              name="history"
            />
          )}
        {Object.keys(this.props.auth.session).length > 0 && (
          <BottomTab.Screen
            options={{
              title: 'Profile',
              tabBarIcon: ({color: colorProps}) => (
                <Icon
                  name="user"
                  outlined
                  color={colorProps}
                  size={typography.FONT_SIZE_APP}
                />
              ),
            }}
            component={this.props.page.profile(this.props.changePage)}
            name="profile"
          />
        )}
        <BottomTab.Screen
          options={{
            title: 'Settings',
            tabBarIcon: ({color: colorProps}) => (
              <Icon
                name="setting"
                style={{...{textAlign: 'center', marginBottom: 0}}}
                color={colorProps}
                size={typography.FONT_SIZE_APP}
              />
            ),
          }}
          component={this.props.page.setting(this.props.changePage)}
          name="settings"
        />
      </BottomTab.Navigator>
    );
  }
}

export default connect(mapStateToProps)(BottomBar);
