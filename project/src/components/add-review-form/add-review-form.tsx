import {FormEvent, useState, Fragment} from 'react';
import { AppRoute, MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../const';
import {useAppSelector} from '../../hooks/index';
import { store } from '../../store';
import { fetchCommentAction } from '../../store/api-actions';
import { isUserAuth } from '../../utils';
import {ShortComment} from '../../types/comment';
import { useNavigate } from 'react-router-dom';

function AddReviewsForm(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const {film} = useAppSelector(({LOCAL_DATA}) => LOCAL_DATA);
  const {id} = film;
  const isAuth = isUserAuth(authorizationStatus);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    review: '',
    rating: 0,
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const isValid = formData.rating !== null && formData.review !== '' && formData.review.length <= MAX_REVIEW_LENGTH && formData.review.length >= MIN_REVIEW_LENGTH && formData.rating > 0;

  const fieldChangeHandle = (evt: { target: { name: string; value: string; }; }) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const ratingChangeHandle = (evt: { target: { name: string; value: string; }; }) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: +value});
  };

  const onSubmit = async (reviewData: ShortComment) => {
    setIsDisabled(true);
    await store.dispatch(fetchCommentAction(reviewData));
    setFormData({
      review: '',
      rating: 0,
    });
    setIsDisabled(false);
    navigate(`${AppRoute.Film}/${id}`);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      comment: formData.review,
      rating: formData.rating,
      id: film.id,
    });
  };

  return (
    <div className="add-review">
      <form
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          handleSubmit(evt);
        } }
        action="#"
        className="add-review__form"
        hidden={!isAuth}
      >
        <div className="rating__stars">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating, index) => {
            const keyValue = `${index}-${rating}`;
            return (
              <Fragment key={keyValue}>
                <input
                  onChange={ratingChangeHandle}
                  className="rating__input"
                  id={`star-${rating}`}
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={rating === formData.rating}
                  disabled={isDisabled}
                />
                <label
                  className="rating__label"
                  htmlFor={`star-${rating}`}
                >
                  Rating {rating}
                </label>
              </Fragment>
            );
          })}
        </div>

        <div className="add-review__text">
          <textarea
            onChange={fieldChangeHandle}
            value={formData.review}
            className="add-review__textarea"
            name="review"
            id="review-text"
            disabled={isDisabled}
            placeholder="Review text"
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isValid || isDisabled}>Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default AddReviewsForm;

