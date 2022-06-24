import { Action, AppearDisappearEvent, BaseAction, KeyEvent } from '@stream-deck-for-node/sdk';
import { switchFirstDeviceProfile } from '../util';
import { clients, sendToDIM } from '../ws/server';
import { saveToken } from '../security/authorization';
import { sd } from '../index';
import { DimEnhancedMatrix, MatrixCell } from '../interfaces';

const enhancedMatrix: DimEnhancedMatrix = {};

// reset matrix
export const resetMatrix = () => {
  Object.keys(enhancedMatrix).forEach((key) => {
    delete enhancedMatrix[key];
  });
};

// fill matrix cell with coordinates
export const setMatrixCell = (r: number, c: number, cell: MatrixCell) => {
  enhancedMatrix[`${r}:${c}`] = cell;
};
/*
   DIM Enhanced tile
   const tiles = sd.allContexts()["com.dim.streamdeck.page"];
*/
@Action('page')
export class DimEnhanced extends BaseAction {
  findCell(e: any) {
    const coords = e.payload.coordinates;
    return enhancedMatrix[`${coords.row}:${coords.column}`];
  }

  onAppear(e: AppearDisappearEvent) {
    const def = this.findCell(e);
    if (def) {
      def.title && sd.setTitle(e.context, def.title);
      def.image && sd.setImage(e.context, def.image);
      return;
    }
    sd.setTitle(e.context, '');
    sd.setImage(e.context);
  }

  onSingleTap(e: KeyEvent) {
    const def = this.findCell(e);
    const { challenge, identifier } = def?.data || {};
    if (challenge) {
      sendToDIM('authorization:confirm', { challenge: challenge.label }, clients[identifier], true);
      saveToken(identifier, challenge.value);
      switchFirstDeviceProfile();
      resetMatrix();
    }
  }
}
