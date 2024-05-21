import type { IAuthor, ILocation, IPainting, IPaintingClient } from '@/types';
import { BASE_URL_API_URL } from '@/consts';

export default async (paintings: IPainting[], authors: IAuthor[], locations: ILocation[]) => {
  const promises: Promise<IPaintingClient>[] = paintings.map((painting) => {
    const promise: Promise<IPaintingClient> = new Promise((resolve) => {
      const paintingClient: IPaintingClient = {
        id: painting.id,
        name: painting.name,
        created: painting.created,
        author: authors.find((author) => author.id === painting.authorId) || null,
        location: locations.find((location) => location.id === painting.locationId) || null,
        image: new Image(),
      };
      paintingClient.image.src = BASE_URL_API_URL + painting.imageUrl;
      paintingClient.image.onload = () => resolve(paintingClient);
      paintingClient.image.onerror = () => {
        paintingClient.image!.src = BASE_URL_API_URL + painting.imageUrl;
      };
    });
    return promise;
  });
  const clientPaintings = await Promise.all(promises);
  return clientPaintings;
};
