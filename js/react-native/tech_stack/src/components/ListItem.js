// single list row
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text, 
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {

  componentWillUpdate() {
    // 
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { lib, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text>{lib.description}</Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.lib;

    return (
      <TouchableWithoutFeedback 
        onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  }
};

// map reducer
// -> ownProps = this.props 
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.lib.id;

  return { expanded };
};

// 1st arg - map state to props
// 2nd arg - actions wire up
export default connect(mapStateToProps, actions)(ListItem);