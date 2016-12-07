"use strict";angular.module("app.controllers",[]).controller("projectsCtrl",["$scope",function(e){}]).controller("inventoryCtrl",["$scope","localDataFactory","$log","$state",function(e,t,n,o){angular.equals(t.selectedVisit,{})&&o.go("home"),e.$on("$ionicView.leave",function(){e.$destroy()}),e.inventory={},t.selectedVisit._id?e.inventory.displayTitle=t.selectedVisit._id:e.inventory.displayTitle="",t.getInspectionData(t.selectedInspectionID).then(function(n){e.inventory.selectedPropertyName=n.propertyName,e.inventory.displayTitle=t.selectedVisit._id;var o=n.checklistVersion;if(o||(o="v1"),e.inventory.checklistVersion=o,n.data.Inventory.data.All){var i="inventory.items";e.$watch(i,function(e,n){angular.equals(e,n)||(t.selectedInspection.data.Inventory.data.All=e,t.saveVisitData("Inventory","All",e))},!0),e.inventory.items=n.data.Inventory.data.All}})["catch"](function(e){n.error(e)})}]).controller("maintenanceCtrl",["$scope",function(e){}]).controller("factsCtrl",["$scope",function(e){}]).controller("homeCtrl",["$scope","$state","localDataFactory",function(e,t,n){e.home={},e.home.allUnits=n.allUnits,e.home.selectedVisit=n.selectedVisit,e.home.getInspectionData=n.getInspectionData,e.home.createNewVisit=n.createNewVisit,e.home.inspectionStubs=null,e.home.activeSync=n.activeSync,e.home.navigateWithVisit=function(n){n?e.home.createNewVisit(e.home.selectedProperty.name,e.home.selectedInspection).then(function(){t.go("rooms.general",{},{reload:!0})}):e.home.getInspectionData(e.home.selectedInspection._id).then(function(){t.go("rooms.general",{},{reload:!0})})},e.home.getInspectionStubs=function(t){if(t){e.home.inspectionStubs={};var o="getInspections/inspection-data-by-unit-id";n.getQueryStubs(t,o).then(function(t){e.home.inspectionStubs=t})}},e.home.addNewInspection=function(){}}]).controller("menuCtrl",["$scope","localDataFactory",function(e,t){}]);