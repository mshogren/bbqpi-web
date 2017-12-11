import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RIEInput } from 'riek';

class InlineEditor extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <RIEInput {...this.props} />;
  }
}

InlineEditor.propTypes = {
  value: PropTypes.string.isRequired,
};

export default InlineEditor;
