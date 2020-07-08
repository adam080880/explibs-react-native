import React from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  profile,
  resetLoading,
  confirmRegistration,
  resetMsg,
  logout,
  resetStatus,
} from '../../redux/actions/auth';

import DateTimePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-spinkit';
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import atoms from '../../components/atoms';
import typography from '../../styles/typography';
import color from '../../styles/color';
import utilities from '../../styles/utilities';
import moleculs from '../../components/moleculs';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  profile,
  resetLoading,
  confirmRegistration,
  logout,
  resetMsg,
  resetStatus,
};

const radioParam = [
  {
    label: 'Male',
    value: 'm',
  },
  {
    label: 'Female',
    value: 'f',
  },
];

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      phone: '',
      gender: '',
      birthDate: '',
      datePicker: false,
      not: false,
    };
  }

  componentDidMount() {
    this.props.profile(this.props.auth.session.token).then((res) => {
      const bioInit = res.value.data.data.bio === null;
      this.setState({
        email: res.value.data.data.email,
        name: !bioInit ? res.value.data.data.bio.name : '',
        birthDate: !bioInit
          ? new Date(res.value.data.data.bio.birthdate)
          : false,
        phone: !bioInit ? res.value.data.data.bio.phone : '',
        gender: !bioInit
          ? res.value.data.data.bio.gender.length > 0
            ? 'm'
            : 'f'
          : '',
        not: bioInit,
      });
    });
  }

  submit = (e) => {
    const {name, phone, gender, birthDate: birthdate} = this.state;
    const res = birthdate.toJSON().slice(0, 10);
    this.props
      .confirmRegistration(
        {name, phone, gender, birthdate: res},
        this.props.auth.session.token,
      )
      .then(() => {
        this.props.logout();
        this.props.changePage('login');
      });
  };

  render() {
    return (
      <>
        {this.props.auth.isLoading && (
          <View
            style={{
              ...{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <Spinner
              style={{
                ...style.alert,
                ...{opacity: 0.6},
              }}
              isVisible={this.props.auth.isLoading}
              size={typography.FONT_SIZE_APP * 3}
              type={'ThreeBounce'}
              color={color.COLOR_UTILITIES_BACKGROUND}
            />
          </View>
        )}
        {this.props.auth.isLoading === null && (
          <>
            <SafeAreaView
              style={{
                ...{
                  paddingHorizontal: 27,
                  flex: 1,
                  height: '100%',
                },
              }}>
              <ScrollView style={{...{flex: 1}}}>
                <Text style={this.props.styled.label}>Profile</Text>
                <View>
                  <atoms.TextInput
                    label="Email"
                    defaultValue={this.state.email}
                    style={{...{marginBottom: 20}}}
                    placeholder="Your email"
                  />
                  <atoms.TextInput
                    label="Name"
                    onChange={(e) => this.setState({name: e.nativeEvent.text})}
                    style={{...{marginBottom: 20}}}
                    defaultValue={this.state.name}
                    placeholder="Your name"
                  />
                  <atoms.TextInput
                    label="Phone"
                    onChange={(e) => this.setState({phone: e.nativeEvent.text})}
                    style={{...{marginBottom: 20}}}
                    defaultValue={this.state.phone}
                    placeholder="Your phone"
                  />
                  <View style={{...{marginBottom: 20}}}>
                    <Text
                      style={{
                        ...{
                          fontSize: typography.FONT_SIZE_LABEL,
                          marginBottom: 7,
                        },
                      }}>
                      Gender
                    </Text>
                    {radioParam.map((obj, i) => {
                      return (
                        <RadioButton labelHorizontal={true} key={i}>
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={
                              this.state.gender.length > 0 &&
                              this.state.gender === obj.value
                            }
                            onPress={(value) => this.setState({gender: value})}
                            borderWidth={1}
                            buttonOuterColor={color.COLOR_GRAY}
                            buttonInnerColor={color.COLOR_UTILITIES_BACKGROUND}
                            buttonSize={typography.FONT_SIZE_LABEL - 4}
                            buttonOuterSize={typography.FONT_SIZE_LABEL + 4}
                          />
                          <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            onPress={(value) => this.setState({gender: value})}
                            labelStyle={{
                              fontSize: typography.FONT_SIZE_LABEL,
                              color: color.COLOR_FONT_PLAIN,
                            }}
                          />
                        </RadioButton>
                      );
                    })}
                  </View>
                </View>
                <View style={{...{marginBottom: 20}}}>
                  <Text
                    style={{
                      ...{
                        fontSize: typography.FONT_SIZE_LABEL,
                        marginBottom: 7,
                      },
                    }}>
                    Birthdate
                  </Text>
                  <moleculs.Button
                    disabled={!this.state.not}
                    style={{...{opacity: 0.8}}}
                    onPress={(e) =>
                      this.setState({
                        datePicker: !this.state.datePicker,
                        birthDate: new Date(),
                      })
                    }>
                    {this.state.birthDate
                      ? new Date(this.state.birthDate).toDateString()
                      : 'Choose a date'}
                  </moleculs.Button>
                  {this.state.datePicker && (
                    <DateTimePicker
                      value={this.state.birthDate}
                      mode={'date'}
                      display={'calendar'}
                      onChange={(e, selectedDate) => {
                        const current = selectedDate || this.state.birthDate;
                        this.setState({
                          birthDate: current,
                          datePicker: false,
                        });
                      }}
                    />
                  )}
                </View>
                {this.state.not && (
                  <moleculs.Button
                    onPress={this.submit}
                    style={{...{marginBottom: 20}}}>
                    Submit
                  </moleculs.Button>
                )}
              </ScrollView>
            </SafeAreaView>
          </>
        )}
      </>
    );
  }
}

const style = StyleSheet.create({
  alert: {
    paddingVertical: utilities.BUTTON_PADDING_VERTICAL,
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
