import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {imageListSelectorReverse} from '../../ducks/image';
import Image from '../image';

import './style.css';

class ListImage extends Component {
  static propTypes = {
    list: PropTypes.array
  }

  render() {
    return this.props.list.map(value => <Image key={value.uid} list={value} />);
  }
}

export default connect(state => ({
  list: imageListSelectorReverse(state)
}))(ListImage);
