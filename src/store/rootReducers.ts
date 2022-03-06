/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { reducer as AvailableFacilityReducer } from 'app/modules/Facilities/ducks/slice';
import { reducer as AvailableRoomReducer } from 'app/modules/Rooms/ducks/slice';
import { reducer as configReducer } from 'app/modules/Config/ducks/slice';
import { reducer as BookingsReducer } from 'app/modules/Confirmations/ducks/slice';
import { reducer as AuthSlice } from 'app/modules/Auth/ducks/slice';
import { reducer as DirectionReducer } from 'app/molecules/Direction/ducks/slice';
import { reducer as HotelSlice } from 'app/modules/Hotels/ducks/slice';

// [IMPORT NEW REDUCER ABOVE] < Needed for generating seamlessly

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(): Reducer {
  return combineReducers({
    availableFacility: AvailableFacilityReducer,
    availableRoom: AvailableRoomReducer,
    bookings: BookingsReducer,
    config: configReducer,
    direction: DirectionReducer,
    auth: AuthSlice,
    getHotels: HotelSlice,
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating seamlessly
  });
}
