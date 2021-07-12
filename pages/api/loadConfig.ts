import path from 'path';
import { promises as fs } from 'fs';

type Provider = {
  type: 'Transmission' | 'NZBGet';
  enabled: boolean;
  params: any;
};

type Config = {
  providers: Array<Provider>;
};

export const loadConfig = async (): Promise<Config> => {
  const configDirectory = path.join(process.cwd());
  const filePath = path.join(configDirectory, 'config.json');
  const raw = await fs.readFile(filePath);
  return JSON.parse(raw.toString()) as unknown as Config;
};
