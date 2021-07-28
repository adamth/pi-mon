import React, { useState } from 'react';

import Image from 'next/image';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CardContent, DialogContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';

import { ServiceProviderForm } from './ServiceProviderForm';
import * as serviceProviders from '../providers';
import { ServiceProviderType } from '../pages/api/loadConfig';

type AddServiceProviderModalProps = {
  visible: boolean;
  label: string;
  handleClose: () => void;
  initialValues?: any;
  selectedServiceProviderType?: ServiceProviderType;
};

export const ServiceProviderModal = ({
  visible,
  label,
  handleClose,
  initialValues,
  selectedServiceProviderType,
}: AddServiceProviderModalProps) => {
  const [serviceProviderType, setServiceProviderType] = useState<
    ServiceProviderType | undefined
  >(selectedServiceProviderType);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values: any) => {
    setLoading(true);

    const postBody = {
      type: serviceProviderType,
      enabled: true,
      params: values,
    };

    try {
      await fetch('/api/provider/create', {
        method: 'POST',
        body: JSON.stringify(postBody),
      });
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
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
                boxShadow={serviceProviderType === serviceName ? 2 : 0}
                onClick={() =>
                  setServiceProviderType(serviceName as ServiceProviderType)
                }
                style={{
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '6px',
                  borderColor:
                    serviceProviderType === serviceName ? 'green' : '#e2e2e2',
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
      {serviceProviderType && (
        <ServiceProviderForm
          initialValues={initialValues}
          fields={(serviceProviders as any)[serviceProviderType].fields}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          serviceProviderType={serviceProviderType}
          saving={loading}
        />
      )}
    </Dialog>
  );
};
