import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

class Image extends Component {
  static propTypes = {
    list: PropTypes.object
  }

  render() {
    const {list: {image, tags}} = this.props;
    return (
      <div className="row image-wrp my-4">
        <div className="col col-5 text-right">
          <img src={image} />
        </div>
        <div className="col col-7">
          <code className="border rounded p-1">{JSON.stringify(tags)}</code>
        </div>
      </div>
    )
  }
}

export default Image;
