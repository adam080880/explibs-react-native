import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import {connect} from 'react-redux';

import {getBook, reset, setPage, popular} from '../../redux/actions/book';
import {unfinished} from '../../redux/actions/transaction';
import Book from '../../components/Book';
import color from '../../styles/color';
import typography from '../../styles/typography';
import utilities from '../../styles/utilities';

const mapStateToProps = (state) => ({
  book: state.book,
  auth: state.auth,
});

const mapDispatchToProps = {
  getBook,
  reset,
  setPage,
  popular,
  unfinished,
};

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],
      popular: [],
      unfinished: [],
    };
  }

  componentDidMount() {
    this.props
      .getBook({page: 1, order_by: 'id', sort_by: 'desc'})
      .then((res) => {
        this.setState({
          recent: res.value.data.data,
        });
      });
    this.props.popular().then((res) => {
      this.setState({
        popular: res.value.data.data,
      });
    });
    if (Object.keys(this.props.auth.session).length > 0) {
      this.props.unfinished(this.props.auth.session.token).then((res) => {
        this.setState({
          unfinished: res.value.data.data,
        });
      });
    }
  }

  book = (val, index) => {
    return (
      <Book
        style={{
          ...{
            width: 152.5,
            borderRadius: 10,
            height: 242,
            backgroundColor: 'gray',
            flex: 0.5,
            marginRight: index === 3 ? 0 : 10,
          },
        }}
        key={val.id}
        item={val}
        styled={this.props.styled}
        {...this.props}
      />
    );
  };

  card = (val, index) => (
    <TouchableOpacity key={val.id} style={styled.card}>
      <View
        style={{
          ...{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          },
        }}>
        <View>
          <Text>Title: {val.title}</Text>
          <Text
            style={{
              ...{
                fontSize: typography.FONT_SIZE_SECONDARY,
                color: color.COLOR_GRAY,
              },
            }}>
            Last updated: {val.last_updated.slice(0, 10)}
          </Text>
        </View>
        <Text
          style={{
            ...styled.status,
            ...styled.booked,
          }}>
          {val.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView
        style={{
          ...{
            flex: 1,
            width: '100%',
            paddingHorizontal: 25,
          },
        }}>
        <Image
          source={require('../../assets/images/hello.png')}
          style={{
            ...{
              width: '100%',
              height: 120,
              borderRadius: 10,
              marginTop: 25,
            },
          }}
        />
        <View
          style={{...{justifyContent: 'space-between', flexDirection: 'row'}}}>
          <Text style={this.props.styled.label}>Popular Book</Text>
          <Text
            onPress={(e) => this.props.navigation.navigate('browse')}
            style={[
              this.props.styled.label,
              {color: color.COLOR_UTILITIES_BACKGROUND},
            ]}>
            More
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          decelerationRate="normal"
          style={{
            ...this.props.styled.container,
            ...{
              flex: 1,
              minWidth: '100%',
            },
          }}>
          <View
            style={{
              ...{
                flexDirection: 'row',
                flex: 1,
              },
            }}>
            {this.state.popular.map(this.book)}
          </View>
        </ScrollView>

        {Object.keys(this.props.auth.session).length > 0 &&
          this.state.unfinished.length > 0 && (
            <>
              <View
                style={{
                  ...{justifyContent: 'space-between', flexDirection: 'row'},
                }}>
                <Text style={this.props.styled.label}>
                  Unfinished Transactions
                </Text>
              </View>
              {this.state.unfinished.map(this.card)}
            </>
          )}

        <View
          style={{...{justifyContent: 'space-between', flexDirection: 'row'}}}>
          <Text style={this.props.styled.label}>Recent Book</Text>
          <Text
            onPress={(e) => this.props.navigation.navigate('browse')}
            style={[
              this.props.styled.label,
              {color: color.COLOR_UTILITIES_BACKGROUND},
            ]}>
            More
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          decelerationRate="normal"
          style={{
            ...this.props.styled.container,
            ...{
              flex: 1,
              minWidth: '100%',
            },
          }}>
          <View
            style={{
              ...{
                flexDirection: 'row',
                flex: 1,
              },
            }}>
            {this.state.recent.map(this.book)}
          </View>
        </ScrollView>

        <View style={{...{marginBottom: 27}}} />
      </ScrollView>
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
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: utilities.CONTAINER_CARD_PADDING_HORIZONTAL,
    paddingVertical: utilities.CONTAINER_CARD_PADDING_VERTICAL,
    alignItems: 'center',
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
  booked: {
    backgroundColor: 'red',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
