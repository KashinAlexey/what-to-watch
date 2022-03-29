export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/review',
  Player = '/player',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
