"use strict";angular.module("app.services",[]).factory("$pouchDB",["pouchDB","$log",function(t,n){var e=null,r={};return window.PouchDB.plugin(window.List),r.setDatabase=function(n){try{e=t(n,{auto_compaction:!0,adapter:"idb"})}catch(r){if(window.cordova)e=t(n,{auto_compaction:!0,adapter:"websql",iosDatabaseLocation:"default"});else try{e=t(n,{auto_compaction:!0,adapter:"fruitdown"})}catch(r){e=t(n,{auto_compaction:!0})}}},r.sync=function(t){return e.sync(t,{live:!0,retry:!0})},r.get=function(t){return t.ok?e.get(t.id):n.error(t)},r.list=function(t,n){return void 0!==n?e.list(t,{query:{include_docs:!0,key:n}}):e.list(t,{query:{include_docs:!0}})},r.query=function(t,n,r){var o=!1;return void 0!==n&&(o=n),void 0!==r?e.query(t,{include_docs:o,key:r}):e.query(t,{include_docs:o})},r.getAll=function(t){return e.allDocs({include_docs:t})},r.save=function(t){return t._id?e.put(t):e.post(t)},r.retryUntilWritten=function(t){return e.get(t._id).then(function(n){return t._rev=n._rev,e.put(t)})["catch"](function(n){return 409===n.status?r.retryUntilWritten(t):e.put(t)})},r["delete"]=function(t,n){return e.remove(t,n)},r.destroy=function(){e.destroy()},r}]).service("BlankService",[function(){}]);