"use strict";angular.module("app.services").factory("localDataFactory",["$pouchDB","$q","$log","ImportFactory","$ionicPlatform","$timeout",function(e,t,n,i,a,c){var s={},o="https://mymarsi.cloudant.com/marsi-real-world-v3";s.currentPerson={_id:"Kim",name:"Kim"},s.isReady=!1,s.processingPromise=null,s.selectedInspectionID=null,s.selectedInspection={},s.allInspectionIDs={},s.allUnits={data:{}},s.selectedVisit={},s.selectedTemplate={},s.showSections={data:{}},s.activeSync={state:!0},s.withoutTemplate=void 0,s.getAttachment=e.getAttachment,s.currentInspectionTemplateOptions=i.currentInspectionTemplateOptions;var r=function(){n.info("Device should be ready, setting up database"),e.setDatabase("mymarsi-beta-visits-v2-1"),s.activeSync.state=!1,e.sync(o).on("change",function(e){"pull"===e.direction&&(n.info("Got new data from cloudant so replacing all unit structure"),s.getAllUnits())}).on("paused",function(e){n.info("Cloud changes sync is waiting for new data"),s.getAllUnits()}).on("active",function(){s.activeSync.state=!0,n.info("Cloud changes sync is actively exchanging new data")})};s.removeTemplateSectionFromVisit=function(e,t){var n=s.selectedVisit.data[e].data[t],i=s.selectedTemplate.data[e].data[t];angular.forEach(n,function(e,t){angular.equals(e,i[t])&&delete n[t]}),angular.forEach(n.typesConditions,function(e,t){angular.equals(e,i.typesConditions[t])&&delete n.typesConditions[t]})},s.getAllUnits=function(){var t="getUnits/all-units-by-id";return e.query(t,!0).then(function(e){s.allUnits.data={},angular.forEach(e.rows,function(e){var t=e.doc;s.allUnits.data[t._id]=t}),s.activeSync.state=!1})},s.getQueryStubs=function(i,a){var c=t.defer();return e.query(a,!1,i).then(function(e){var t={};angular.forEach(e.rows,function(e){t[e.id]={_id:e.id,name:e.value}}),c.resolve(t)})["catch"](function(e){n.error(e),c.reject(e)}),c.promise},s.getAllDocumentIDs=function(){return e.getAll(!1).then(function(e){e.rows.length&&(s.allInspectionIDs={},angular.forEach(e.rows,function(e){s.allInspectionIDs[e.id]={_id:e.id}}))})};var u=function(e){n.error(e),s.selectedInspectionID=null,s.isReady=!1,s.processingPromise.reject(e)};s.getInspectionData=function(i,a){return i===s.selectedInspectionID&&s.withoutTemplate===a?s.isReady?t.when(s.selectedInspection):s.processingPromise.promise:(s.withoutTemplate=a,s.isReady=!1,s.processingPromise=t.defer(),s.selectedInspection={},s.selectedInspectionID=i,e.get({ok:!0,id:i}).then(function(t){n.info("Success getting sections from local db"),t.templateID?e.get({ok:!0,id:t.templateID}).then(function(n){a?s.selectedInspection={data:{}}:s.selectedInspection=n,s.selectedTemplate=angular.copy(n),angular.merge(s.selectedInspection,t);var c="getInspectionVisits/visit-data-by-inspection-id";e.query(c,!0,i).then(function(e){angular.forEach(e.rows,function(e){angular.merge(s.selectedInspection.data,e.doc.data)}),s.isReady=!0,s.showSections.data={},s.processingPromise.resolve(s.selectedInspection)})["catch"](u)})["catch"](u):u("No inspection template")})["catch"](u),s.processingPromise.promise)},s.getVisitData=function(i){var a=t.defer();return e.get({ok:!0,id:i}).then(function(e){a.resolve(e)})["catch"](function(e){n.error(e),a.reject(e)}),a.promise},s.createNewVisit=function(e,t){var n=t._id,i=new Date,a=i.getTime(),c=i.toString(),o="Visit "+c,r=e+"/"+t.name+"/"+o;return angular.extend(s.selectedVisit,{_id:r,createdAt:a,name:o,type:"Visit",inspectionID:n,userID:s.currentPerson._id,userName:s.currentPerson.name,data:{}}),s.getInspectionData(t._id)},s.saveVisitData=function(e,t,n){s.selectedVisit.data[e]||(s.selectedVisit.data[e]={}),s.selectedVisit.data[e].data||(s.selectedVisit.data[e].data={}),s.selectedVisit.data[e].data[t]=angular.copy(n),s.removeTemplateSectionFromVisit(e,t),s.selectedVisit.data[e].data[t].markSectionComplete=!0,s.saveData(s.selectedVisit)},s.saveData=function(t){e.save(t).then(function(){n.info("Success saving change to db")})["catch"](function(i){409===i.status?e.retryUntilWritten(t):n.error(i)})};var l=function(t){return e.get({ok:!0,id:s.selectedVisit._id}).then(function(e){return e._attachments?(s.selectedVisit._attachments=e._attachments,e._attachments):void 0})};return s.saveAttachment=function(t,i){return window.blobUtil.dataURLToBlob(t.src).then(function(a){return e.get({ok:!0,id:s.selectedVisit._id}).then(function(n){return e.putAttachment(n._id,t._id,n._rev,a,i).then(l)})["catch"](function(c){if(404===c.status)return e.save(s.selectedVisit).then(function(n){return e.putAttachment(s.selectedVisit._id,t._id,n.rev,a,i).then(l)});throw n.error(c),c})}).then(function(){return n.info("Success saving attachment to db"),1})["catch"](function(e){n.error(e)})},s.createNewUnit=function(t){var i=t.name.trim().toUpperCase();return e.get({ok:!0,id:i}).then(function(e){return n.error("Tried to create new unit with non-unique name"),e})["catch"](function(a){if(404===a.status){var c={_id:i,name:t.name,type:"Unit",unitTemplate:t.unitTemplate};return e.save(c).then(function(){return n.info("Created new unit, so replacing all unit structure"),s.getAllUnits(),i})["catch"](function(e){n.error(e)})}n.error(a)})},s.createNewInspection=function(t,a){var c={_id:t._id+"/Inspection "+(new Date).getTime(),propertyID:t._id,propertyName:t.name,name:a,type:"Inspection",checklistVersion:i.currentChecklistDisplayVersion,templateID:t.unitTemplate._id};return e.save(c).then(function(){n.info("Created new inspection")})["catch"](function(e){n.error(e)})},s.syncData=function(){return t.resolve(!0)},window.localStorage.ionicView?a.ready(r):c(r,0),s}]);