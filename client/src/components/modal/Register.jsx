import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import RegisterForm from '../auth/Register';

const Register = ({ closeModal }) => (
	<Modal size='mini' open={true} onClose={closeModal}>
		<Modal.Header>Get started now</Modal.Header>
		<Modal.Content>
			<Modal.Description>
				<RegisterForm />
			</Modal.Description>
		</Modal.Content>
	</Modal>
);

export default connect(null, { closeModal })(Register);
