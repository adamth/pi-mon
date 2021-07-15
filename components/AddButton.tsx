import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as Providers from '../providers';

import { ProviderForm } from './ProviderForm';
import { CardContent, DialogContent } from '@material-ui/core';

export const AddButton = () => {
  const [open, setOpen] = React.useState(false);
  const [fields, setFields] = useState<Array<string> | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [defaultValues, setDefaultValues] = useState<any>({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values: any) => {
    const response = await fetch('/api/provider/create', {
      method: 'POST',
      body: JSON.stringify(values),
    });
  };

  useEffect(() => {
    if (provider) {
      // @ts-ignore
      setFields(Providers[provider].params);
    }
  }, [provider]);

  useEffect(() => {
    setDefaultValues(
      fields?.reduce((acc, field) => {
        // @ts-ignore
        acc[field] = '';
        return acc;
      }, {}),
    );
  }, [fields]);

  // @ts-ignore
  return (
    <React.Fragment>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Add provider</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {Object.keys(Providers).map((providerName, i) => (
              <Grid xs={6} key={i} item>
                <Box
                  boxShadow={provider === providerName ? 2 : 0}
                  onClick={() => setProvider(providerName)}
                  style={{
                    cursor: 'pointer',
                    border: '1px solid',
                    borderRadius: '6px',
                    borderColor:
                      provider === providerName ? 'green' : '#e2e2e2',
                  }}
                >
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    padding='10px'
                  >
                    <Image
                      alt='provider name'
                      src={(Providers as any)[providerName].logo}
                      width='64px'
                      height='64px'
                    />
                    <CardContent>{providerName}</CardContent>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        {fields && (
          <ProviderForm
            initialValues={defaultValues}
            fields={fields}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
};
