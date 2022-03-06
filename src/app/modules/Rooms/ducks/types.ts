import { RoomType, Hotel } from 'app/modules/Config/ducks/types';

export interface RoomState {
  availableRoomStatus: boolean;
  isLoading: boolean;
  isFailure: boolean;
  availableRoomErrorMessage: string;
  roomsData: RoomData[] | null;
  avalibleRoomsData: RoomData | null;
  bookedRoomData: BookRoom | null;
  hotelTax: HotelTaxData[] | null;
}

export interface HotelTaxData {
  id: number;
  hotel_id: number;
  name: string;
  ar_name: string;
  percentage: number;
}

export interface BookRoom {
  room_availability_id: number;
  total_rooms: number;
  date: string;
  check_in: string;
  adult: number;
  child: number;
  slot_time: number;
  status: number;
  hotel_id: number;
  room_price: number;
  guest_id: number;
  order_no: string;
  check_out: string;
  id: number;
  status_text: string;
  status_color: string;
}

export interface RoomBookingBody {
  room_availability_id: number;
  total_rooms: number;
  date: any;
  check_in: string;
  adult: number;
  child: number;
  slot_time: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  user_id?: number;
}
export interface RoomData {
  id: number;
  hotel_id: number;
  room_id: number;
  room_count: number;
  start_date: string;
  end_date: string;
  check_in: string;
  check_out: string;
  slot_time: number;
  price_per_night: number;
  price_per_hour: number;
  cleaning_hours: number;
  minimum_stay: number;
  payment_method: number;
  cleaning_hour: number;
  cleaning_min: number;
  payment_text: string;
  hotel_name: string;
  ar_hotel_name: string;
  hotel_rating: string;
  feature_image_url: string;
  room: Room;
  hotel: Hotel;
  taxes: any;
  room_booked: string;
}

interface Room {
  id: number;
  hotel_id: number;
  room_type_id: number;
  no_of_guest: number;
  room_space: number;
  pictures: RoomPictures[];
  services: Services[];
  room_type: RoomType;
}

interface RoomPictures {
  id: number;
  room_id: number;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  image_url: string;
}

interface Services {
  id: number;
  room_id: number;
  hotel_service_id: number;
  service_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}
interface GenObj {
  [key: string]: any;
}
export type onSuccessFunc = (resp: GenObj) => void;

export interface bookedPara {
  body: RoomBookingBody;
  onSuccess?: onSuccessFunc;
}
