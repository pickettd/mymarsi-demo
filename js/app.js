"use strict";angular.module("app",["ionic","pouchdb","app.controllers","app.routes","app.services","app.directives"]).run(["$ionicPlatform",function(o){o.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]);