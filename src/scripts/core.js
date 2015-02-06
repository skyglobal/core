var version  = require('./utils/version');
var event  = require('./api/event');
var detect  = require('./api/detect');

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['version'] = version;
skyComponents['event'] = event;
skyComponents['detect'] = detect;