import React from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { Segment, Form, Header, Button } from 'semantic-ui-react';

import { TextArea } from '../input/TextArea';

const clearAfterSubmit = (result, dispatch) => dispatch(reset('createPost'));

const CreatePost = ({ pristine, submitting, handleSubmit, addPost }) => (
  <Segment>
    <Header size="tiny" content="Start a discussion thread" />
    <Form onSubmit={handleSubmit(addPost)}>
      <Field name="text" component={TextArea} placeholder="Put your thoughts into words" rows={5} />
      <Button disabled={pristine || submitting} size="large" positive content="Add post" />
    </Form>
  </Segment>
);

export default reduxForm({
  form: 'createPost',
  onSubmitSuccess: clearAfterSubmit
})(CreatePost);
