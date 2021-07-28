import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { ServiceProviderStatus } from '../../pages/api/status';
import { QueueItemRow } from './QueueItemRow';

type QueueItemListProps = {
  serviceProviderStatus: ServiceProviderStatus;
};

export const QueueItemList = ({
  serviceProviderStatus,
}: QueueItemListProps) => {
  return (
    <Box paddingBottom='40px'>
      <Grid container spacing={3}>
        {serviceProviderStatus.queue.map((queueItem, i) => (
          <Grid key={i} item xs={12}>
            <QueueItemRow
              queueItem={queueItem}
              serviceProviderType={serviceProviderStatus.type}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
