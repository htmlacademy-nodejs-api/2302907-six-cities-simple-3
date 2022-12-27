import {CoordsType} from './coord-type.js';
import {CityType} from './city-type.js';


export type MockDataType = {
  offers: {
    titles: string[],
    descriptions: string[],
    publicDates: string[],
    cities: CityType[],
    imgPreviews: string[],
    images: string[],
    isPremium: boolean[],
    types: string[],
    goods: string[],
    coordsOffer: CoordsType[],
  },
  users: {
    emails: string[],
    names: string[],
    avatars: string[],
    passwords: string[],
    userTypes: string[],
  }
}
