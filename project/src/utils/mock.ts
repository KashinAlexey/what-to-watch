import { Comment } from '../types/comment';
import { Film } from '../types/film';

export const makeFakeFilm = (): Film => ({
  id: 1,
  name: 'The Grand Budapest Hotel',
  posterImage: 'img/the-grand-budapest-hotel-poster.jpg',
  previewImage: 'img/the-grand-budapest-hotel.jpg',
  backgroundImage: 'img/the-grand-budapest-hotel-bg.jpg',
  backgroundColor: '#ffffff',
  videoLink:' https://some-link',
  previewVideoLink: 'https://some-link',
  description: 'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H.',
  rating: 8.9,
  scoresCount: 240,
  director: 'Wes Anderson',
  starring: ['Bill Murray'],
  runTime: 99,
  genre: 'Comedy',
  released: 2014,
  isFavorite: false,
} as Film);

export const makeFakeComment = (): Comment => ({
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director',
  date: 'Mon Apr 04 2022 18:45:35 GMT+0300 (Moscow Standard Time)',
  id: 1,
  rating: 8.9,
  user: {
    id: 4,
    name: 'Kate Muir',
  },
} as Comment);

export const makeFakeGenres = (): string[] => ['All genres', 'Adventure', 'Drama', 'Crime', 'Fantasy'];
