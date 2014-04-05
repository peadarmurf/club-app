sap.ui.controller("clubapp.home", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf clubapp.home
*/
//	onInit: function() {
//		
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf clubapp.home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf clubapp.home
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf clubapp.home
*/
//	onExit: function() {
//
//	}
	
/*	openAddList : function (evt) {

	    var actionSheet = sap.ui.getCore().byId("menuActionSheetID");
	    actionSheet.openBy(evt.getSource());
	},
	  */
	handleNav : function (evt){
		
		 var oApp = sap.ui.getCore().byId("clubAppID");
		 
		 var buttonPressed = evt.getParameter("listItem").getId();
		 if (buttonPressed=='twitterItemID')
		 {
			 var twitterPage = sap.ui.getCore().byId("twitterPageID");
			 oApp.toDetail(twitterPage);
		 }
		 else if (buttonPressed=='facebookItemID')
		 {
			 var facebookPage = sap.ui.getCore().byId("facebookPageID");
			 oApp.toDetail(facebookPage);
		 }
		 else if (buttonPressed=='paypalItemID')
		 {
			 var paypalPage = sap.ui.getCore().byId("paypalPageID");
			 oApp.toDetail(paypalPage);
		 }
	},
	handleHomeNav : function (evt){
		
		 var oApp = sap.ui.getCore().byId("clubAppID");
	
		 oApp.toMaster(sap.ui.getCore().byId("homeViewID"));
	}

});