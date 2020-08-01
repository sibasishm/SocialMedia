import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { variations } from './variations';

const ModalManager = ({ modal: { open, modal } }) => {
  let renderedModal;

  if (open) {
    const { type, props } = modal;
    const ModalComponent = variations[type];

    renderedModal = <ModalComponent {...props} />;
  }

  return <Fragment>{renderedModal}</Fragment>;
};

ModalManager.propTypes = {
  modal: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  modal: state.modal
});

export default connect(mapStateToProps)(ModalManager);
