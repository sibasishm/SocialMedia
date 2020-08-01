import React from 'react';
import { useMutation, queryCache } from 'react-query';
import { useFormik } from 'formik';

import { TextArea } from '../input/TextArea';
import { addAComment } from '../../apis/posts';

const validate = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = `You can not post empty comments.`;
  }
  return errors;
};

const CommentsForm = ({ postId }) => {
  const [addComment] = useMutation(addAComment, {
    onSuccess: (data) => {
      queryCache.setQueryData(['post', postId], (old) => {
        return {
          status: old.status,
          data: {
            ...old.data,
            comments: [...old.data.comments, data.data.data]
          }
        };
      });
    },
    onError: (err) => console.log(err)
  });

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      text: ''
    },
    validate,
    onSubmit: ({ text }, { setSubmitting, resetForm }) => {
      setSubmitting(false);
      addComment({ text, postId });
      resetForm();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment"></label>
      <TextArea
        id="comment"
        name="text"
        value={values.text}
        onChange={handleChange}
        errors={errors.text}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentsForm;
