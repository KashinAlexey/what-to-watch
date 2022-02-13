import React from 'react';
import MainScreen from '../main-screen/main-screen';
import FilmCard from '../film-card/film-card';

function App(): JSX.Element {
  return (
    <React.Fragment>
      <FilmCard />
      <MainScreen />
    </React.Fragment>
  );
}

export default App;
