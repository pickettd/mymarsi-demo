"use strict";angular.module("app.services",[]).factory("$pouchDB",["pouchDB","$log",function(t,n){var e=null,r={};return window.PouchDB.plugin(window.List),r.setDatabase=function(r){try{e=t(r,{auto_compaction:!0,adapter:"idb"})}catch(o){try{e=t(r,{auto_compaction:!0,adapter:"fruitdown"})}catch(u){try{e=t(r,{auto_compaction:!0})}catch(c){n.error(c)}}}e.info().then(function(t){n.info(t)})["catch"](function(t){n.error(t)})},r.replicate=function(t,n){return window.PouchDB.replicate(t,n,{live:!0,retry:!0,batch_size:1,timeout:1e5})},r.sync=function(t){return e.sync(t)},r.get=function(t){return t.ok?e.get(t.id):n.error(t)},r.getAttachment=function(t,n){return e.getAttachment(t,n)},r.putAttachment=function(t,n,r,o,u){return e.putAttachment(t,n,r,o,u)},r.getRevAndPutAttachment=function(t,o,u,c){return e.get(t).then(function(n){return r.putAttachment(t,o,n._rev,u,c)})["catch"](function(e){if(404===e.status)return r.putAttachment(t,o,void 0,u,c);throw n.error(e),e})},r.list=function(t,n){return void 0!==n?e.list(t,{query:{include_docs:!0,key:n}}):e.list(t,{query:{include_docs:!0}})},r.query=function(t,n,r){var o=!1;return void 0!==n&&(o=n),void 0!==r?e.query(t,{include_docs:o,key:r}):e.query(t,{include_docs:o})},r.getAll=function(t){return e.allDocs({include_docs:t})},r.save=function(t){return t._id?e.put(t):e.post(t)},r.retryUntilWritten=function(t){return e.get(t._id).then(function(n){return t._rev=n._rev,e.put(t)})["catch"](function(n){return 409===n.status?r.retryUntilWritten(t):e.put(t)})},r["delete"]=function(t,n){return e.remove(t,n)},r.destroy=function(){return e.destroy()},r}]).factory("dropbox",["$log","$pouchDB",function(t,n){var e={},r=null;return e.hasToken=function(){return null!==r},e.getToken=function(){return n.get({ok:!0,id:"!access"}).then(function(t){r=new Dropbox({accessToken:t.dropbox})})["catch"](function(n){t.error(n)})},e.upload=function(n,e,o){return r.filesUpload({path:o+"/"+n,contents:e}).then(function(n){return t.info("File uploaded!"),t.info(n),n})["catch"](function(n){return t.error(n),null})},e}]).service("BlankService",[function(){}]);