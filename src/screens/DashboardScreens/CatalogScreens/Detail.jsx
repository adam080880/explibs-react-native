import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';

import moleculs from '../../../components/moleculs';

import utilities from '../../../styles/utilities';
import typography from '../../../styles/typography';
import color from '../../../styles/color';

import {
  findBook,
  reset,
  resetData,
  setPage,
  review,
} from '../../../redux/actions/book';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Star from 'react-native-stars';
import Input from '../../../components/atoms/Input';
import Button from '../../../components/moleculs/Button';

const mapStateToProps = (state) => ({
  book: state.book,
  auth: state.auth,
});

const mapDispatchToProps = {
  findBook,
  reset,
  resetData,
  setPage,
  review,
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.route.params.book_id,
      review: '',
      star: 3,
    };
  }

  componentDidMount() {
    this.props.reset(true);
    this.props.resetData();
    this.props.findBook(this.state.book_id);
    this.props.reset(false);
  }

  review = (e) => {
    this.props.reset(true);
    this.props
      .review(
        {review: this.state.review, stars: this.state.star * 2},
        this.state.book_id,
        this.props.auth.session.token,
      )
      .then((res) => {
        this.props.findBook(this.state.book_id);
      })
      .finally(() => {
        this.props.reset(false);
      });
  };

  render() {
    return (
      <>
        {this.props.book.isLoading === true && (
          <View
            style={{
              ...{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}>
            <Spinner
              style={{...styled.alert, ...{opacity: 0.6}}}
              isVisible={this.props.book.isLoading}
              size={typography.FONT_SIZE_APP * 3}
              type={'ThreeBounce'}
              color={color.COLOR_UTILITIES_BACKGROUND}
            />
          </View>
        )}
        {this.props.book.isLoading === false &&
          Object.keys(this.props.book.book).length > 0 && (
            <ScrollView style={{...{flex: 1}}}>
              <Image
                resizeMode={'cover'}
                source={{
                  uri: this.props.book.book.image,
                }}
                style={{...{width: '100%', height: 200, opacity: 0.8}}}
              />
              <View
                style={{
                  ...{
                    marginTop: -130,
                  },
                }}>
                <View style={{...{alignItems: 'center'}}}>
                  <Image
                    resizeMode={'cover'}
                    style={styled.card}
                    source={{
                      uri: this.props.book.book.image,
                    }}
                  />
                  <Text
                    style={{
                      ...{
                        marginVertical: 5,
                        fontWeight: 'bold',
                        fontSize: typography.FONT_SIZE_APP,
                      },
                    }}>
                    {this.props.book.book.title}
                  </Text>
                  <Text
                    style={{...{color: color.COLOR_GRAY, fontWeight: 'bold'}}}>
                    {this.props.book.book.author}
                  </Text>
                  <Text
                    style={{
                      ...{
                        color:
                          this.props.book.book.status === 'available'
                            ? color.COLOR_ON_SUCCESS
                            : color.COLOR_ON_ERROR,
                        fontWeight: 'bold',
                        marginBottom: 8,
                      },
                    }}>
                    {this.props.book.book.status}
                  </Text>
                  {Object.keys(this.props.book.book).length > 0}
                  <Star
                    display={this.props.book.book.score.average / 2}
                    count={5}
                    spacing={2}
                    starSize={15}
                  />
                  {Object.keys(this.props.auth.session).length > 0 && (
                    <moleculs.Button
                      disabled={this.props.book.book.status !== 'available'}
                      style={{
                        ...{
                          paddingHorizontal:
                            utilities.BUTTON_PADDING_HORIZONTAL,
                          paddingVertical: utilities.BUTTON_PADDING_VERTICAL,
                          marginTop: 15,
                        },
                      }}
                      onPress={(e) =>
                        this.props.navigation.navigate('booking', {
                          book_id: this.state.book_id,
                        })
                      }>
                      Booking
                    </moleculs.Button>
                  )}
                  <Text
                    style={{
                      ...{
                        textAlign: 'center',
                        paddingVertical: 15,
                        paddingHorizontal: 22,
                        marginBottom: 45,
                      },
                    }}>
                    {this.props.book.book.description}
                  </Text>
                </View>
                <View style={{...{paddingHorizontal: 27}}}>
                  <Text
                    style={{
                      ...{
                        fontWeight: 'bold',
                        fontSize: typography.FONT_SIZE_LABEL,
                        marginBottom: 25,
                      },
                    }}>
                    Reviews
                  </Text>
                  {Object.keys(this.props.auth.session).length > 0 && (
                    <View
                      style={{
                        ...{
                          marginBottom: 25,
                          alignItems: 'flex-start',
                          width: '100%',
                        },
                      }}>
                      <Input
                        onChangeText={(val) =>
                          this.setState({
                            review: val,
                          })
                        }
                        placeholder={'Your review...'}
                        style={{...{width: '100%', marginBottom: 10}}}
                      />
                      <View
                        style={{
                          ...{
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                          },
                        }}>
                        <Star
                          update={(val) => this.setState({star: val})}
                          default={3}
                          count={5}
                          starSize={25}
                          spacing={3}
                          half={true}
                        />
                        <Button
                          onPress={this.review}
                          style={{...{paddingHorizontal: 20}}}>
                          Submit
                        </Button>
                      </View>
                    </View>
                  )}
                  {this.props.book.book.newReviews.map((val, index) => {
                    return (
                      <View key={index} style={{...{flexDirection: 'row'}}}>
                        <View
                          style={{
                            ...{
                              flexDirection: 'column',
                              alignItems: 'center',
                            },
                          }}>
                          <Image
                            resizeMode={'cover'}
                            style={{
                              ...{
                                width: 45,
                                height: 45,
                                borderRadius: 20,
                                marginBottom: 10,
                              },
                            }}
                            source={
                              val.profile === null
                                ? require('../../../assets/images/humann.png')
                                : {uri: val.profile}
                            }
                          />
                          <Star
                            starSize={8}
                            spacing={1}
                            display={val.stars / 2}
                            count={5}
                          />
                        </View>
                        <View
                          style={{
                            ...{flex: 1, paddingLeft: 15, marginBottom: 20},
                          }}>
                          <Text style={{...{fontWeight: 'bold'}}}>
                            {val.name}
                          </Text>
                          <Text
                            style={{
                              ...{
                                color: color.COLOR_FONT_PLAIN,
                                marginBottom: 10,
                              },
                            }}>
                            {val.reviews}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </ScrollView>
          )}
      </>
    );
  }
}

const styled = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: 150.42,
    height: 241.01,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: utilities.CONTAINER_CARD_PADDING_HORIZONTAL,
    paddingVertical: utilities.CONTAINER_CARD_PADDING_VERTICAL,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
    paddingVertical: utilities.BUTTON_PADDING_VERTICAL,
    borderRadius: 4,
    width: '100%',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
