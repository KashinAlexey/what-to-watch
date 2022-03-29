import React from 'react';
import MainScreen from '../main-page/main-page';
import FilmCard from '../../components/film-card/film-card';

type AppScreenProps = {
  filmsCount: number;
}

function App({filmsCount}: AppScreenProps): JSX.Element {
  return (
    <React.Fragment>
      <FilmCard />
      <MainScreen filmsCount={filmsCount}/>
    </React.Fragment>
  );
}

export default App;
