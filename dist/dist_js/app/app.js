"use strict";angular.module("app",["ionic","ngSanitize","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.overlayplay","pouchdb","slugifier","cp.ng.fix-image-orientation","app.controllers","app.routes","app.services","app.directives"]).config(["pouchDBProvider","POUCHDB_METHODS",function(o,i){var n={list:"qify"};o.methods=angular.extend({},i,n)}]).config(["$compileProvider",function(o){o.debugInfoEnabled(!1)}]).config(["$ionicConfigProvider",function(o){o.scrolling.jsScrolling(!1),o.views.maxCache(0)}]).run(["$ionicPlatform",function(o){o.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]);