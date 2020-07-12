import React from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {
  profile,
  resetLoading,
  confirmRegistration,
  resetMsg,
  logout,
  resetStatus,
  editProfile,
} from '../../redux/actions/auth';

import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-picker';
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
  editProfile,
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
      isLoading: false,
      file: false,
      fileUri: false,
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
        fileUri: !bioInit ? res.value.data.data.bio.profile : false,
      });
    });
  }

  click = (e) => {
    ImagePicker.showImagePicker(
      {
        title: 'Edit Profile Image',
        storageOptions: {
          skipBackup: true,
          path: '../../../assets/uploads/profile',
        },
      },
      (response) => {
        if (response.didCancel) {
          this.setState({
            file: false,
          });
        } else if (response.error) {
          console.log(response.error);
          this.setState({
            file: false,
          });
        } else {
          this.setState({
            file: response,
            fileUri: response.uri,
          });
        }
      },
    );
  };

  submit = (e) => {
    const {name, phone, gender, birthDate: birthdate} = this.state;
    const birth = birthdate.toJSON().slice(0, 10);
    this.setState({
      isLoading: true,
    });
    if (this.props.auth.session.name === null) {
      this.props
        .confirmRegistration(
          {name, phone, gender, birthdate: birth},
          this.props.auth.session.token,
        )
        .then(() => {
          this.props.logout();
          this.props.changePage('login');
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    } else {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append(
        'birthdate',
        new Date(this.state.birthDate).toISOString().slice(0, 10),
      );
      if (this.state.file) {
        formData.append('image', {
          name: this.state.file.fileName,
          type: this.state.file.type,
          uri:
            Platform.OS === 'android'
              ? this.state.file.uri
              : this.state.file.uri.replace('file://', ''),
        });
      }
      this.props
        .editProfile(formData, this.props.auth.session.token)
        .then(() => {
          this.props.profile(this.props.auth.session.token).then((res2) => {
            this.setState({
              email: res2.value.data.data.email,
              name: res2.value.data.data.bio.name,
              birthDate: new Date(res2.value.data.data.bio.birthdate),
              phone: res2.value.data.data.bio.phone,
              gender: res2.value.data.data.bio.gender.length > 0 ? 'm' : 'f',
              fileUri: res2.value.data.data.bio.profile,
            });
          });
        })
        .catch((rej) => {
          console.log(rej);
        })
        .finally(() => {
          this.setState({
            isLoading: false,
          });
        });
    }
  };

  render() {
    return (
      <>
        {(this.props.auth.isLoading || this.state.isLoading) && (
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
              isVisible={this.props.auth.isLoading || this.state.isLoading}
              size={typography.FONT_SIZE_APP * 3}
              type={'ThreeBounce'}
              color={color.COLOR_UTILITIES_BACKGROUND}
            />
          </View>
        )}
        {(this.props.auth.isLoading === null || !this.state.isLoading) && (
          <>
            <SafeAreaView
              style={{
                ...{
                  flex: 1,
                  height: '100%',
                },
              }}>
              <ScrollView style={{...{flex: 1, paddingHorizontal: 27}}}>
                <Text style={this.props.styled.label}>Profile</Text>
                <View
                  style={{
                    ...{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 25,
                    },
                  }}>
                  {this.props.auth.session.name !== null && (
                    <Image
                      resizeMode={'cover'}
                      source={
                        !this.state.fileUri
                          ? require('../../assets/images/humann.png')
                          : {uri: this.state.fileUri}
                      }
                      style={{
                        ...{
                          height: 150,
                          width: 150,
                          borderRadius: 150 / 2,
                        },
                      }}
                    />
                  )}
                  <Text
                    onPress={this.click}
                    style={{
                      ...{
                        color: color.COLOR_UTILITIES_BACKGROUND,
                        fontWeight: 'bold',
                        marginTop: 18,
                      },
                    }}>
                    Edit Profile
                  </Text>
                </View>
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
                    style={{...{opacity: 0.9}}}
                    onPress={(e) =>
                      this.setState({
                        datePicker: !this.state.datePicker,
                        birthDate:
                          (this.state.birthDate &&
                            new Date(this.state.birthDate)) ||
                          new Date(),
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
                <moleculs.Button
                  onPress={this.submit}
                  style={{...{marginBottom: 20}}}>
                  Submit
                </moleculs.Button>
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
