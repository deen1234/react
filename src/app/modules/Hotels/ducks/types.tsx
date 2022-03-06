import { Hotel } from 'app/modules/Config/ducks/types';

export interface HotelState {
  isLoading: boolean;
  isFailure: boolean;
  hotelErrorMessage: string;
  hotels: Hotel[] | null;
}

export interface GetHotelParams {
  city: string;
  date: string;
  time: string;
  adult: number;
  child: number;
  room_count: number;
  starting_price: number;
  ending_price: number;
  booking_hours: number[];
  room_types: number[];
  hotel_rating: number[];
  hotel_id: number;
}
