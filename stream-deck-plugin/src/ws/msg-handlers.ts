import { HandlerArgs } from '../interfaces';
import { sd } from '../index';
import { sharedItemsData } from '../util/shared';

// update global setting with DIM data
export const updateHandler = ({ data }: HandlerArgs) => {
  // prevent tokens overwriting
  const { tokens, ...settings } = data;
  sd.setPluginSettings(settings);
};

// remove authentication token related to a specific identifier
export const authorizationResetHandler = ({ identifier }: HandlerArgs) => {
  const tokens = (sd.pluginSettings.tokens ?? []).filter((it) => it.identifier !== identifier);
  sd.setPluginSettings({ tokens });
};

export const authorizationChallengeHandler = ({ data, identifier }: HandlerArgs) => {
  sd.setPluginSettings({
    ui: {
      authorization: {
        challenges: data.challenges!,
        identifier,
      },
    },
  });
};

export const itemsInfoHandler = ({ data }: HandlerArgs) => {
  Object.assign(
    sharedItemsData,
    Object.fromEntries(data.info.map(({ identifier, ...info }) => [identifier, info])),
  );
};
