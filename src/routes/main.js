import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addImage } from '../ducks/image';
import AddImage from '../components/add-image';
import ListImage from '../components/list';

class MainPage extends Component {
  render() {
    return (
      <div className="container">
        <AddImage onSubmit={this.addImage} />
        <ListImage />
      </div>
    )
  }

  addImage = ({url}) => this.props.addImage(url)
}

export default connect(null, { addImage })(MainPage);
