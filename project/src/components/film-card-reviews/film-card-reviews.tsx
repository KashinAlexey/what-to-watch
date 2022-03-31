import { Comments } from '../../types/comment';

type FilmCardReviewsProps = {
  comments: Comments;
}

const REVIEWS_COL = 3;

const getNumbersArr = (numbersCount: number) => {
  const numbersArr = [];

  for (let i = 0; i < numbersCount; i++) {
    numbersArr.push(i);
  }

  return numbersArr;
};

const getFormattedDate = (date: string) => {
  const event = new Date(date);
  return event.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

function FilmCardReviews(props: FilmCardReviewsProps): JSX.Element {
  const {comments} = props;
  const reviewsCol = getNumbersArr(Math.round(comments.length / REVIEWS_COL));

  return (
    <div className="film-card__reviews film-card__row">
      {reviewsCol.map((numIndex) => {
        const keyValue=`${numIndex}`;
        return (
          <div key={keyValue} className="film-card__reviews-col">
            {comments.slice().map((_comment, index) => {
              const commentKeyValue=`${index}-${_comment}`;
              const {comment, user, date, rating} = _comment;
              const {name} = user;
              const formattedDate = getFormattedDate(date);
              return (
                <div key={commentKeyValue} className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">{comment}</p>

                    <footer className="review__details">
                      <cite className="review__author">{name}</cite>
                      <time className="review__date" dateTime={formattedDate}>{formattedDate}</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">{rating}</div>
                </div>
              );
            })}

          </div>
        );
      })}
    </div>
  );
}

export default FilmCardReviews;
