import React from 'react';
import {connect} from 'react-redux';
import Moleculs from '../components/moleculs/index';
import Atoms from '../components/atoms/index';
import {View, Text, StyleSheet, Image} from 'react-native';

import utilities from '../styles/utilities';
import typography from '../styles/typography';
import color from '../styles/color';

import {
  login,
  resetLoading,
  resetMsg,
  resetStatus,
  logout,
} from '../redux/actions/auth';
import Spinner from 'react-native-spinkit';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  login,
  resetLoading,
  resetMsg,
  resetStatus,
  logout,
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      msg: '',
    };
  }

  login = () => {
    const {email, password} = this.state;
    this.props.login({email, password});
  };

  componentDidMount() {
    this.props.resetLoading(null);
    this.props.resetMsg();
    this.props.resetStatus(false);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      msg: '',
    });
    if (Object.keys(this.props.auth.session).length > 0) {
      this.props.changePage('home');
    }
  }

  componentDidUpdate() {
    if (
      this.props.auth.isLoading === false &&
      this.props.auth.status === true
    ) {
      if (this.props.auth.session.role !== 'Member') {
        this.props.logout();
        this.props.resetMsg('Your role is not match with this apps');
        this.props.resetStatus(false);
        this.props.resetLoading(false);
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          msg: this.props.auth.msg,
        });
      } else {
        this.props.resetMsg();
        this.props.resetLoading();
        this.props.changePage('home');
      }
    } else if (
      this.props.auth.isLoading === false &&
      this.props.auth.status === false
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        msg: this.props.auth.msg,
      });
      this.props.resetMsg();
      this.props.resetLoading();
    }
  }

  render() {
    return (
      <View
        style={{
          ...{
            paddingHorizontal: utilities.CONTAINER_CARD_PADDING_HORIZONTAL,
            paddingVertical: utilities.CONTAINER_CARD_PADDING_VERTICAL,
          },
          ...{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
          },
        }}>
        <Image
          source={require('../assets/images/res.png')}
          style={{
            ...{
              position: 'absolute',
              width: 166.15,
              height: 101.91,
              zIndex: 3,
              top: 10,
              opacity: 0.9,
              right: -30,
            },
          }}
        />
        <View>
          <Text
            style={{
              ...{
                fontSize: typography.FONT_SIZE_APP,
                fontWeight: 'bold',
                marginBottom: 6,
              },
            }}>
            ExpL!bs
          </Text>
          <Text
            style={{
              ...{
                fontSize: typography.FONT_SIZE_SECONDARY,
                color: color.COLOR_GRAY,
              },
            }}>
            Make your future bright with books
          </Text>
        </View>
        <View>
          {this.props.auth.isLoading === null && (
            <>
              <Text style={style.labelForm}>Sign in to your account</Text>
              <Atoms.TextInput
                disabled={this.props.auth.isLoading}
                label="Email"
                style={{...{marginBottom: 19}}}
                onChange={(e) => this.setState({email: e.nativeEvent.text})}
                value={this.state.email}
                placeholder="Your email..."
              />
              <Atoms.TextInput
                disabled={this.props.auth.isLoading}
                secureTextEntry={true}
                label="Password"
                placeholder="Your password..."
                onChange={(e) => this.setState({password: e.nativeEvent.text})}
                value={this.state.password}
              />
              <Moleculs.Button
                disabled={this.props.auth.isLoading}
                style={{...{marginTop: 44}}}
                onPress={this.login}>
                Login
              </Moleculs.Button>
              {this.props.auth.status === true &&
                this.props.auth.isLoading === null && (
                  <Text
                    style={{
                      ...style.alert,
                      ...{color: color.COLOR_ON_SUCCESS},
                    }}>
                    Success
                  </Text>
                )}
              {this.props.auth.status === false &&
                this.props.auth.isLoading === null && (
                  <Text
                    style={{...style.alert, ...{color: color.COLOR_ON_ERROR}}}>
                    {this.state.msg}
                  </Text>
                )}
            </>
          )}
          {this.props.auth.isLoading && (
            <Spinner
              style={{...style.alert, ...{opacity: 0.6}}}
              isVisible={this.props.auth.isLoading}
              size={typography.FONT_SIZE_APP * 3}
              type={'ThreeBounce'}
              color={color.COLOR_UTILITIES_BACKGROUND}
            />
          )}
        </View>

        <View style={{...style.centerHorizontal}}>
          <Text style={style.notHaveAnAccount}>Not have an account?</Text>
          <Text
            style={style.ctaLabel}
            onPress={(e) => this.props.changePage('register')}>
            Register
          </Text>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    paddingVertical: utilities.BUTTON_PADDING_VERTICAL,
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
  },
  centerHorizontal: {
    alignItems: 'center',
  },
  notHaveAnAccount: {
    fontSize: typography.FONT_SIZE_SECONDARY,
    color: color.COLOR_GRAY,
  },
  ctaLabel: {
    fontSize: typography.FONT_SIZE_LABEL,
    color: color.COLOR_UTILITIES_BACKGROUND,
    fontWeight: 'bold',
  },
  labelForm: {
    fontSize: typography.FONT_SIZE_LABEL,
    color: color.COLOR_UTILITIES_BACKGROUND,
    textAlign: 'center',
    marginBottom: 44,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
