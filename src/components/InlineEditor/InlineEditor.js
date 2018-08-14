import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RIEInput } from '@attently/riek';

class InlineEditor extends Component {
  shouldComponentUpdate(nextProps) {
    const { value } = this.props;
    return nextProps.value !== value;
  }

  render() {
    return <RIEInput {...this.props} />;
  }
}

InlineEditor.propTypes = {
  value: PropTypes.string.isRequired,
};

export default InlineEditor;
