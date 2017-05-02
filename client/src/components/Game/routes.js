import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import higher order components
import RequireAuth from '../auth/require_auth';

import Game from './components/index.js'

export default (
  <Route path='game'>
    <IndexRoute component={Game} />
  </Route>
);
    // <Route path='messages' component={RequireAuth(Messages)} />
    // <Route path='character/:name/attack' component={RequireAuth(AttackCharacter)} />
    // <Route path='location/:name' component={RequireAuth(Location)} />
    // <Route path='location/:name/charms' component={RequireAuth(Charms)} />
    // <Route path='location/:name/supply' component={RequireAuth(Supply)} />
    // <Route path='location/:name/occupants' component={RequireAuth(Occupants)} />
    // <Route path='location/:name/attack' component={RequireAuth(SendTroops)} />
    // <Route path='location/:name/steal' component={RequireAuth(Steal)} />
    // <Route path='location/:name/sneak' component={RequireAuth(Sneak)} />