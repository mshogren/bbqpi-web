import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RIEInput } from '@attently/riek';

class InlineEditor extends Component {
  shouldComponentUpdate(nextProps) {
    const { value } = this.props;
    return nextProps.value !== value;
  }

  render() {
    const { propName, value, change } = this.props;

    return <RIEInput propName={propName} value={value} change={change} />;
  }
}

InlineEditor.propTypes = {
  propName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default InlineEditor;
