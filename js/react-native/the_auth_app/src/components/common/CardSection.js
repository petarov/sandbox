// abstract card with styles

import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  const { containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    backgroundColor: 'white',
    
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
}

export { CardSection };
