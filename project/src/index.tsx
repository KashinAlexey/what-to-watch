import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';

const Setting = {
  FILMS_COUNT: 20,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      filmsCount = {Setting.FILMS_COUNT}
    />
  </React.StrictMode>,
  document.getElementById('root'));
