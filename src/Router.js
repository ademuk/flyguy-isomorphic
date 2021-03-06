import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import FlightsPage from './components/FlightsPage';
import FlightPage from './components/FlightPage';
import LogPage from './components/LogPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import sessionStore from './stores/SessionStore'

const router = new Router(on => {

  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/flights', async () => {
    const data = sessionStore.exists() ? await http.get(`/flights`) : {results: []};
    return <FlightsPage {...data} />;
  });

  on('/flights/:id', async (state) => {
    const data = await http.get(`/flights/${state.params.id}`);
    return <FlightPage {...data} />;
  });

  on('/log', async () => <LogPage />);

  on('/login', async () => <LoginPage />);

  on('/logout', async () => <LogoutPage />);

  on('/register', async () => <RegisterPage />);

  on('/', async () => <LoginPage />);

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );

});

export default router;
