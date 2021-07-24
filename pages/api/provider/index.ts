import type { NextApiRequest, NextApiResponse } from 'next';
import { configManager } from '../loadConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const config = await configManager.load();
  return res.status(200).send(JSON.stringify(config));
}
