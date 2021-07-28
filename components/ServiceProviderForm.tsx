import React, { useState } from 'react';
import { Form, Field, Formik } from 'formik';
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { TestButton, TestResult } from './TestButton';
import { ServiceProviderType } from '../pages/api/loadConfig';

type ServiceProviderFormProps = {
  fields: Array<string>;
  initialValues: any;
  handleSubmit: (values: any) => Promise<void>;
  handleClose: () => void;
  serviceProviderType?: ServiceProviderType;
  saving?: boolean;
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

export const ServiceProviderForm = ({
  fields,
  initialValues,
  handleSubmit,
  handleClose,
  serviceProviderType,
  saving = false,
}: ServiceProviderFormProps) => {
  const [testPassed, setTestPassed] = useState<boolean>(false);

  const handleTestResult = (result: TestResult) => {
    setTestPassed(result.pass);
  };

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
          {serviceProviderType && (
            <TestButton
              type={serviceProviderType}
              style={{ flex: '1 0 0' }}
              onTestResult={handleTestResult}
            />
          )}
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='outlined'
            disabled={!testPassed || saving}
          >
            {saving ? <CircularProgress size='22px' /> : 'Save'}
          </Button>
        </DialogActions>
      </Form>
    </Formik>
  );
};
