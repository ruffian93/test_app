import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {moduleName} from '../../ducks/image';

class Message extends Component {
  static propTypes = {
    message: PropTypes.string
  }

  render() {
    const { message } = this.props;
    if (!message) {
      return null;
    }
    return (
      <div>
        {message}
      </div>
    );
  }
}

export default connect(state => ({
  message: state[moduleName].message
}))(Message);