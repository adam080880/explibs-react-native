import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import color from '../../styles/color';

const style = StyleSheet.create({
  main: {
    backgroundColor: color.COLOR_UTILITIES_BACKGROUND,
    height: 42,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default (props) => {
  return (
    <TouchableOpacity {...props} style={{...style.main, ...props.style}}>
      {props.children}
    </TouchableOpacity>
  );
};
