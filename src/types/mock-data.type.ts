import {CityType} from './city.type.js';
import {UserType} from './user.type.js';


export type MockDataType = {
  offers: {
    titles: string[],
    descriptions: string[],
    imgPreviews: string[],
    images: string[],
    isPremium: boolean[],
    types: string[],
    goods: string[],
  },
  users: UserType[],
  cities: CityType[],
}
