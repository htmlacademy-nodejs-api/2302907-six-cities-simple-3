export const OFFER_RESTRICTIONS = {
  title: {
    minLength: 10,
    maxLength: 100,
    message: 'Название должно содержать от 10 до 100 символов',
  },
  description: {
    minLength: 20,
    maxLength: 1024,
    message: 'Описание должно содержать от 20 до 1024 символов',
  },
  cityID: {
    message: 'Поле cityID должно содержать id города',
  },
  imgPreview: {
    message: 'Поле imgPreview должно содержать адрес на фото-превью',
  },
  images: {
    message: 'Поле images должно содержать массив строк',
  },
  isPremium: {
    message: 'Поле isPremium может быть true или false',
  },
  type: {
    message: 'Поле type может быть одним из 4 вариантов: apartment, house, room или hotel',
  },
  roomsCount: {
    min: 1,
    max: 8,
    message: {
      int: 'Поле roomsCount должно быть числом',
      min: 'Поле roomsCount должно быть не меньше 1',
      max: 'Поле roomsCount должно быть не больше 8',
    }
  },
  rating: {
    min: 1,
    max: 5,
  },
  price: {
    min: 100,
    max: 100000,
    message: {
      int: 'Поле price должно быть числом',
      min: 'Поле price должно быть не меньше 100',
      max: 'Поле price должно быть не больше 100000',
    }
  },
  guestsCount: {
    min: 1,
    max: 10,
    message: {
      int: 'Поле guestsCount должно быть числом',
      min: 'Поле guestsCount должно быть не меньше 1',
      max: 'Поле guestsCount должно быть не больше 10',
    }
  },
  goods: {
    message: {
      array: 'Поле goods должно быть массивом',
      enum: 'Возможные значения для поля goods:  Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge',
    }
  },
  weekDay: {
    first: 1,
    last: 7,
  },
  locationOffer: {
    length: 2,
    message: 'Поле locationOffer должно быть массивом чисел из 2 элементов [lat, long]',
  }
} as const;
