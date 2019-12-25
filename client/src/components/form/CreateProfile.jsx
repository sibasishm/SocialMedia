import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createProfile } from '../../actions/profile';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';
import { SimpleSelect } from '../input/SimpleSelect';

const CreateProfile = ({ createProfile, formData, history }) => {
	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
	};

	return (
		<form className='form' onSubmit={e => onSubmit(e)}>
			<Field
				name='name'
				type='text'
				component={SimpleInput}
				label='Name'
			/>
			<Field
				name='email'
				type='description'
				rows={3}
				component={TextArea}
				label='Email'
			/>
			<Field
				name='gender'
				options={['Male', 'Female', 'None']}
				component={SimpleSelect}
				label='Gender'
				placeholder='Select a gender'
			/>
			<input type='submit' value='Login' className='btn btn-primary' />
		</form>
	);
};

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	formData: PropTypes.object
};

const mapStateToProps = state => ({
	formData: state.form.createProfile && state.form.createProfile.values
});

export default connect(mapStateToProps, { createProfile })(
	reduxForm({ form: 'createProfile' })(withRouter(CreateProfile))
);
