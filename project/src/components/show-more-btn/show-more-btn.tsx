type ShowMoreBtnProps = {
  showMoreBtnHandler: () => void;
}

function ShowMoreBtn(props: ShowMoreBtnProps): JSX.Element {
  const {showMoreBtnHandler} = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={showMoreBtnHandler}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMoreBtn;
