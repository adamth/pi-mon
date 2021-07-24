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

const getConfigPath = () => {
  const configDirectory = path.join(process.cwd());
  return path.join(configDirectory, 'config.json');
};

const loadConfig = async (): Promise<Config> => {
  const filePath = getConfigPath();
  const raw = await fs.readFile(filePath);
  return JSON.parse(raw.toString()) as unknown as Config;
};

const saveProvider = async (
  providerConfig: ServiceProviderConfig,
): Promise<void> => {
  const currentConfig = await loadConfig();
  const existingIndex = currentConfig.providers.findIndex((provider) => {
    return provider.type === providerConfig.type;
  });

  if (existingIndex) {
    currentConfig.providers[existingIndex] = providerConfig;
  }
  const filePath = getConfigPath();
  await fs.writeFile(filePath, JSON.stringify(currentConfig));
};

export const configManager = {
  load: loadConfig,
  save: saveProvider,
};
