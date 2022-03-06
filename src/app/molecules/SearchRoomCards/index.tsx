import { Col, Row, Grid } from 'antd';
import MobileDetailCard from 'app/atoms/MobileDetailCard';
import RoomDetailCard from 'app/atoms/RoomDetailCard';
import { RoomData } from 'app/modules/Rooms/ducks/types';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { getTranslated } from 'utils/functions';

const { useBreakpoint } = Grid;

interface SearchRoomCardsProps {
  dataLists: RoomData[];
}

const SearchRoomCards = ({ dataLists }: SearchRoomCardsProps): ReactElement => {
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
              roomType={getTranslated('name', list.room.room_type)}
              noOfGuest={list.room.no_of_guest}
              price={list.price_per_night}
              minimum_stay={list.minimum_stay}
              slot_time={list.slot_time}
              locationState={state}
              routeTo={`/home-room/${list.id}`}
              taxes={list.taxes}
              price_per_hour={list.price_per_hour}
              room_booked={list.room_booked || ''}
              total_room_count={list.room_count}
              check_out={list.check_out}
            />
          ) : (
            <RoomDetailCard
              displayImg={list.feature_image_url}
              title={getTranslated('hotel_name', list)}
              rateCount={list.hotel_rating}
              tagName={list.payment_text}
              roomType={getTranslated('name', list.room.room_type)}
              noOfGuest={list.room.no_of_guest}
              price={list.price_per_night}
              minimum_stay={list.minimum_stay}
              slot_time={list.slot_time}
              price_per_hour={list.price_per_hour}
              locationState={state}
              routeTo={`/home-room/${list.id}`}
              taxes={list.taxes}
              check_out={list.check_out}
              room_booked={list.room_booked || ''}
              total_room_count={list.room_count}
            />
          )}
        </Col>
      ))}
    </Row>
  );
};

export default SearchRoomCards;
