sap.ui.jsview("clubapp.facebookPage", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf clubapp.facebookPage
	*/ 
	getControllerName : function() {
		return "clubapp.facebookPage";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf clubapp.facebookPage
	*/ 
	createContent : function(oController) {

		
		sap.ui.localResources("html");
		
		var facebookPlugin = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.HTML,
			viewName: "html.facebookPlugin",
		});
		
	/*	var homeButton = new sap.m.Button({icon: sap.ui.core.IconPool.getIconURI("home")});
		homeButton.attachPress(function(e) {
			var view = sap.ui.getCore().byId("homeViewID");
			view.getController().handleHomeNav(e);
		} );
		*/
		
 		var facebookPage =  new sap.m.Page("facebookPageID",{
			title: "Facebook",
			content: [
			          facebookPlugin
			]//,
			//headerContent: [homeButton]
		});
 		
 		
 		return facebookPage;
		
	}

});