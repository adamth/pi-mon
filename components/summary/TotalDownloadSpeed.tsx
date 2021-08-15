import React from 'react';
import { StatusData } from '../../pages/api/status';
import { Box, Grid, Typography } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { bytesToSize } from '../../utils/conversion';

type TotalDownloadSpeedProps = {
  status: StatusData;
};

export const TotalDownloadSpeed = ({ status }: TotalDownloadSpeedProps) => {
  const totalDownloadSpeed = status.reduce((acc, providerStatus) => {
    return acc + providerStatus.downloadSpeed;
  }, 0);

  const convertedSpeed = bytesToSize(totalDownloadSpeed);
  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Grid container spacing={1} alignItems='center' justifyContent='center'>
        <Grid item>
          <CloudDownloadIcon />
        </Grid>
        <Grid item>
          <Typography>Down</Typography>
        </Grid>
      </Grid>
      <Box display='flex' alignItems='flex-end'>
        <Typography variant='h2'>{convertedSpeed.speed}</Typography>
        <Box paddingBottom='5px' paddingLeft='5px'>
          <Typography variant='h6'>{convertedSpeed.rate}/s</Typography>
        </Box>
      </Box>
    </Box>
  );
};
