import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import LoginForm from '../auth/Login';

const Login = ({ closeModal }) => (
  <Modal size="mini" open={true} onClose={closeModal}>
    <Modal.Header>Welcome back!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <LoginForm />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default connect(null, { closeModal })(Login);
