import React, { useEffect, useState } from 'react';
import {
  Box,
  BoxProps,
  Button,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';

import {
  ServiceProviderConfig,
  ServiceProviderType,
} from '../pages/api/loadConfig';
import { useFormikContext } from 'formik';

type TestButtonProps = BoxProps & {
  onTestResult: (result: TestResult) => void;
  type: ServiceProviderType;
};

export type TestResult = {
  pass: boolean;
  message?: string;
};

export const TestButton = ({
  type,
  onTestResult,
  ...rest
}: TestButtonProps) => {
  const [result, setResult] = useState<TestResult>();
  const [loading, setLoading] = useState<boolean>(false);
  const { values } = useFormikContext();

  useEffect(() => {
    if (result) {
      onTestResult(result);
    }
  }, [result, onTestResult]);

  const reset = () => {
    setResult(undefined);
    setLoading(false);
  };

  const runTest = async () => {
    reset();
    setLoading(true);

    const config = {
      type,
      params: values,
    } as ServiceProviderConfig;

    const response = await fetch('/api/provider/test', {
      method: 'POST',
      body: JSON.stringify({ config }),
    });

    setLoading(false);

    if (response.status !== 200) {
      if (response.status === 404) {
        setResult({ pass: false, message: 'API error' });
      } else {
        const message = await response.text();
        setResult({ pass: false, message: message });
      }
    } else {
      setResult({ pass: true, message: 'Pass!' });
    }
  };

  return (
    <Box display='flex' alignItems='center' {...rest}>
      <Box paddingRight='10px'>
        <Button
          variant='outlined'
          onClick={runTest}
          disabled={loading || !values}
        >
          {loading ? <CircularProgress size='24px' /> : 'Test'}
        </Button>
      </Box>
      {result?.pass && <CheckCircleIcon color='action' />}
      {result?.pass === false && <WarningIcon color='error' />}
      {result?.message && (
        <Typography
          style={{ paddingLeft: '10px' }}
          color={result.pass ? 'initial' : 'error'}
        >
          {result.message}
        </Typography>
      )}
    </Box>
  );
};
