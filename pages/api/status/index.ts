import type { NextApiRequest, NextApiResponse } from 'next';
import { NZBGetProvider } from './providers/NZBGetProvider';
import { NZBGetQueueItem, TransmissionQueueItem } from './types';
import { TransmissionProvider } from './providers/TransmissionProvider';

const nzbGetProvider = new NZBGetProvider(
  process.env.NZBGET_HOST || '',
  process.env.NZBGET_USER || '',
  process.env.NZBGET_PASSWORD || '',
);

const transmissionProvider = new TransmissionProvider(
  process.env.TRANSMISSION_HOST || '',
);

type Data = {
  queue: Array<NZBGetQueueItem | TransmissionQueueItem>;
  downloadSpeed: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const queue = await transmissionProvider.getQueue();
    const downloadSpeed = await transmissionProvider.getDownloadSpeed();
    res.status(200).json({ queue, downloadSpeed });
  } catch (e) {
    console.error('Error fetching status', e);
    res.status(500);
  }
}
