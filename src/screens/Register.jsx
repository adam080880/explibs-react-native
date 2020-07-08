import React from 'react';
import {connect} from 'react-redux';
import Moleculs from '../components/moleculs/index';
import Atoms from '../components/atoms/index';
import {View, Text, StyleSheet, Image} from 'react-native';

import utilities from '../styles/utilities';
import typography from '../styles/typography';
import color from '../styles/color';

import {
  resetLoading,
  register,
  resetMsg,
  resetStatus,
} from '../redux/actions/auth';
import Spinner from 'react-native-spinkit';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  register,
  resetLoading,
  resetMsg,
  resetStatus,
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      cpassword: '',
      msg: '',
    };
  }

  componentDidMount() {
    this.props.resetLoading(null);
    this.props.resetMsg();
    this.props.resetStatus(false);
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      msg: '',
    });
  }

  register = () => {
    const {email, password, cpassword} = this.state;

    if (password === cpassword) {
      this.props.register({email, password});
    } else {
      this.props.resetStatus(false);
      this.props.resetLoading(null);
      this.setState({
        msg: 'Password is not match',
      });
    }
  };

  componentDidUpdate() {
    if (
      this.props.auth.isLoading === false &&
      this.props.auth.status === true
    ) {
      this.props.resetMsg();
      this.props.resetLoading();
      this.props.changePage('login');
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
              <Text style={style.labelForm}>Sign up to your account</Text>
              <Atoms.TextInput
                label="Email"
                style={{...{marginBottom: 19}}}
                onChange={(e) =>
                  this.setState({
                    email: e.nativeEvent.text,
                  })
                }
                placeholder="Your email..."
              />
              <Atoms.TextInput
                secureTextEntry={true}
                label="Password"
                placeholder="Your password..."
                onChange={(e) =>
                  this.setState({
                    password: e.nativeEvent.text,
                  })
                }
                style={{...{marginBottom: 19}}}
              />
              <Atoms.TextInput
                secureTextEntry={true}
                label="Confirm Password"
                placeholder="Confirm your password..."
                onChange={(e) =>
                  this.setState({
                    cpassword: e.nativeEvent.text,
                  })
                }
              />
              <Moleculs.Button
                style={{...{marginTop: 44}}}
                onPress={this.register}>
                Register
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
          <Text style={{...style.notHaveAnAccount}}>
            Already have an account?
          </Text>
          <Text
            style={style.ctaLabel}
            onPress={(e) => this.props.changePage('login')}>
            Login
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

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
