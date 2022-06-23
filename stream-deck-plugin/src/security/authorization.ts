import { sd } from '../index';
import { Challenge } from '../interfaces';

export const context2Challenge: Record<string, Challenge> = {};

export const tokenOf = (id: string) => {
  return sd.pluginSettings.tokens?.find((it) => it.identifier === id)?.token;
};

export const saveToken = (identifier: string, token: string) => {
  if (!sd.pluginSettings.tokens) {
    sd.pluginSettings.tokens = [];
  }
  sd.pluginSettings.tokens.push({
    identifier,
    token,
  });
  sd.setPluginSettings({ tokens: sd.pluginSettings.tokens });
};
