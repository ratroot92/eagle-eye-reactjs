/**
 * Asynchronously loads the component for TwitterCrawler
 */

import { lazyLoad } from 'utils/loadable';

export const TwitterRapidSerach = lazyLoad(
  () => import('./index'),
  module => module.TwitterRapidSerach,
);
