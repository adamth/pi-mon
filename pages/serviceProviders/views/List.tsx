import React, { useEffect, useState } from 'react';
import { ProviderRow } from '../../../components/ProviderRow';
import { Grid } from '@material-ui/core';
import { Config } from '../../api/loadConfig';

type ServiceProvidersListProps = {};

export const ServiceProvidersList = (props: ServiceProvidersListProps) => {
  const [config, setConfig] = useState<Config>();

  const fetchConfig = async () => {
    const response = await fetch('/api/provider');
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const config = (await response.json()) as unknown as Config;
    setConfig(config);
  };
  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <Grid container spacing={3}>
      {config?.providers.map((providerConfig, i) => (
        <Grid key={i} item xs={12}>
          <ProviderRow serviceProviderConfig={providerConfig} />
        </Grid>
      ))}
    </Grid>
  );
};
