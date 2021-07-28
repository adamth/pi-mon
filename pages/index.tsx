import React, { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import { ServiceProvidersList } from '../components/serviceProviders/views/List';
import { StatusData } from './api/status';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import { TotalQueue } from '../components/summary/TotalQueue';
import { TotalDownloadSpeed } from '../components/summary/TotalDownloadSpeed';
import { useInterval } from '../hooks/useInterval';
import { QueueItemList } from '../components/summary/QueueItemList';

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
          <Grid container spacing={3}>
            <Grid item>
              <TotalDownloadSpeed status={status} />
            </Grid>
            <Grid item>
              <TotalQueue status={status} />
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
