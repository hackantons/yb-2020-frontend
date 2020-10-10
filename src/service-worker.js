import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

skipWaiting();
clientsClaim();

registerRoute(
  new RegExp(/\.(?:png|gif|jpg|svg|ico|webp)$/),
  new CacheFirst({
    cacheName: 'image-cache',
  }),
  'GET'
);

// The precache routes for workbox-webpack-plugin
precacheAndRoute(self.__WB_MANIFEST);
//console.log(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// listen to the install event
self.addEventListener('install', event => console.log('SW installed', event));