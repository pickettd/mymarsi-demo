"use strict";angular.module("app.controllers",[]).controller("projectsCtrl",["$scope",function(t){}]).controller("inventoryCtrl",["$scope","localDataFactory","$log","$state",function(t,e,n,i){angular.equals(e.selectedVisit,{})&&i.go("home"),t.$on("$ionicView.leave",function(){t.$destroy()}),t.inventory={},e.selectedVisit._id?t.inventory.displayTitle=e.selectedVisit._id:t.inventory.displayTitle="",e.getInspectionData(e.selectedInspectionID).then(function(n){t.inventory.selectedPropertyName=n.propertyName,t.inventory.displayTitle=e.selectedVisit._id;var i=n.checklistVersion;if(i||(i="v1"),t.inventory.checklistVersion=i,n.data.Inventory.data.All){var o="inventory.items";t.$watch(o,function(t,n){angular.equals(t,n)||(e.selectedInspection.data.Inventory.data.All=t,e.saveVisitData("Inventory","All",t))},!0),t.inventory.items=n.data.Inventory.data.All}})["catch"](function(t){n.error(t)})}]).controller("maintenanceCtrl",["$scope",function(t){}]).controller("factsCtrl",["$scope",function(t){}]).controller("homeCtrl",["$scope","$state","localDataFactory",function(t,e,n){t.home={},t.home.allUnits=n.allUnits,t.home.selectedVisit=n.selectedVisit,t.home.getInspectionData=n.getInspectionData,t.home.createNewVisit=n.createNewVisit,t.home.inspectionStubs=null,t.home.activeSync=n.activeSync,t.home.navigateWithVisit=function(n){n?t.home.createNewVisit(t.home.selectedProperty.name,t.home.selectedInspection).then(function(){e.go("rooms.general",{},{reload:!0})}):t.home.getInspectionData(t.home.selectedInspection._id).then(function(){e.go("rooms.general",{},{reload:!0})})},t.home.getInspectionStubs=function(e){if(e){t.home.inspectionStubs={};var i="getInspections/inspection-data-by-unit-id";n.getQueryStubs(e,i).then(function(e){t.home.inspectionStubs=e})}},t.home.addNewInspection=function(){}}]).controller("adminCtrl",["$scope","localDataFactory",function(t,e){t.admin={},t.admin.allUnits=e.allUnits,t.admin.inspectionStubs=null,t.admin.visitStubs=null,t.admin.getInspectionStubs=function(n){t.admin.inspectionStubs={};var i="getInspections/inspection-data-by-unit-id";e.getQueryStubs(n,i).then(function(e){t.admin.inspectionStubs=e})},t.admin.getVisitStubs=function(n){t.admin.visitStubs={};var i="getInspectionVisits/visit-data-by-inspection-id";e.getQueryStubs(n,i).then(function(e){t.admin.visitStubs=e})},t.admin.getVisitData=function(n){t.admin.visitData={},e.getVisitData(n).then(function(e){t.admin.visitData=angular.toJson(e,!0)})}}]).controller("menuCtrl",["$scope","localDataFactory",function(t,e){}]);