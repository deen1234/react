import { Hotel } from 'app/modules/Config/ducks/types';
import { FacilityData } from 'app/modules/Facilities/ducks/types';
import { RoomData } from 'app/modules/Rooms/ducks/types';

export interface BookingState {
  bookingStatus: boolean;
  bookingErrorMessage: string;
  isLoading: boolean;
  isFailure: boolean;
  roomBookingData: BookingData | null;
  facilityBookingData: BookingData | null;
}

export interface BookingData {
  id: number;
  hotel_id: number;
  order_no: string;
  guest_id: number;
  amenity_availability_id?: number;
  amenity_price?: number;
  room_availability_id?: number;
  total_rooms?: number;
  room_price?: number;
  date: string;
  check_in: string;
  check_out: string;
  adult: number;
  child: number;
  status: number;
  slot_time: number;
  status_text: string;
  status_color: string;
  guest: GuestData;
  availability: RoomData & FacilityData;
  taxes: OrderTaxData[];
  hotel: Hotel;
}

export interface OrderTaxData {
  id: number;
  name: string;
  ar_name: string;
  percentage: number;
  booking_id: number;
}

export interface GuestData {
  id: number;
  hotel_id: number;
  booking_type: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  check_in: string;
  check_out: string;
  payment: number;
  booking_text: string;
  payment_text: string;
  payment_color: string;
}

interface GenObj {
  [key: string]: any;
}
export interface RoomBookingParams {
  order_no: string;
  onSuccess: (resp: GenObj) => void;
}

export interface BookingParams {
  id: number;
  onSuccess: (resp: GenObj) => void;
}
