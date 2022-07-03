import { HandlerArgs } from '../interfaces';
import { DimView, sd } from '../index';
import { join } from 'path';
import { IMAGE_PATH } from '../constant';
import { DeviceType, DynamicViewInstance } from '@stream-deck-for-node/sdk/lib/types/interfaces';
import { clients, sendToDIM } from './server';
import { saveToken } from '../security/authorization';

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
  const devices = sd.info.devices.filter((it) => Object.values(DeviceType).includes(it.type));
  const views: DynamicViewInstance[] = [];

  const onClose = () => {
    for (const view of views) {
      view.clear();
      view.hide();
    }
  };

  // render on all devices
  devices.forEach((device) => {
    const view = DimView.show(device);
    if (!view) return;
    views.push(view);
    const { center, approximatedCenter } = view.geometry;
    const image = join(IMAGE_PATH, './authorization.png');
    const c = center || approximatedCenter || 0;
    view.onTapOutside(onClose);
    data.challenges?.forEach((challenge, i) => {
      view?.update(c - 1 + i, {
        image,
        title: challenge.label.toString(),
        onSingleTap: () => {
          sendToDIM(
            'authorization:confirm',
            { challenge: challenge.label },
            clients[identifier],
            true,
          );
          saveToken(identifier, challenge.value);
          onClose();
        },
      });
    });
  });
};
