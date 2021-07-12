import type { NextApiRequest, NextApiResponse } from 'next';
import { QueueItem, ServiceProvider } from './types';
import * as Providers from '../../../providers';
import { loadConfig } from '../loadConfig';

type DataItem = {
  name: string;
  queue: Array<QueueItem>;
  downloadSpeed: string;
};
type Data = Array<DataItem>;

const fetchProviderData = async (
  provider: ServiceProvider,
): Promise<DataItem> => {
  const queue = await provider.getQueue();
  const downloadSpeed = await provider.getDownloadSpeed();

  return {
    name: provider.constructor.name,
    queue,
    downloadSpeed,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const config = await loadConfig();
    const allProviders = config.providers.map((providerConfig) => {
      return new Providers[providerConfig.type]({
        ...providerConfig.params,
      });
    });
    const data = await Promise.all(allProviders.map(fetchProviderData));

    res.status(200).json(data);
  } catch (e) {
    console.error('Error fetching status', e);
    res.status(500);
  }
}
