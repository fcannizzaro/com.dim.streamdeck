import axios from 'axios';
import Cache from 'file-system-cache';
import { tmpdir } from 'os';
import { join } from 'path';

export const cache = Cache({
  basePath: join(tmpdir(), './com.dim.stream-deck/cache'),
});

const inMemoryCache: Record<string, any> = {};

// cache any resource
export const cachedAny = async (key: string, generator: () => Promise<any>) => {
  if (!inMemoryCache[key]) {
    inMemoryCache[key] = await generator();
  }
  return inMemoryCache[key];
};

// cache canvas images on disk
export const cachedCanvas = async (imageKey: string, generator: () => Promise<string>) => {
  let cached = await cache.get(imageKey);
  if (!cached) {
    cached = await generator();
    await cache.set(imageKey, cached);
  }
  return cached;
};

// cache image on disk
export const cachedImage = async (image?: string, key?: string) => {
  if (!image) {
    return;
  }
  let cached = await cache.get(key ?? image);
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
