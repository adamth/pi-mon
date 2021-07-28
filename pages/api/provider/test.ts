import type { NextApiRequest, NextApiResponse } from 'next';
import * as Providers from '../../../providers';
import { ServiceProviderConfig } from '../loadConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const serviceProviderConfig = JSON.parse(req.body)
    .config as ServiceProviderConfig;

  if (Object.keys(Providers).indexOf(serviceProviderConfig.type) === -1) {
    return res.status(403).send('Unknown provider');
  }
  const serviceProvider = new Providers[serviceProviderConfig.type]({
    ...serviceProviderConfig.params,
  });

  const result = await serviceProvider.test();

  return res.status(result.pass ? 200 : 403).send(result.message);
}
