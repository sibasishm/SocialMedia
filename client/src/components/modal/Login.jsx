import React from 'react';
import { Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal';

const Login = ({ openModal, closeModal }) => (
	<Modal closeIcon='close' open={true} onClose={closeModal}>
		<Modal.Header>Get, Set, Socialize!</Modal.Header>
		<Modal.Content>
			<Modal.Description>
				<p>Please select a log in method to get started.</p>
			</Modal.Description>
		</Modal.Content>
	</Modal>
);

export default connect(null, { openModal, closeModal })(Login);
