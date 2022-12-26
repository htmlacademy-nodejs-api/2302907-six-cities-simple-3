import {CoordsType} from './coord-type.js';

type MockCityType = {
  name: string,
  latitude: number,
  longitude: number
}

export type MockDataType = {
  offers: {
    titles: string[],
    descriptions: string[],
    publicDates: string[],
    cities: MockCityType[],
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
