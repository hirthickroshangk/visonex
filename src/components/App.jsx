import React from 'react';
import { CssBaseline } from '@mui/material';
import { Routes as Switch, Route } from 'react-router-dom';

import { Actors, MovieInformation, Movies, Navbar, Profile } from '.';
import useStyles from './styles';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/approved" element={<Movies />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/*" element={<Movies />} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
