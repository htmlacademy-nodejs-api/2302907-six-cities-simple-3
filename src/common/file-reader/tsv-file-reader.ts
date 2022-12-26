import {FileReaderInterface} from './file-reader.interface.js';
import {readFileSync} from 'fs';
import {OfferType} from '../../types/offer-type.js';
import {CoordsType} from '../../types/coord-type.js';
import {ObjectType} from '../../types/object-type.js';
import {GoodsType} from '../../types/goods-type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8'});
  }

  public toArrayOffers(): OfferType[] {
    if(!this.rawData) {
      return [];
    }

    const data = this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => {
        const [
          id,
          title,
          description,
          publicDate,
          city,
          imgPreview,
          images,
          isPremium,
          rating,
          type,
          roomsCount,
          guestsCount,
          price,
          goods,
          hostID,
          commentsCount,
          coordsOffer
        ] = line.split('\t');


        const [latitude, longitude] = coordsOffer.split(', ');

        const coords: CoordsType = {
          latitude: +latitude,
          longitude: +longitude,
        };

        return {
          id: +id,
          title,
          description,
          publicDate: new Date(publicDate),
          city,
          imgPreview,
          images: images.split(',\n'),
          isPremium: Boolean(isPremium),
          rating: +rating,
          type: type as ObjectType,
          roomsCount: +roomsCount,
          guestsCount: +guestsCount,
          price: +price,
          goods: goods.split(',\n') as GoodsType[],
          hostID,
          commentsCount: +commentsCount,
          coordsOffer: coords,
        };

      });

    data.shift();
    return data;
  }
}
