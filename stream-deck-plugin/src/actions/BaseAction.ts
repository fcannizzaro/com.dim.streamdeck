import { BaseAction, PropertyInspectorMessagingEvent } from '@stream-deck-for-node/sdk';
import { clients, sendToDIM } from '../ws/server';
import { saveToken } from '../ws/authorization';

export class BaseDimAction<T = any> extends BaseAction<T> {
  onMessageFromPropertyInspector(e: PropertyInspectorMessagingEvent) {
    const { identifier, challenge } = e.payload;
    if (challenge) {
      sendToDIM('authorization:confirm', { challenge: challenge.label }, clients[identifier], true);
      saveToken(identifier, challenge.value);
    }
  }
}
