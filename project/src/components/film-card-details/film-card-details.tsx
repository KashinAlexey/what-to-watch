type FilmCardDetailsProps = {
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
}

export const reformatRuntime = (runtime: number) => {
  let timeString;

  if (runtime < 60 ) {
    timeString = `${`${Math.trunc(runtime)}`.slice(-2)}m`;
  } else if (runtime < 1440) {
    timeString = `${`${Math.trunc(runtime / 60)}`.slice(-2)}h ${`${Math.trunc(runtime % 60)}`.slice(-2)}m`;
  } else {
    timeString = `${`${Math.trunc(runtime / 1440)}`.slice(-2)}d ${`${Math.trunc((runtime % 1440) / 60)}`.slice(-2)}h ${`${Math.trunc((runtime % 1440) % 60)}`.slice(-2)}m`;
  }

  return timeString;
};

function FilmCardDetails(props: FilmCardDetailsProps): JSX.Element {
  const {director,starring, runTime, genre, released} = props;
  const formatedRunTime = reformatRuntime(runTime);

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starring.map((name, index) => {
              const keyValue=`${index}-${name}`;
              return <span key={keyValue}>{name}< br/></span>;
            })}
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{formatedRunTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmCardDetails;
