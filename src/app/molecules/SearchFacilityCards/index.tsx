import { Col, Row, Grid } from 'antd';
import FacilityDetailCard from 'app/atoms/FacilityDetailCard';
import MobileDetailCard from 'app/atoms/MobileDetailCard';
import { FacilityData } from 'app/modules/Facilities/ducks/types';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { getTranslated } from 'utils/functions';

const { useBreakpoint } = Grid;

interface SearchFacilityCardProps {
  dataLists: FacilityData[];
}

const SearchFacilityCards = ({ dataLists }: SearchFacilityCardProps): ReactElement => {
  const { state } = useLocation();

  const screens = useBreakpoint();
  const isMobile = screens.md === false && (screens.sm === true || screens.xs === true);

  return (
    <Row gutter={[0, 32]} className="search-facility-card-container">
      {dataLists?.map((list) => (
        <Col lg={24} key={list.id}>
          {isMobile ? (
            <MobileDetailCard
              displayImg={list.feature_image_url}
              title={getTranslated('hotel_name', list)}
              rateCount={list.hotel_rating}
              tagName={list.payment_text}
              facilityType={getTranslated('name', list.amenity.amenity_type)}
              facilityName={getTranslated('amenity_name', list.amenity)}
              numberOfGuest={list.amenity.no_of_guest}
              numberOfMinuts={list.reservation_period}
              price={list.price}
              locationState={state}
              routeTo={`/home-facility/${list.id}`}
              taxes={list.taxes}
              total_hours={list.total_hours}
              reservation_period={list.reservation_period}
              check_out={list.check_out}
            />
          ) : (
            <FacilityDetailCard
              displayImg={list.feature_image_url}
              title={getTranslated('hotel_name', list)}
              rateCount={list.hotel_rating}
              tagName={list.payment_text}
              facilityType={getTranslated('name', list.amenity.amenity_type)}
              facilityName={getTranslated('amenity_name', list.amenity)}
              numberOfGuest={list.amenity.no_of_guest}
              numberOfMinuts={list.reservation_period}
              price={list.price}
              locationState={state}
              routeTo={`/home-facility/${list.id}`}
              total_hours={list.total_hours}
              reservation_period={list.reservation_period}
              taxes={list.taxes}
              check_out={list.check_out}
            />
          )}
        </Col>
      ))}
    </Row>
  );
};

export default SearchFacilityCards;
