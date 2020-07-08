import React from 'react';
import {TextInput as Input, StyleSheet, Text} from 'react-native';

import color from '../../styles/color';
import typography from '../../styles/typography';
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
  <>
    <Text
      style={{
        ...{
          marginBottom: 7,
          fontSize: typography.FONT_SIZE_LABEL,
          color: color.COLOR_FONT_PLAIN,
        },
      }}>
      {props.label}
    </Text>
    <Input {...props} style={{...style.style, ...props.style}} />
  </>
);
