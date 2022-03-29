import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
