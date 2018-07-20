import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {moduleName} from '../../ducks/image';

class ErrorMessage extends Component {
  static propTypes = {
    error: PropTypes.object
  }

  render() {
    const { error } = this.props;
    if (!error) {
      return null;
    }
    return (
      <div>
        error... try another url
      </div>
    );
  }
}

export default connect(state => ({
  error: state[moduleName].error
}))(ErrorMessage);