import React, { useState } from 'react';

import { Layout } from '../components/Layout';
import { StatusData } from './api/status';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { TotalQueue } from '../components/summary/TotalQueue';
import { TotalDownloadSpeed } from '../components/summary/TotalDownloadSpeed';
import { useInterval } from '../hooks/useInterval';
import { QueueItemList } from '../components/summary/QueueItemList';
import { DownloadControlButton } from '../components/DownloadControlButton';

export default function Home() {
  const [status, setStatus] = useState<StatusData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    if (!status) {
      setLoading(true);
    }
    try {
      const response = await fetch('/api/status');
      const statusJson = (await response.json()) as StatusData;
      setStatus(statusJson);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useInterval(() => {
    fetchStatus();
  }, 2000);

  return (
    <Layout>
      {loading ? (
        <Box display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>
      ) : status ? (
        <React.Fragment>
          <Grid container spacing={3} alignContent='center' alignItems='center'>
            <Grid item xs={3}>
              <TotalDownloadSpeed status={status} />
            </Grid>
            <Grid item xs={3}>
              <TotalQueue status={status} />
            </Grid>
            <Grid item xs={6}>
              <div style={{ float: 'right' }}>
                <DownloadControlButton />
              </div>
            </Grid>
          </Grid>
          {status.map((serviceProviderStatus, i) => (
            <QueueItemList
              key={i}
              serviceProviderStatus={serviceProviderStatus}
            />
          ))}
        </React.Fragment>
      ) : null}
    </Layout>
  );
}
