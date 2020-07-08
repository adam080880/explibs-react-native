import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import utilities from '../../styles/utilities';
import typography from '../../styles/typography';
import {connect} from 'react-redux';
import {
  getMemberTransaction,
  resetLoading,
  setPage,
  resetData,
} from '../../redux/actions/transaction';
import color from '../../styles/color';

const mapStateToProps = (state) => ({
  auth: state.auth,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  getMemberTransaction,
  resetLoading,
  setPage,
  resetData,
};

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      search: '',
    };
  }

  componentDidMount() {
    this.props.resetLoading();
    this.props.getMemberTransaction(
      {
        page: 1,
        search: '',
      },
      this.props.auth.session.token,
    );
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(
      {
        page: 1,
        search: '',
      },
      () => {
        this.props.resetData();
        this.props.setPage(1);
        this.getHistory();
      },
    );
  }

  getHistory = () => {
    if (this.state.page <= this.props.transaction.pageInfo.totalPage) {
      this.props.getMemberTransaction(
        {
          page: this.state.page,
          search: this.state.search,
        },
        this.props.auth.session.token,
      );
    } else {
      return;
    }
  };

  nextPage = () => {
    this.setState(
      {
        page: this.props.transaction.pageInfo.page + 1,
      },
      () => {
        this.props.setPage(this.state.page + 1);
        this.getHistory();
      },
    );
  };

  card = (val, index) => (
    <TouchableOpacity key={val.key} style={styled.card}>
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
          <Text>Title: {val.book_title}</Text>
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
            ...(val.status === 'returned' ? styled.avail : styled.booked),
          }}>
          {val.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View
        style={{
          ...{
            flex: 1,
            width: '100%',
            paddingHorizontal: 25,
          },
        }}>
        <Text style={this.props.styled.label}>Recent Transaction</Text>
        <FlatList
          data={Array.from(
            new Set(this.props.transaction.data.map((a) => a.id)),
          ).map((id) => this.props.transaction.data.find((a) => a.id === id))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => this.card(item, index)}
          onRefresh={this.getHistory}
          refreshing={this.props.transaction.isLoading === true}
          onEndReached={this.nextPage}
          onEndReachedThreshold={0.5}
        />
        <View style={{...{marginBottom: 27}}} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);

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
  avail: {
    backgroundColor: 'green',
  },
  booked: {
    backgroundColor: 'red',
  },
});
