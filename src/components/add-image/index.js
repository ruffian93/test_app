import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'reactstrap';
import { moduleName } from '../../ducks/image';
import ErrorField from '../common/error-field';
import Loader from '../common/loader';
import ErrorMessage from './error-message';
import Message from './message';

import './style.css';

class AddImage extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    loading: PropTypes.bool
  }

  render() {
    const {loading} = this.props;
    return (
      <form className="form-add-image" onSubmit={this.props.handleSubmit}>
        <Field name="url"
               component={ErrorField}
               label="Please enter URL to image"
               type="text"
               id="url"
               className="form-control"
               placeholder="url"
               autofocus
        />
        <Button color="primary" className="mt-2 mr-4" type="submit">Add image</Button>
        {loading && <Loader />}
        <ErrorMessage />
        <Message />
      </form>
    )
  }
}

const validate = ({url}) => {
  const errors = {};

  if (!url || url.length < 10) errors.url = 'to short';

  return errors;
}

export default connect(state => ({
  loading: state[moduleName].loading
}))(reduxForm({
  form: 'add-image',
  validate
})(AddImage));
