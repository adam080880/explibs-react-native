import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';

import moleculs from '../../../components/moleculs';

import utilities from '../../../styles/utilities';
import typography from '../../../styles/typography';
import color from '../../../styles/color';

import {findBook, reset, resetData, setPage} from '../../../redux/actions/book';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

const mapStateToProps = (state) => ({
  book: state.book,
  auth: state.auth,
});

const mapDispatchToProps = {
  findBook,
  reset,
  resetData,
  setPage,
};

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.route.params.book_id,
    };
  }

  componentDidMount() {
    this.props.reset();
    this.props.findBook(this.state.book_id);
  }

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
        {this.props.book.isLoading === false && (
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
                  alignItems: 'center',
                },
              }}>
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
              <Text style={{...{color: color.COLOR_GRAY, fontWeight: 'bold'}}}>
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
                  },
                }}>
                {this.props.book.book.status}
              </Text>
              <moleculs.Button
                disabled={this.props.book.book.status !== 'available'}
                style={{
                  ...{
                    paddingHorizontal: utilities.BUTTON_PADDING_HORIZONTAL,
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
