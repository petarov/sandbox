// app header component

import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerTitle}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2
  }
};

export { Header };