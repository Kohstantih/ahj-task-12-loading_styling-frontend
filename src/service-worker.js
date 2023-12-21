importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const urlNews = 'http://localhost:7000/news/last';

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
