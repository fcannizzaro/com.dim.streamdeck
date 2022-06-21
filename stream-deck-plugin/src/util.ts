import ncp from 'copy-paste';
import { sd } from './index';

// add bungie prefix for resources
export const util = (image: string) => (!image ? undefined : `https://www.bungie.net${image}`);

// copy text if included in websocket message
export const copyHandler = (msg: Record<string, any>): boolean => {
  const share = msg['shareUrl'];
  if (share) {
    ncp.copy(share);
    return true;
  }
  return false;
};

export const switchFirstDeviceProfile = (profile?: string) => {
  const first = sd.info.devices[0];
  first && sd.switchToProfile(sd.uuid, first.id, profile);
};
