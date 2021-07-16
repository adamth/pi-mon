import type { NextApiRequest, NextApiResponse } from 'next';
import { loadConfig } from '../loadConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const config = await loadConfig();
  return res.status(200).send(JSON.stringify(config));
}
