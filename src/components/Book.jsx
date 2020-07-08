import React from 'react';
import {TouchableOpacity, Image} from 'react-native';

export default (props) => (
  <TouchableOpacity
    onPress={(e) =>
      props.navigation.navigate('detail', {
        book_id: props.item.id,
      })
    }>
    <Image
      source={{
        uri: props.item.image,
      }}
      resizeMode={'cover'}
      style={{
        ...{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          borderRadius: 10,
          marginBottom: 10,
        },
        ...props.style,
      }}
    />
  </TouchableOpacity>
);
