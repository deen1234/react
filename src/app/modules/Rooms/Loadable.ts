/**
 *
 * Asynchronously loads the component for Rooms
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Rooms = lazyLoad(
  () => import('./index'),
  (module) => module.Rooms,
);
