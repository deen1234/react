import { FacilityType, Hotel } from 'app/modules/Config/ducks/types';

export interface FacilityState {
  availableFacilityStatus: boolean;
  isLoading: boolean;
  isFailure: boolean;
  availableFacilityErrorMessage: string;
  facilitiesData: FacilityData[] | null;
  avalibleFacilitiesData: FacilityData | null;
  bookedFacilityData: BookFacility | null;
}

export interface BookFacility {
  amenity_availability_id: number;
  date: string;
  check_in: string;
  adult: number;
  child: number;
  slot_time: number;
  status: number;
  hotel_id: number;
  amenity_price: number;
  guest_id: number;
  order_no: string;
  check_out: string;
  id: number;
  status_text: string;
  status_color: string;
}

export interface FacilityBookingBody {
  amenity_availability_id: number;
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
export interface GetRoomParams {
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

export interface GetFacilityParams {
  city: string;
  facility_type: string;
  date: string;
  time: string;
  adult: number;
  child: number;
  starting_price: number;
  ending_price: number;
  amenity_category: number[];
  hotel_rating: number[];
  hotel_id: number;
}

export interface FacilityData {
  id: number;
  hotel_id: number;
  amenity_id: number;
  total_hours: number;
  reservation_period: number;
  capacity_per_period: number;
  start_date: string;
  end_date: string;
  check_in: string;
  check_out: string;
  maintainence: number;
  price: number;
  total_hour: number;
  total_min: number;
  reservation_hour: number;
  reservation_min: number;
  maintainence_hour: number;
  maintainence_min: number;
  payment_text: string;
  hotel_name: string;
  ar_hotel_name: string;
  hotel_rating: string;
  feature_image_url: string;
  amenity: Facility;
  hotel: Hotel;
  taxes: any;
}

interface Facility {
  id: number;
  amenity_category: number;
  hotel_id: number;
  amenity_type_id: number;
  amenity_name: string;
  ar_amenity_name: string;
  no_of_guest: number;
  reservation_period: number;
  description: string;
  ar_description: string;
  instructions: string;
  ar_instructions: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  category_text: string;
  amenity_type: FacilityType;
  pictures: FacilityPictures[];
}

interface FacilityPictures {
  id: number;
  amenity_id: number;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  image_url: string;
}

interface GenObj {
  [key: string]: any;
}
export type onSuccessFunc = (resp: GenObj) => void;

export interface bookedPara {
  body: FacilityBookingBody;
  onSuccess?: onSuccessFunc;
}
