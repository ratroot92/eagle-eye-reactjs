/**
 * Asynchronously loads the component for TwitterCrawler
 */

import { lazyLoad } from 'utils/loadable';

export const TwitterCrawler = lazyLoad(
  () => import('./index'),
  module => module.TwitterCrawler,
);
