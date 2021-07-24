import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardContent, DialogContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';

import { ProviderForm } from './ProviderForm';
import * as serviceProviders from '../providers';

type AddServiceProviderModalProps = {
  visible: boolean;
  label: string;
  handleClose: () => void;
  initialValues?: any;
  selectedServiceProviderName?: string;
};

export const ServiceProviderModal = ({
  visible,
  label,
  handleClose,
  initialValues,
  selectedServiceProviderName,
}: AddServiceProviderModalProps) => {
  const [serviceProviderName, setServiceProviderName] = useState<
    string | undefined
  >(selectedServiceProviderName);

  const handleSubmit = async (values: any) => {
    const postBody = {
      type: serviceProviderName,
      enabled: true,
      params: values,
    };
    await fetch('/api/provider/create', {
      method: 'POST',
      body: JSON.stringify(postBody),
    });
  };

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
      fullWidth
    >
      <DialogTitle id='form-dialog-title'>{label} provider</DialogTitle>
      <DialogContent style={{ overflow: 'hidden' }}>
        <Grid container spacing={3}>
          {Object.keys(serviceProviders).map((serviceName, i) => (
            <Grid xs={6} key={i} item>
              <Box
                boxShadow={serviceProviderName === serviceName ? 2 : 0}
                onClick={() => setServiceProviderName(serviceName)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '6px',
                  borderColor:
                    serviceProviderName === serviceName ? 'green' : '#e2e2e2',
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
                    src={(serviceProviders as any)[serviceName].imageUrl}
                    width='64px'
                    height='64px'
                  />
                  <CardContent>{serviceName}</CardContent>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      {serviceProviderName && (
        <ProviderForm
          initialValues={initialValues}
          fields={(serviceProviders as any)[serviceProviderName].fields}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      )}
    </Dialog>
  );
};
