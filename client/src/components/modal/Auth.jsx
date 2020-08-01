import React from 'react';
import { Modal, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import RegisterForm from '../auth/Register';
import LoginForm from '../auth/Login';

const panes = [
  {
    menuItem: 'Sign In',
    render: () => (
      <Tab.Pane attached={false}>
        <LoginForm />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Sign Up',
    render: () => (
      <Tab.Pane attached={false}>
        <RegisterForm />
      </Tab.Pane>
    )
  }
];

const Auth = ({ closeModal }) => (
  <Modal size="mini" open={true} onClose={closeModal}>
    <Modal.Header>Get, Set, Socialize!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Tab menu={{ secondary: true, pointing: false }} panes={panes} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default connect(null, { closeModal })(Auth);
