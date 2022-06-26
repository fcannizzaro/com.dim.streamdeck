import { HandlerArgs } from '../interfaces';
import { sd } from '../index';
import { switchFirstDeviceProfile } from '../util';
import { join } from 'path';
import { CENTER_BY_TYPE, IMAGE_PATH } from '../constant';
import { setMatrixCell } from '../actions/dim-enhanced';

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
  const image = join(IMAGE_PATH, './authorization.png');
  // show visual challenges
  switchFirstDeviceProfile('DIM-Enhanced', (type: number) => {
    const center = CENTER_BY_TYPE[type];
    data.challenges?.forEach((challenge, i) => {
      const [r, c] = center;
      setMatrixCell(r, c - 1 + i, {
        image,
        title: challenge.label.toString(),
        data: { challenge, identifier },
      });
    });
  });
};
