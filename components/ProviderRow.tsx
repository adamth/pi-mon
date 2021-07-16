import React from 'react';
import Image from 'next/image';
import { Box, Button, Card, CardContent, Grid } from '@material-ui/core';
import { ServiceProviderConfig } from '../pages/api/loadConfig';
import * as serviceProviders from '../providers';
import { EditButton } from './EditButton';

type ProviderRowProps = {
  serviceProviderConfig: ServiceProviderConfig;
};

export const ProviderRow = ({ serviceProviderConfig }: ProviderRowProps) => {
  const serviceProvider = serviceProviders[serviceProviderConfig.type];
  return (
    <Card>
      <CardContent style={{ paddingBottom: 16 }}>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={1}>
            <Image
              src={serviceProvider.imageUrl}
              alt='logo'
              width='30px'
              height='30px'
            />
          </Grid>
          <Grid item xs={2}>
            {serviceProviderConfig.type}
          </Grid>
          <Grid item xs={2}>
            {serviceProviderConfig.params['host']}
          </Grid>
          <Grid item xs={2}>
            {serviceProviderConfig.enabled ? 'Enabled' : 'Disabled'}
          </Grid>
          <Grid item xs={5} justifyContent='flex-end'>
            <Box display='flex' justifyContent='flex-end'>
              <EditButton
                label='Edit'
                initialValues={serviceProviderConfig.params}
                selectedServiceProviderName={serviceProviderConfig.type}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
