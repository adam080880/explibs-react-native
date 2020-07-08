import React from 'react';
import {ScrollView, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moleculs from '../../../../components/moleculs';
import typography from '../../../../styles/typography';
import color from '../../../../styles/color';
import {booking, resetLoading} from '../../../../redux/actions/transaction';
import {findBook} from '../../../../redux/actions/book';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  auth: state.auth,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  booking,
  resetLoading,
  findBook,
};

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      date: false,
      book_id: this.props.route.params.book_id,
    };
  }

  componentDidMount() {
    this.props.transaction.resetLoading();
  }

  toggleIsOpen = (e) => {
    this.setState({
      isOpen: true,
      date: this.state.date ? this.state.date : new Date(),
    });
  };

  booking = (e) => {
    this.props.booking(
      this.state.book_id,
      this.state.date.toISOString().slice(0, 10),
      this.props.auth.session.token,
    );
  };

  componentDidUpdate() {
    if (
      this.props.transaction.isLoading === false &&
      this.props.transaction.status
    ) {
      this.props.resetLoading();
      this.props.findBook(this.state.book_id);
      this.props.navigation.goBack();
    } else if (
      this.props.transaction.isLoading === false &&
      this.props.transaction.status === false
    ) {
      this.props.resetLoading();
    }
  }

  render() {
    return (
      <ScrollView style={{...{flex: 1, paddingHorizontal: 27}}}>
        <Text style={this.props.styled.label}>Booking</Text>
        <Text
          style={{
            ...{
              fontSize: typography.FONT_SIZE_LABEL,
              color: color.COLOR_UTILITIES_BACKGROUND,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 10,
            },
          }}
          onPress={this.toggleIsOpen}>
          {this.state.date
            ? this.state.date.toISOString().slice(0, 10)
            : 'Choose a date'}
        </Text>
        <moleculs.Button
          disabled={this.props.transaction.isLoading === true}
          style={{...{marginTop: 10}}}
          onPress={this.booking}>
          Confirm
        </moleculs.Button>
        {this.props.transaction.isLoading === false && (
          <Text
            style={{
              ...{
                textAlign: 'center',
                marginTop: 10,
                fontSize: typography.FONT_SIZE_SECONDARY,
                color:
                  this.props.transaction.status === true
                    ? color.COLOR_ON_SUCCESS
                    : color.COLOR_ON_ERROR,
                fontWeight: 'bold',
              },
            }}>
            {this.props.transaction.status
              ? 'Success'
              : this.props.transaction.msg}
          </Text>
        )}
        {this.state.isOpen && (
          <DateTimePicker
            value={this.state.date}
            mode={'date'}
            display={'calendar'}
            onChange={(e, selectedDate) => {
              const current = selectedDate || this.state.date;
              this.setState({
                date: current,
                isOpen: false,
              });
            }}
          />
        )}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
