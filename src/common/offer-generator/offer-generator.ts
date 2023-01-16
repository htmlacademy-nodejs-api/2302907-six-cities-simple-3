import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {MockDataType} from '../../types/mock-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {CityType} from '../../types/city-type.js';
import dayjs from 'dayjs';

const RESTRICTIONS = {
  price: {
    min: 100,
    max: 100000,
  },
  rating: {
    min: 1,
    max: 5,
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
    const id = generateRandomValue(1, 10000).toString();
    const title = getRandomItem<string>(offersData.titles);
    const description = getRandomItem<string>(offersData.descriptions);
    const city = getRandomItem<CityType>(offersData.cities);
    const cityName = city.name;
    const locationOffer = `${city.location.latitude}, ${city.location.longitude}`;
    const imgPreview = getRandomItem<string>(offersData.imgPreviews);
    const images = getRandomItems<string>(offersData.images).join('; ');
    const isPremium = getRandomItem<boolean>(offersData.isPremium);
    const rating = generateRandomValue(RESTRICTIONS.rating.min * 10, RESTRICTIONS.rating.max * 10) / 10;
    const type = getRandomItem<string>(offersData.types);
    const roomsCount = generateRandomValue(RESTRICTIONS.roomsCount.min, RESTRICTIONS.roomsCount.max).toString();
    const guestsCount = generateRandomValue(RESTRICTIONS.guestsCount.min, RESTRICTIONS.guestsCount.max).toString();
    const price = generateRandomValue(RESTRICTIONS.price.min, RESTRICTIONS.price.max).toString();
    const goods = getRandomItems<string>(offersData.goods).join('; ');
    const hostID = getRandomItem<string>(this.mockData.users.emails);
    const publicDate = dayjs()
      .subtract(generateRandomValue(RESTRICTIONS.weekDay.first, RESTRICTIONS.weekDay.last), 'day')
      .toISOString();


    return [
      id, title, description, publicDate, cityName,
      imgPreview, images, isPremium, rating.toString(), type,
      roomsCount, guestsCount, price, goods, hostID, locationOffer
    ].join('\t');
  }
}
