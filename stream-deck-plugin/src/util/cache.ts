import axios from 'axios';
import Cache from 'file-system-cache';
import { tmpdir } from 'os';
import { join } from 'path';

export const cache = Cache({
  basePath: join(tmpdir(), './com.dim.stream-deck/cache'),
});

// cache image on disk
export const cachedImage = async (image?: string) => {
  if (!image) {
    return;
  }
  let cached = await cache.get(image);
  let img;
  if (!cached) {
    const { data, headers } = await axios({ url: image, responseType: 'arraybuffer' });
    const imageType = headers['content-type'];
    img = `data:${imageType};base64, ${Buffer.from(data, 'binary').toString('base64')}`;
    await cache.set(image, img);
  } else {
    img = cached;
  }
  return img;
};

/*
export const cacheById = async (id: string, obtain: () => any) => {
  let cached = await cache.get(id);
  if (!cached) {
    cached = await obtain();
    cache.set(id, cached).then();
  }
  return cached;
};
*/
