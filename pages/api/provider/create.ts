import type { NextApiRequest, NextApiResponse } from 'next';
import { configManager, ServiceProviderConfig } from '../loadConfig';
import * as Providers from '../../../providers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const providerConfig = JSON.parse(req.body) as ServiceProviderConfig;
  if (Object.keys(Providers).indexOf(providerConfig.type) === -1) {
    return res.status(400).send('Provider not supported');
  }

  await configManager.save(providerConfig);

  return res.status(200).send('OK');
}
