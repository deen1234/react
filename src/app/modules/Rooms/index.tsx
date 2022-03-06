/**
 *
 * Rooms
 *
 */

import React, { ReactElement } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HomeRoom from './homeRoom';
import RoomDetail from './roomDetail';

export const Rooms = (): ReactElement => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={HomeRoom} />
      <Route path={`${path}/:id`} component={RoomDetail} />
    </Switch>
  );
};
