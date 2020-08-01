import React from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';

const Account = ({ pristine, submitting, handleSubmit, updateUserData }) => (
  <Segment>
    <Header dividing size="large" content="Account information" />
    <Form onSubmit={handleSubmit(updateUserData)}>
      <Field
        name="firstName"
        type="text"
        component={SimpleInput}
        placeholder="Your first name"
        icon="user"
      />
      <Field
        name="lastName"
        type="text"
        component={SimpleInput}
        placeholder="Your last name"
        icon="user"
      />
      <Button disabled={pristine || submitting} size="large" positive content="Update" />
    </Form>
  </Segment>
);

export default reduxForm({
  form: 'userAccount',
  enableReinitialize: true
})(Account);
