import React, { ReactElement, useEffect } from 'react';
import { Switch, Route, RouteComponentProps, useLocation } from 'react-router-dom';
import PageNotFound from 'app/pages/PageNotFound';

import {
  FACILITYBOOKING,
  FACILITYCONFIRMATION,
  HOMEFACILITY,
  HOMEROOM,
  MYRESERVATION,
  PROFILE,
  ROOMBOOKING,
  ROOMCONFIRMATION,
} from 'configs/routeNames';
import { FacilityConfirmation, RoomConfirmation } from 'app/pages/Confirmations';
import { FacilityBooking, RoomBooking } from 'app/pages/Bookings';
import { Home } from 'app/pages/Home';
import { Facilities } from 'app/pages/Facilities';
import { Rooms } from 'app/pages/Rooms';
import MyReservation from 'app/modules/Bookings/myReservation';
import Profile from 'app/modules/Auth/Profile';

const Pages = (props: RouteComponentProps): ReactElement => {
  const { path } = props.match;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);
  return (
    <div className="base">
      <Switch>
        <Route exact path={`${path}`} component={Home} />
        <Route path={`${path}${HOMEFACILITY}`} component={Facilities} />
        <Route path={`${path}${HOMEROOM}`} component={Rooms} />
        <Route path={`${path}${FACILITYCONFIRMATION}`} component={FacilityConfirmation} />
        <Route path={`${path}${ROOMCONFIRMATION}`} component={RoomConfirmation} />
        <Route path={`${path}${ROOMBOOKING}`} component={RoomBooking} />
        <Route path={`${path}${FACILITYBOOKING}`} component={FacilityBooking} />
        <Route path={`${path}${MYRESERVATION}`} component={MyReservation} />
        <Route path={`${path}${PROFILE}`} component={Profile} />

        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
};
export default Pages;
