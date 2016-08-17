"use strict";angular.module("app.services").factory("localDataFactory",["$pouchDB","$q","$log","ImportFactory","$ionicPlatform","$timeout",function(e,t,n,a,i,s){var c={},o="https://mymarsi.cloudant.com/marsi-test-open-access";c.currentPerson={_id:"Default",name:"Default"},c.isReady=!1,c.processingPromise=null,c.selectedInspectionID=null,c.selectedInspection={},c.allInspectionIDs={},c.allUnits={data:{}},c.selectedVisit={},c.selectedTemplate={},c.showSections={data:{}},c.activeSync={state:!0};var r=function(){n.info("Device should be ready, setting up database"),e.setDatabase("mymarsi-demo-visits-websql"),c.activeSync.state=!1,e.sync(o).on("change",function(e){"pull"===e.direction&&(n.info("Got new data from cloudant so replacing all unit structure"),c.getAllUnits())}).on("paused",function(e){n.info("Cloud changes sync is waiting for new data"),c.getAllUnits()}).on("active",function(){c.activeSync.state=!0,n.info("Cloud changes sync is actively exchanging new data")})};c.removeTemplateSectionFromVisit=function(e,t){var n=c.selectedVisit.data[e].data[t],a=c.selectedTemplate.data[e].data[t];angular.forEach(n,function(e,t){angular.equals(e,a[t])&&delete n[t]}),angular.forEach(n.typesConditions,function(e,t){angular.equals(e,a.typesConditions[t])&&delete n.typesConditions[t]})},c.getAllUnits=function(){var t="getUnits/all-units-by-id";return e.query(t,!0).then(function(e){c.allUnits.data={},angular.forEach(e.rows,function(e){var t=e.doc;c.allUnits.data[t._id]=t}),c.activeSync.state=!1})},c.getQueryStubs=function(a,i){var s=t.defer();return e.query(i,!1,a).then(function(e){var t={};angular.forEach(e.rows,function(e){t[e.id]={_id:e.id,name:e.value}}),s.resolve(t)})["catch"](function(e){n.error(e),s.reject(e)}),s.promise},c.getAllDocumentIDs=function(){return e.getAll(!1).then(function(e){e.rows.length&&(c.allInspectionIDs={},angular.forEach(e.rows,function(e){c.allInspectionIDs[e.id]={_id:e.id}}))})};var l=function(e){n.error(e),c.selectedInspectionID=null,c.isReady=!1,c.processingPromise.reject(e)};return c.getInspectionData=function(a){return a===c.selectedInspectionID?c.isReady?t.when(c.selectedInspection):c.processingPromise.promise:(c.isReady=!1,c.processingPromise=t.defer(),c.selectedInspection={},c.selectedInspectionID=a,e.get({ok:!0,id:a}).then(function(t){n.info("Success getting sections from local db"),t.templateID?e.get({ok:!0,id:t.templateID}).then(function(n){c.selectedInspection=n,c.selectedTemplate=angular.copy(n),angular.merge(c.selectedInspection,t);var i="getInspectionVisits/visit-data-by-inspection-id";e.query(i,!0,a).then(function(e){angular.forEach(e.rows,function(e){angular.merge(c.selectedInspection.data,e.doc.data)}),c.isReady=!0,c.showSections.data={},c.processingPromise.resolve(c.selectedInspection)})["catch"](l)})["catch"](l):l("No inspection template")})["catch"](l),c.processingPromise.promise)},c.getVisitData=function(a){var i=t.defer();return e.get({ok:!0,id:a}).then(function(e){i.resolve(e)})["catch"](function(e){n.error(e),i.reject(e)}),i.promise},c.createNewVisit=function(e,t){var n=t._id,a=new Date,i=a.getTime(),s=a.toString(),o="Visit "+s,r=e+"/"+t.name+"/"+o;return angular.extend(c.selectedVisit,{_id:r,createdAt:i,name:o,type:"Visit",inspectionID:n,userID:c.currentPerson._id,userName:c.currentPerson.name,data:{}}),c.getInspectionData(t._id)},c.saveVisitData=function(e,t,n){c.selectedVisit.data[e]||(c.selectedVisit.data[e]={}),c.selectedVisit.data[e].data||(c.selectedVisit.data[e].data={}),c.selectedVisit.data[e].data[t]=angular.copy(n),c.removeTemplateSectionFromVisit(e,t),c.selectedVisit.data[e].data[t].markSectionComplete=!0,c.saveData(c.selectedVisit)},c.saveData=function(t){e.save(t).then(function(){n.info("Success saving change to db")})["catch"](function(a){409===a.status?e.retryUntilWritten(t):n.error(a)})},c.syncData=function(){return t.resolve(!0)},window.cordova?document.addEventListener("deviceready",r,!1):window.localStorage.ionicView?i.ready(r):s(r,2e3),c}]);