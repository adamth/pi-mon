import path from 'path';
import { promises as fs } from 'fs';

export type ServiceProviderType = 'Transmission' | 'NZBGet';

export type ServiceProviderConfig = {
  type: ServiceProviderType;
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
  if (raw.toString()) {
    return JSON.parse(raw.toString()) as unknown as Config;
  }
  return { providers: [] } as Config;
};

const saveProvider = async (
  providerConfig: ServiceProviderConfig,
): Promise<void> => {
  const currentConfig = await loadConfig();
  const existingIndex = currentConfig.providers.findIndex((provider) => {
    return provider.type === providerConfig.type;
  });

  if (existingIndex !== -1) {
    currentConfig.providers[existingIndex] = providerConfig;
  } else {
    currentConfig.providers.push(providerConfig);
  }
  const filePath = getConfigPath();
  await fs.writeFile(filePath, JSON.stringify(currentConfig));
};

export const configManager = {
  load: loadConfig,
  save: saveProvider,
};
