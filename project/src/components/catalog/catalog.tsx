import { Films } from '../../types/film';
import FilmCardSmall from '../film-card-small/film-card-small';

type CatalogProps = {
  favorites: Films;
}

function Catalog(props: CatalogProps): JSX.Element {
  const {favorites} = props;

  return (
    <div className="catalog__films-list">
      {favorites.map((favorite, index) => {
        const {id} = favorite;
        const keyValue = `${index}-${id}`;
        return (
          <FilmCardSmall
            key={keyValue}
            film={favorite}
          />
        );
      })}
    </div>
  );
}

export default Catalog;
