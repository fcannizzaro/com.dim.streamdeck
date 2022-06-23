import { sd } from './index';

// add bungie prefix for resources
export const bungify = (image: string) => (!image ? undefined : `https://www.bungie.net${image}`);

// Stream Deck auto profile utility
export const switchFirstDeviceProfile = (profile?: string): number => {
  const first = sd.info.devices[0];
  first && sd.switchToProfile(sd.uuid, first.id, profile);
  return first.type;
};
