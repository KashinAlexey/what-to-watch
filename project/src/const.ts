export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/review',
  Player = '/player',
  NotFound = '*',
}

export enum APIRoute {
  Films = '/films',
  SimilarFilms = '/similar',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  globalData = 'GLOBAL_DATA',
  localData = 'LOCAL_DATA',
  process = 'PROCESS',
  user = 'USER',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const EMPTY_FILM = {
  id: 0,
  name: '',
  posterImage: '',
  previewImage: '',
  backgroundImage: '',
  backgroundColor: '',
  videoLink: '',
  previewVideoLink: '',
  description: '',
  rating: 0,
  scoresCount: 0,
  director: '',
  starring: [''],
  runTime: 0,
  genre: '',
  released: 0,
  isFavorite: false,
};

export const NAVIGATION = {
  OVERVIEW: 'Overview',
  DETAILS: 'Details',
  REVIEWS: 'Reviews',
};
