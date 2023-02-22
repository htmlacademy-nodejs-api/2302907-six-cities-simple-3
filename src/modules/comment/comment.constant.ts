export const COMMENT_RESTRICTIONS = {
  text: {
    minLength: 5,
    maxLength: 1024,
    message: {
      string: 'Поле text должно быть строкой',
      length: 'Поле text должно быть от 2 до 1024 символов'
    }
  },
  offerID: {
    message: 'Поле offerID должно содержать id предложения'
  },
  rating: {
    min: 1,
    max: 5,
    message: {
      int: 'Поле rating должно быть целым числом',
      minMax: 'Поле rating должно быть целым числом от 1 до 5',
    }
  }
};
