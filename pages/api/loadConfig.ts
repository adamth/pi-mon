import path from 'path';
import { promises as fs } from 'fs';

export type ServiceProviderConfig = {
  type: 'Transmission' | 'NZBGet';
  enabled: boolean;
  params: any;
};

export type Config = {
  providers: Array<ServiceProviderConfig>;
};

export const loadConfig = async (): Promise<Config> => {
  const configDirectory = path.join(process.cwd());
  const filePath = path.join(configDirectory, 'config.json');
  const raw = await fs.readFile(filePath);
  return JSON.parse(raw.toString()) as unknown as Config;
};
