import React from 'react';
import {View, ScrollView, Text} from 'react-native';

import {connect} from 'react-redux';

import {getBook, reset, setPage} from '../../redux/actions/book';
import Book from '../../components/Book';
import color from '../../styles/color';

const mapStateToProps = (state) => ({
  book: state.book,
});

const mapDispatchToProps = {
  getBook,
  reset,
  setPage,
};

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],
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
  }

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
            {this.state.recent.map((val, index) => (
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
            ))}
          </View>
        </ScrollView>

        <View style={{...{marginBottom: 27}}} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
