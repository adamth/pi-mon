import React from 'react';
import { StatusData } from '../../pages/api/status';
import { Box, Grid, Typography } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';

type TotalQueueProps = {
  status: StatusData;
};

export const TotalQueue = ({ status }: TotalQueueProps) => {
  const totalQueueItems = status.reduce((acc, providerStatus) => {
    return acc + providerStatus.queue.length;
  }, 0);
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Grid container spacing={1} justifyContent='center'>
        <Grid item>
          <ListIcon />
        </Grid>
        <Grid item>
          <Typography>Queue</Typography>
        </Grid>
      </Grid>
      <Typography variant='h2'>{totalQueueItems}</Typography>
    </Box>
  );
};
