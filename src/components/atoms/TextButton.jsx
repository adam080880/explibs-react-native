import React from 'react';
import {Text, StyleSheet} from 'react-native';
import color from '../../styles/color';
import typography from '../../styles/typography';

const {COLOR_UTILITIES_TEXT} = color;
const {FONT_SIZE_LABEL} = typography;

const style = StyleSheet.create({
  font: {
    color: COLOR_UTILITIES_TEXT,
    fontSize: FONT_SIZE_LABEL,
    fontWeight: 'bold',
  },
});

export default (props) => <Text style={style.font}>{props.children}</Text>;
