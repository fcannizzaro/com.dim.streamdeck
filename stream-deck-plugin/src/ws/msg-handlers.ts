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
  const items: [string, string[]][] = Object.entries(sd.allContexts());
  items.forEach(([action, contexts]) => {
    contexts.forEach((ctx) => {
      sd.sendToPropertyInspector(ctx, action, {
        ...data,
        identifier,
      });
    });
  });
};

export const itemsInfoHandler = ({ data }: HandlerArgs) => {
  Object.assign(
    sharedItemsData,
    Object.fromEntries(data.info.map(({ identifier, ...info }) => [identifier, info])),
  );
};
