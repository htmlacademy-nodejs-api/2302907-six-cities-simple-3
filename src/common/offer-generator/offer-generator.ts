import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {MockDataType} from '../../types/mock-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {CityType} from '../../types/city.type.js';
import {OFFER_RESTRICTIONS} from '../../modules/offer/offer.constant.js';

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
    const roomsCount = generateRandomValue(OFFER_RESTRICTIONS.roomsCount.min, OFFER_RESTRICTIONS.roomsCount.max).toString();
    const guestsCount = generateRandomValue(OFFER_RESTRICTIONS.guestsCount.min, OFFER_RESTRICTIONS.guestsCount.max).toString();
    const price = generateRandomValue(OFFER_RESTRICTIONS.price.min, OFFER_RESTRICTIONS.price.max).toString();
    const goods = getRandomItems<string>(offersData.goods).join('; ');


    return [
      title, description, cityName,
      imgPreview, images, isPremium, type,
      roomsCount, guestsCount, price, goods, locationOffer
    ].join('\t');
  }
}
