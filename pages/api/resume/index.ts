import type { NextApiRequest, NextApiResponse } from 'next';
import { ServiceProvider } from '../status/types';
import { getAllProviders } from '../../../utils/getAllProviders';

const resumeProvider = async (provider: ServiceProvider) => {
  await provider.resume();
  return;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const allProviders = await getAllProviders();
    const result = await Promise.allSettled(allProviders.map(resumeProvider));
    res.status(200).send(result);
  } catch (e) {
    console.error('Error pausing', e);
    res.status(500);
  }
}
