import { sd } from './index';

// add bungie prefix for resources
export const bungify = (image: string) => (!image ? undefined : `https://www.bungie.net${image}`);

// Stream Deck auto profile utility
export const switchFirstDeviceProfile = (profile?: string, preHook?: (type: number) => void) => {
  const first = sd.info.devices[0];
  if (first) {
    preHook?.(first.type);
    sd.switchToProfile(sd.uuid, first.id, profile);
  }
};
