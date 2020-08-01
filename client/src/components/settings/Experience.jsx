import React from 'react';
import { Segment, Header, Form, Button, List } from 'semantic-ui-react';
import { Field, reduxForm, reset } from 'redux-form';

import { SimpleInput } from '../input/SimpleInput';
import { TextArea } from '../input/TextArea';
import { DateInput } from '../input/DateInput';
import Accordion from '../layout/Accordion';
import ListItem from '../layout/ListItem';

import { required } from '../../utils/formValidators';
import { formatDate } from '../../utils';

const clearAfterSubmit = (result, dispatch) => dispatch(reset('userExperience'));

const createContentForAccordion = (payload) =>
  payload.map(({ _id, title, company, description, from, to }) => ({
    title: company,
    body: (
      <List key={_id}>
        <ListItem iconName="industry" title="Company name" description={company} />
        <ListItem iconName="black tie" title="Job title" description={title} />
        <ListItem iconName="book" title="Roles & responsibility" description={description} />
        <ListItem
          iconName="calendar"
          title="Date"
          description={`${formatDate(from)} - ${formatDate(to) || 'Now'}`}
        />
      </List>
    )
  }));

const Experience = ({ pristine, submitting, handleSubmit, experience, updateProfile }) => (
  <Segment>
    <Header dividing size="large" content="Work experience" />
    {experience && <Accordion content={createContentForAccordion(experience)} />}
    <Form style={{ marginTop: '1rem' }} onSubmit={handleSubmit(updateProfile)}>
      <Form.Group widths="equal">
        <Field
          fluid
          name="title"
          type="text"
          component={SimpleInput}
          placeholder="Job title"
          icon="black tie"
          validate={required}
        />
        <Field
          fluid
          name="company"
          type="text"
          component={SimpleInput}
          placeholder="Company Name"
          icon="industry"
          validate={required}
        />
      </Form.Group>
      <Form.Group widths="equal">
        {/* <label>I am currently studing here: </label> */}
        <Field name="from" component={DateInput} placeholder="From" validate={required} />
        <Field name="to" component={DateInput} placeholder="To" />
      </Form.Group>
      <label>Add some details</label>
      <Field name="description" rows={3} component={TextArea} placeholder="Description" />
      <Button disabled={pristine || submitting} size="large" positive content="Add Experience" />
    </Form>
  </Segment>
);

export default reduxForm({
  form: 'userExperience',
  onSubmitSuccess: clearAfterSubmit
})(Experience);
