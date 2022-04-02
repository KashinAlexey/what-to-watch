import { useEffect } from 'react';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Loading from '../../components/loading/loading';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';

function MyListPage(): JSX.Element {
  const {favorites, isFavoritesLoaded} = useAppSelector(({GLOBAL_DATA}) => GLOBAL_DATA);

  useEffect(() => {
    store.dispatch(fetchFavoritesAction());
  }, []);

  if (!isFavoritesLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <Catalog
          favorites={favorites}
        />
      </section>

      <Footer />
    </div>
  );
}

export default MyListPage;

