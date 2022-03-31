type FilmCardOverviewProps = {
  description: string;
  director: string;
  starring: string[];
}

function FilmCardOverview(props: FilmCardOverviewProps): JSX.Element {
  const {description, director, starring} = props;

  return (
    <div className="film-card__text">
      <p>{description}</p>

      <p className="film-card__director"><strong>Director: {director}</strong></p>

      <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
    </div>
  );
}

export default FilmCardOverview;
