import type { NextApiRequest, NextApiResponse } from 'next';
import { QueueItem, ServiceProvider } from './types';
import * as Providers from '../../../providers';
import { configManager, ServiceProviderType } from '../loadConfig';

export type ServiceProviderStatus = {
  type: ServiceProviderType;
  queue: Array<QueueItem>;
  downloadSpeed: number;
};
export type StatusData = Array<ServiceProviderStatus>;

const fetchProviderData = async (
  provider: ServiceProvider,
): Promise<ServiceProviderStatus> => {
  const queue = await provider.getQueue();
  const downloadSpeed = await provider.getDownloadSpeed();

  return {
    type: provider.constructor.name as ServiceProviderType,
    queue,
    downloadSpeed,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusData>,
) {
  try {
    const config = await configManager.load();
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
