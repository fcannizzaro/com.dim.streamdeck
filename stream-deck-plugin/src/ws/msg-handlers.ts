import ncp from 'copy-paste';
import { HandlerArgs } from '../interfaces';
import { sd } from '../index';
import { switchFirstDeviceProfile } from '../util';
import { join } from 'path';
import { IMAGE_PATH } from '../constant';
import { context2Challenge } from '../security/authorization';

// copy shareable loadout url to clipboard
export const shareUrlHandler = ({ data }: HandlerArgs) => {
  const url = data.shareUrl;
  url && ncp.copy(url);
};

// update global setting with DIM data
export const updateHandler = ({ data }: HandlerArgs) => {
  // prevent tokens overwriting
  const { tokens, ...settings } = data;
  sd.setPluginSettings(settings);
};

export const authorizationResetHandler = ({ identifier }: HandlerArgs) => {
  const tokens = (sd.pluginSettings.tokens ?? []).filter((it) => it.identifier !== identifier);
  sd.setPluginSettings({ tokens });
};

export const authorizationChallengeHandler = ({ data, identifier }: HandlerArgs) => {
  const type: number = switchFirstDeviceProfile('DIM-Enhanced');
  const positionByType = [7, 1, 11, 7][type];
  return setTimeout(() => {
    const tiles = sd.allContexts()['com.dim.streamdeck.page'];
    const image = join(IMAGE_PATH, './authorization.png');
    data.challenges?.forEach((challenge, i) => {
      const ctx = tiles[positionByType - 1 + i];
      context2Challenge[ctx] = {
        ...challenge,
        identifier,
      };
      sd.setImage(ctx, image);
      sd.setTitle(ctx, challenge.label.toString());
    });
  }, 500);
};
