import { sendToDIM } from '../ws/server';
import debounce from 'debounce';

const itemsIds = new Set();

const triggerRequestInfo = debounce(
  () =>
    sendToDIM('pullItem:items-request', {
      ids: Array.from(itemsIds),
    }),
  300,
);

export const addNewItem = (id: string) => {
  itemsIds.add(id);
  triggerRequestInfo();
};
