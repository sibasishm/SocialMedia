import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';
import { SimpleSelect } from '../input/SimpleSelect';

import { phoneNumber, minLength20 } from '../../utils/formValidators';
import { hobbies } from '../../utils/topics';

const About = ({ pristine, submitting, handleSubmit, updateProfile }) => (
  <Segment>
    <Header dividing size="large" content="About me" />
    <Header size="tiny" content="Complete your profile to get the most out of this site." />
    <Form onSubmit={handleSubmit(updateProfile)}>
      <Field
        name="hobbies"
        component={SimpleSelect}
        multiple
        placeholder="Your hobbies"
        options={hobbies}
      />
      <label>Tell us what makes you one in a million</label>
      <Field
        name="bio"
        component={TextArea}
        placeholder="About me"
        rows={3}
        validate={minLength20}
      />
      <Header size="medium" content="Contact information" color="teal" />
      <Field
        name="phone"
        type="text"
        component={SimpleInput}
        placeholder="Your phone number"
        icon="phone"
        validate={phoneNumber}
      />
      <Field
        name="website"
        type="text"
        component={SimpleInput}
        placeholder="Your website"
        icon="globe"
      />
      {/* Will find a way to give options */}
      {/* <Header size='medium' content='Favourites' color='teal' />
			<Field
				name='tvShow'
				component={SimpleSelect}
				multiple
				placeholder='TV shows'
				options={hobbies}
			/> */}
      <Header size="medium" content="Social presence" color="teal" />
      <Field
        name="facebook"
        type="text"
        component={SimpleInput}
        placeholder="Facebook username"
        icon="facebook"
      />
      <Field
        name="twitter"
        type="text"
        component={SimpleInput}
        placeholder="Twitter username"
        icon="twitter"
      />
      <Field
        name="instagram"
        type="text"
        component={SimpleInput}
        placeholder="Instagram username"
        icon="instagram"
      />
      <Field
        name="youtube"
        type="text"
        component={SimpleInput}
        placeholder="Youtube username"
        icon="youtube"
      />
      <Field
        name="linkedin"
        type="text"
        component={SimpleInput}
        placeholder="LinkedIn username"
        icon="linkedin"
      />
      <Button disabled={pristine || submitting} size="large" positive content="Update" />
    </Form>
  </Segment>
);

export default reduxForm({ form: 'userAbout', enableReinitialize: true })(About);
