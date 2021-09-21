import React, {Suspense} from 'react';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import AppBar from './components/AppBar';
import MovieList from './components/MovieList';
import User from './components/User';
import MovieTheater from './components/MovieTheater';
import TicketList from './components/TicketList';

const Notice = React.lazy(() => import('./components/Notice'));

/**
 * Simple Logo
 */
const Logo = function () {
  return (
    <>
      <span className="font-bold text-3xl text-blue-700">OCB</span>
      <span className="text-3xl text-blue-500">Cinema</span>
    </>
  );
}

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <AppBar elevation={3}>
        <div className="flex-grow">
          <Link to="/"><Logo></Logo></Link>
        </div>
        <User></User>
      </AppBar>
      <div className="p-3">
        <Suspense fallback={<div></div>}>
          <Notice></Notice>
        </Suspense>
        <Switch>
          <Route path="/movie/:movieId">
            <MovieTheater></MovieTheater>
          </Route>
          <Route path="/tickets">
            <TicketList></TicketList>
          </Route>
          <Route path="/">
            <MovieList></MovieList>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
