import React from 'react';
import Image from 'next/image';
import { Card, CardContent, Grid } from '@material-ui/core';
import { ServiceProviderType } from '../../pages/api/loadConfig';
import * as serviceProviders from '../../providers';
import { QueueItem } from '../../pages/api/status/types';

type QueueItemRowProps = {
  serviceProviderType: ServiceProviderType;
  queueItem: QueueItem;
};

export const QueueItemRow = ({
  serviceProviderType,
  queueItem,
}: QueueItemRowProps) => {
  const serviceProvider = serviceProviders[serviceProviderType];
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
          <Grid item xs={9}>
            {queueItem.name}
          </Grid>
          <Grid item xs={2}>
            {queueItem.status}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
