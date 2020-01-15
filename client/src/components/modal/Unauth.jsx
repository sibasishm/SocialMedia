import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal';

const Unauth = ({ openModal, closeModal, history }) => {
	const handleCloseModal = () => {
		history.goBack();
		closeModal();
	};
	return (
		<Modal size='mini' open={true} onClose={handleCloseModal}>
			<Modal.Header>You need to be authenticated!</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<p>Please either sign in or register to access this page</p>
					<Button.Group widths={4}>
						<Button
							fluid
							color='teal'
							onClick={() => openModal('Login')}
						>
							Sign in
						</Button>
						<Button.Or />
						<Button
							fluid
							positive
							onClick={() => openModal('Register')}
						>
							Register
						</Button>
					</Button.Group>
					<Divider />
					<div style={{ textAlign: 'center' }}>
						<p>Or click cancel to continue as a guest</p>
						<Button onClick={handleCloseModal}>Cancel</Button>
					</div>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
};

export default withRouter(connect(null, { openModal, closeModal })(Unauth));
