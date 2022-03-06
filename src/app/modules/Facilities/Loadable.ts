/**
 *
 * Asynchronously loads the component for Home
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Facilities = lazyLoad(
  () => import('./index'),
  (module) => module.Facilities,
);
