import { Box } from '@material-ui/core';

import { Layout } from '../components/Layout';
import { EditButton } from '../components/EditButton';
import { ServiceProvidersList } from '../components/serviceProviders/views/List';

export default function Config() {
  return (
    <Layout>
      <Box display='flex' justifyContent='flex-end' paddingBottom='20px'>
        <EditButton label='Add' />
      </Box>
      <ServiceProvidersList />
    </Layout>
  );
}
