export interface ConfigState {
  data: ConfigData | null;
  configStatus: boolean;
  configErrorMessage: string;
  isLoading: boolean;
  isFailure: boolean;
}

interface ConfigData {
  cities: City[];
  facility_types: FacilityType[];
  room_types: RoomType[];
  service_types: ServiceType[];
}

export interface City {
  id: number;
  name: string;
  ar_name: string;
}

export interface FacilityType {
  id: number;
  name: string;
  ar_name: string;
}

export interface RoomType {
  id: number;
  name: string;
  ar_name: string;
}

export interface ServiceType {
  id: number;
  name: string;
}

export interface HotelRoomPictures {
  id: number;
  hotel_id: number;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  image_url: string;
}

export interface HotelServices {
  id: number;
  hotel_id: number;
  service: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface HotelAmenities {
  id: number;
  hotel_id: number;
  amenity: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface Hotel {
  id: number;
  user_id: number;
  city_id: number;
  hotel_name: string;
  ar_hotel_name: string;
  hotel_email: string;
  hotel_phone: string;
  hotel_address: string;
  ar_hotel_address: string;
  hotel_logo: null;
  hotel_rating: number;
  latitude: number | string;
  longitude: number | string;
  website_link: string;
  social_media: string;
  description: string;
  ar_description: string;
  house_rules: string;
  ar_house_rules: string;
  online: number;
  pay_at_hotel: number;
  status: boolean;
  commission: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  logo_url: string;
  feature_image_url: string;
  city: City[];
  pictures: HotelRoomPictures[];
  services: HotelServices[];
  amenities: HotelAmenities[];
}

export interface Id {
  id: string;
}
