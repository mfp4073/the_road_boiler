import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import EventsPage from './components/events/EventsPage';
import ManageEventPage from './components/events/ManageEventPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="home" component={HomePage} />
    <Route path="events" component={EventsPage} />
    <Route path="event" component={ManageEventPage} />
    <Route path="event/:id" component={ManageEventPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
