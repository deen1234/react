/**
 *
 * Facilities
 *
 */

import React, { ReactElement } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import HomeFacility from './homeFacility';
import FacilityDetail from './facilityDetail';

export const Facilities = (): ReactElement => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={HomeFacility} />
      <Route path={`${path}/:id`} component={FacilityDetail} />
    </Switch>
  );
};
