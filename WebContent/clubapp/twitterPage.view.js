sap.ui.jsview("clubapp.twitterPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf clubapp.twitterPage
	*/ 
	getControllerName : function() {
		return "clubapp.twitterPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf clubapp.twitterPage
	*/ 
	createContent : function(oController) {

		sap.ui.localResources("html");
		
		var twitterWidget = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.HTML,
			viewName: "html.twitterWidget",
		});
		
/*		var homeButton = new sap.m.Button({icon: sap.ui.core.IconPool.getIconURI("home")});
		homeButton.attachPress(function(e) {
			var view = sap.ui.getCore().byId("homeViewID");
			view.getController().handleHomeNav(e);
		} );
		*/
 		return new sap.m.Page({
			title: "Twitter",
			content: [
			          twitterWidget
			]//,
			//headerContent: [homeButton]
		});
 		
	}

});