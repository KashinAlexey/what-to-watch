import { Films } from '../../types/film';
import FilmCardSmall from '../film-card-small/film-card-small';

type FilmListProps = {
  films: Films;
}

function FilmList(props: FilmListProps): JSX.Element {
  const {films} = props;

  const Cards = new Set();
  for (let number = 0; number < films.length; number++){
    Cards.add(
      <FilmCardSmall
        key={films[number].id.toString()}
        film={films[number]}
      />);
  }

  return (
    <div className="catalog__films-list">
      {Cards}
    </div>
  );
}

export default FilmList;
