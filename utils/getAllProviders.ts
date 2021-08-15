import { configManager, ServiceProviderConfig } from '../pages/api/loadConfig';
import * as Providers from '../providers';

export const getAllProviders = async () => {
  const config = await configManager.load();
  return config.providers.map((providerConfig) => {
    return new Providers[providerConfig.type]({
      ...providerConfig.params,
    });
  });
};
