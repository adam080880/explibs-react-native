import React from 'react';
import {FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import atoms from '../../../components/atoms';
import Book from '../../../components/Book';
import typography from '../../../styles/typography';
import color from '../../../styles/color';

import {connect} from 'react-redux';
import {getBook, setPage, resetData} from '../../../redux/actions/book';

const mapStateToProps = (state) => ({
  book: state.book,
});

const mapDispatchToProps = {
  getBook,
  setPage,
  resetData,
};

class BrowseBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      search: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(
      {
        page: 1,
        search: '',
      },
      () => {
        this.props.setPage(1);
        this.props.resetData();
        this.getBook();
      },
    );
  }

  getBook = () => {
    if (this.state.page <= this.props.book.pageInfo.totalPage) {
      this.props.getBook({page: this.state.page, search: this.state.search});
    } else {
      return;
    }
  };

  nextPage = () => {
    this.setState(
      {
        page: this.props.book.pageInfo.page + 1,
      },
      () => {
        this.props.setPage(this.state.page + 1);
        this.getBook();
      },
    );
  };

  render() {
    return (
      <>
        <View style={{...{marginHorizontal: 27}}}>
          <Icon
            name="search1"
            size={typography.FONT_SIZE_APP}
            color={color.COLOR_GRAY}
            style={{...{position: 'absolute', top: 42, left: 15}}}
          />
          <atoms.TextInput
            onChangeText={(text) => {
              this.setState({
                search: text,
                page: 1,
              });
            }}
            onSubmitEditing={() => {
              this.props.setPage(1);
              this.props.resetData();
              this.props.getBook({
                search: this.state.search,
                page: this.state.page,
              });
            }}
            placeholder="Search here"
            value={this.state.search}
            style={{...{paddingLeft: 45, marginBottom: 12}}}
          />
        </View>

        <FlatList
          style={{...{marginHorizontal: 27}}}
          numColumns={2}
          data={Array.from(
            new Set(this.props.book.data.map((a) => a.id)),
          ).map((id) => this.props.book.data.find((a) => a.id === id))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                key={item.key}
                style={{
                  ...{
                    width: '100%',
                    borderRadius: 10,
                    marginTop: 10,
                    marginBottom: 10,
                    height: 242,
                    backgroundColor: 'gray',
                    flex: 0.5,
                    marginRight: index % 2 === 0 ? 3 : 0,
                    marginLeft: index % 2 === 1 ? 3 : 0,
                  },
                  ...this.props.styled.shadow,
                }}>
                <Book
                  key={item.id}
                  item={item}
                  styled={this.props.styled}
                  {...this.props}
                />
              </View>
            );
          }}
          onRefresh={() => {
            this.setState(
              {
                page: 1,
                search: '',
              },
              () => {
                this.props.resetData();
                this.props.setPage(1);
                this.getBook();
              },
            );
          }}
          refreshing={this.props.book.isLoading === true}
          onEndReached={this.nextPage}
          onEndReachedThreshold={0.5}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowseBook);
