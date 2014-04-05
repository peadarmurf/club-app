sap.ui.jsview("clubapp.home", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf clubapp.home
	*/ 
	getControllerName : function() {
		return "clubapp.home";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf clubapp.home
	*/ 
	createContent : function(oController) {
	
		
		var splitApp = new sap.m.SplitApp("clubAppID", {mode: sap.m.SplitAppMode.PopoverMode});
		  
		var optionsList = new sap.m.List({mode:"SingleSelectMaster"});
		
		optionsList.attachSelectionChange(function(e) {
			var view = sap.ui.getCore().byId("homeViewID");
			view.getController().handleNav(e);
		});
		
		
		var twitterItem = new sap.m.StandardListItem("twitterItemID", {title: "Twitter", type:"Navigation"});

		var facebookItem = new sap.m.StandardListItem("facebookItemID", {title: "Facebook", type:"Navigation"});

		var paypalItem = new sap.m.StandardListItem("paypalItemID", {title: "Paypal", type:"Navigation"});

		
		optionsList.addItem(twitterItem);
		optionsList.addItem(facebookItem);
		optionsList.addItem(paypalItem);
		
		var homePage = new sap.m.Page({
			title: "My Club App",
			content: [
			          optionsList
			]
		});
		
		splitApp.addMasterPage(homePage);
		
		
		sap.ui.localResources("html");
		
		var twitterWidget = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.HTML,
			viewName: "html.twitterWidget",
		});
		

 		var twitterPage = new sap.m.Page("twitterPageID",{
			title: "Twitter",
			content: [
			          twitterWidget
			]
		});
		
		splitApp.addDetailPage(twitterPage);
		
		
		var facebookPlugin = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.HTML,
			viewName: "html.facebookPlugin",
		});

		
 		var facebookPage =  new sap.m.Page("facebookPageID",{
			title: "Facebook",
			content: [
			          facebookPlugin
			]
		});
 		
		
		splitApp.addDetailPage(facebookPage);
		
		var paypalWidget = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.HTML,
			viewName: "html.paypalWidget",
		});

		
 		var paypalPage =  new sap.m.Page("paypalPageID",{
			title: "Paypal",
			content: [
			          	paypalWidget
			]
		});
 		
		
		splitApp.addDetailPage(paypalPage);
		
		
		splitApp.setInitialMaster(homePage);
 		
 		return splitApp;
	}

});