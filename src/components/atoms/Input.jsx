import React from 'react';
import {TextInput as Input, StyleSheet} from 'react-native';

import color from '../../styles/color';
import utilities from '../../styles/utilities';

const style = StyleSheet.create({
  style: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: color.COLOR_GRAY,
    paddingHorizontal: utilities.BUTTON_PADDING_HORIZONTAL,
  },
});

export default (props) => (
  <Input {...props} style={{...style.style, ...props.style}} />
);
