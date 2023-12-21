/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/service-worker.js ***!
  \*******************************/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');
workbox.core.skipWaiting();
workbox.core.clientsClaim();
const urlNews = 'http://localhost:7000/news/last';
workbox.precaching.precacheAndRoute([{'revision':'f6f3adccc07a2c7e153eeec77067d973','url':'index.html'},{'revision':'d41d8cd98f00b204e9800998ecf8427e','url':'licenses.txt'},{'revision':'474fda8b3a98f88e375f8ed7760f50a6','url':'main.css'},{'revision':'460b7ca7ab8d00b0fa86d2f9e362196f','url':'main.js'}]);
/******/ })()
;
//# sourceMappingURL=sw.js.map