(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var version  = require('./utils/version.js');

// By default JS dependency is handled using browserify
// please see 'GULP-TASKS.md#js' for more info
//
// You may need another component:
// run : $ bower install bskyb-event --save
// then add
// var event = require('../../bower_components/bskyb-event/src/js/event');

//example function and export
function sum(args){
    var total = 0;
    args.forEach(function(int){
        total += int;
    });
    return total;
}

module.exports = {
    sum: sum,
    version: version
};

if (typeof skyComponents === "undefined") window.skyComponents = {};
skyComponents['core'] = module.exports;
},{"./utils/version.js":3}],2:[function(require,module,exports){
var local; local['core'] = require('./core');

if (typeof window.define === "function" && window.define.amd) {
    define('bower_components/bskyb-core/dist/js/core.requirejs', [], function() {
        'use strict';
        return local['core'];
    });
}
},{"./core":1}],3:[function(require,module,exports){
module.exports = "0.0.0";
},{}]},{},[2]);
