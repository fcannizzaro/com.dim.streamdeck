import { sd } from '../index';

export const tokenOf = (id: string) => {
  return sd.pluginSettings.tokens?.find((it) => it.identifier === id)?.token;
};

export const saveToken = (identifier: string, token: string) => {
  if (!sd.pluginSettings.tokens) {
    sd.pluginSettings.tokens = [];
  }
  const existing = sd.pluginSettings.tokens.find((it) => it.identifier === identifier);
  if (existing) {
    existing.token = token;
  } else {
    sd.pluginSettings.tokens.push({
      identifier,
      token,
    });
  }
  sd.setPluginSettings({ tokens: sd.pluginSettings.tokens });
};
