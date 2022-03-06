/* eslint-disable no-debugger */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { EnvironmentFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import GoogleMapReact from 'google-map-react';
import './style.less';
import { useLocation } from 'react-router-dom';
import { getAvailableRooms } from 'app/modules/Rooms/ducks/services';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHotels, getFiltredHotels } from 'app/modules/Hotels/ducks/services';
import { RootState } from 'store/rootState';
import { getAvailableFacility } from 'app/modules/Facilities/ducks/services';
import { getTranslated } from 'utils/functions';
// import hotel from 'app/modules/Config/ducks/types';

interface MapProps {
  children: ReactNode;
  lat: string | number;
  lng: string | number;
}
// interface CoordinateProps {
//   lat: number | string;
//   lng: number | string;
//   hotel_id: number | null;
// }

interface HotelMapProps {
  lat?: number | string;
  lng?: number | string;
}
const AnyReactComponent = ({ children, lat, lng }: MapProps) => <div>{children}</div>;

const HotelMap = ({ lat, lng }: HotelMapProps): ReactElement => {
  const { state, pathname } = useLocation();
  const dispatch = useDispatch();
  const { isLoading, hotels } = useSelector(({ getHotels }: RootState) => getHotels);
  const { hotel_id } = state || {};

  const filterState = {
    ...state,
    hotel_id,
  };

  const defaultProps = {
    center: {
      lat: 23.8859,
      lng: 45.0792,
    },
    zoom: 6,
  };
  const onCoordClick = (id: number | null) => {
    filterState.hotel_id = id;

    if (pathname.includes('/home-facility')) {
      dispatch(getAvailableFacility(filterState));
    } else if (pathname.includes('/home-room')) {
      dispatch(getAvailableRooms(filterState));
    }
  };
  useEffect(() => {
    if (filterState.city > 0) {
      dispatch(getFiltredHotels(filterState));
    } else {
      dispatch(getAllHotels());
    }
  }, []);

  // const API_KEY = process.env.REACT_APP_MAP_API;
  return (
    // Important! Always set the container height explicitly
    <div className="map-container">
      {isLoading}
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBabzg8wjXpY0eVO7FA_9_6Ld0FgdJ32hE' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {!lat || !lng ? (
          hotels?.map((coord, key) => {
            const index = key + 1;
            return (
              <AnyReactComponent lat={coord.latitude} lng={coord.longitude} key={index}>
                <Tooltip color="primary" title={() => getTranslated('hotel_name', coord)}>
                  <EnvironmentFilled
                    onClick={() => onCoordClick(coord.id)}
                    className="pin-icon"
                    alt="true"
                  />
                </Tooltip>
                ,
              </AnyReactComponent>
            );
          })
        ) : (
          <AnyReactComponent lat={lat || ''} lng={lng || ''}>
            <EnvironmentFilled className="pin-icon" alt="true" />
          </AnyReactComponent>
        )}
      </GoogleMapReact>
    </div>
  );
};

HotelMap.defaultProps = {
  lat: '',
  lng: '',
};
export default HotelMap;
