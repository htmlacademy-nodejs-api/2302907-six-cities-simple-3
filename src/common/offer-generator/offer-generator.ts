import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {MockDataType} from '../../types/mock-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {CityType} from '../../types/city.type.js';

const RESTRICTIONS = {
  price: {
    min: 100,
    max: 100000,
  },
  guestsCount: {
    min: 1,
    max: 10,
  },
  roomsCount: {
    min: 1,
    max: 8,
  },
  weekDay: {
    first: 1,
    last: 7,
  }
} as const;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockDataType) {}

  public generate(): string {
    const offersData = this.mockData.offers;
    const title = getRandomItem<string>(offersData.titles);
    const description = getRandomItem<string>(offersData.descriptions);
    const city = getRandomItem<CityType>(this.mockData.cities);
    const cityName = city.name;
    const locationOffer = city.location.join(', ');
    const imgPreview = getRandomItem<string>(offersData.imgPreviews);
    const images = getRandomItems<string>(offersData.images).join('; ');
    const isPremium = getRandomItem<boolean>(offersData.isPremium);
    const type = getRandomItem<string>(offersData.types);
    const roomsCount = generateRandomValue(RESTRICTIONS.roomsCount.min, RESTRICTIONS.roomsCount.max).toString();
    const guestsCount = generateRandomValue(RESTRICTIONS.guestsCount.min, RESTRICTIONS.guestsCount.max).toString();
    const price = generateRandomValue(RESTRICTIONS.price.min, RESTRICTIONS.price.max).toString();
    const goods = getRandomItems<string>(offersData.goods).join('; ');


    return [
      title, description, cityName,
      imgPreview, images, isPremium, type,
      roomsCount, guestsCount, price, goods, locationOffer
    ].join('\t');
  }
}
