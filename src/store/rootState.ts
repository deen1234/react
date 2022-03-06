import { ConfigState } from 'app/modules/Config/ducks/types';
import { AuthState } from 'app/modules/Auth/ducks/types';
import { BookingState } from 'app/modules/Confirmations/ducks/types';
import { FacilityState } from 'app/modules/Facilities/ducks/types';
import { RoomState } from 'app/modules/Rooms/ducks/types';
import { DirectionState } from 'app/molecules/Direction/ducks/types';
import { HotelState } from 'app/modules/Hotels/ducks/types';
// [IMPORT NEW REDUCER STATE ABOVE] < Needed for generating seamlessly

export interface RootState {
  config: ConfigState;
  auth: AuthState;
  availableFacility: FacilityState;
  availableRoom: RoomState;
  bookings: BookingState;
  direction: DirectionState;
  getHotels: HotelState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating seamlessly
}
