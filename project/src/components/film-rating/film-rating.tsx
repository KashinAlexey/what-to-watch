type FilmRatingProps = {
  rating: number;
  scoresCount: number;
}

export const getRating = (ratingCount: number) => {
  let rating = '';

  if (ratingCount > 10) {
    rating = 'Awesome';
  } else if (ratingCount <= 10 && ratingCount > 8) {
    rating = 'Very good';
  } else if (ratingCount <= 8 && ratingCount > 5) {
    rating = 'Good';
  } else if (ratingCount <= 5 && ratingCount > 3) {
    rating = 'Normal';
  } else {
    rating = 'Bad';
  }

  return rating;
};

function FilmRating(props: FilmRatingProps): JSX.Element {
  const {rating, scoresCount} = props;

  return (
    <div className="film-rating">
      <div className="film-rating__score">{rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{getRating(rating)}</span>
        <span className="film-rating__count">{scoresCount} ratings</span>
      </p>
    </div>
  );
}

export default FilmRating;
