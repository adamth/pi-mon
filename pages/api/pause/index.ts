import type { NextApiRequest, NextApiResponse } from 'next';
import { ServiceProvider } from '../status/types';
import { getAllProviders } from '../../../utils/getAllProviders';

const pauseProvider = async (provider: ServiceProvider) => {
  await provider.pause();
  return;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const allProviders = await getAllProviders();
    const results = await Promise.allSettled(allProviders.map(pauseProvider));
    res.status(200).send(results);
  } catch (e) {
    console.error('Error pausing', e);
    res.status(500);
  }
}
