import React from 'react';
import { Form, Field, Formik } from 'formik';
import { DialogActions, DialogContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

type ProviderFormProps = {
  fields: Array<string>;
  initialValues: any;
  handleSubmit: (values: any) => Promise<void>;
  handleClose: () => void;
};

const Input = ({ field, form, ...rest }: { field: any; form: any }) => {
  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  return (
    <TextField
      error={!!error && touched}
      helperText={touched && error}
      style={{ paddingBottom: '10px' }}
      variant='outlined'
      fullWidth
      label={field.name}
      {...field}
      {...rest}
    />
  );
};

const validate = (values: any) => {
  const errors = {};
  Object.keys(values).map((field) => {
    if (!values[field]) {
      // @ts-ignore
      errors[field] = 'Required';
    }
  });
  return errors;
};

export const ProviderForm = ({
  fields,
  initialValues,
  handleSubmit,
  handleClose,
}: ProviderFormProps) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      <Form>
        <DialogContent>
          {fields.map((field, i) => (
            <Field key={i} name={field} id={field} component={Input} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary'>
            Add
          </Button>
        </DialogActions>
      </Form>
    </Formik>
  );
};
