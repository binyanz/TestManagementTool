sap.ui.jsview("helloworldui5.helloworld", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf helloworldui5.helloworld
	*/ 
	getControllerName : function() {
		return "helloworldui5.helloworld";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf helloworldui5.helloworld
	*/ 
	createContent : function(oController) {
//		//      button:
//		var myButton = new sap.ui.commons.Button("btn");
//		myButton.setText(oBundle.getText("helloworld"));
//		myButton.attachPress(function(){$("#btn").fadeOut();});
//		/*********************/
//		
//		//      multiply panel:
//		var multiplyPanel = new sap.ui.commons.Panel().setText("XS Service Test - Multiplication");
//		var layoutNew = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
//		multiplyPanel.addContent(layoutNew);
//		multiplyPanel.addContent(myButton);
//		var oVal1 = new sap.ui.commons.TextField("val1",{tooltip: "Value #1", editable:true});
//		var oVal2 = new sap.ui.commons.TextField("val2",{tooltip: "Value #2", editable:true});
//		var oResult = new sap.ui.commons.TextView("result",{tooltip: "Results"});
//		var oEqual = new sap.ui.commons.TextView("equal",{tooltip: "Equals", text: " = "});
//		var oMult = new sap.ui.commons.TextView("mult",{tooltip: "Multiply by", text: " * "});
//		//Attach a controller event handler to Value 1 Input Field
//		oVal1.attachEvent("liveChange", function(oEvent){
//		oController.onLiveChange(oEvent,oVal2); });
//		//Attach a controller event handler to Value 2 Input Field
//		oVal2.attachEvent("liveChange", function(oEvent){
//		oController.onLiveChange(oEvent,oVal1); });
//		layoutNew.createRow(oVal1, oMult, oVal2, oEqual, oResult );
//		return multiplyPanel;
//		/******************/
		// ODATA:
//		var oLayout = new sap.ui.commons.layout.MatrixLayout({width:"100%"});
//		
//	  	  var oModel = new sap.ui.model.odata.ODataModel("/sap/hana/democontent/epm/services/salesOrders.xsodata/", true);
//	   	  
//	      var oControl;
//	      this.oSHTable = new sap.ui.table.Table("soTable",{
//	               visibleRowCount: 10,
//	               });
//	  
//	         
//	     //Table Column Definitions, no data shown up!
//	      oControl = new sap.ui.commons.TextView().bindProperty("text","SALESORDERID");
//	      this.oSHTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "SALES_ORDER_ID"}), 
//	    	  template: oControl, sortProperty: "SALESORDERID", filterProperty: "SALESORDERID", filterOperator: sap.ui.model.FilterOperator.EQ, flexible: true }));
//	 
//
//	      oControl = new sap.ui.commons.TextView().bindProperty("text","PARTNERID.PARTNERID");
//	      this.oSHTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "PARTNER_ID"}), 
//	    	  template: oControl, sortProperty: "PARTNERID", filterProperty: "PARTNERID" }));
//	      
//	      oControl = new sap.ui.commons.TextView().bindProperty("text","NETAMOUNT");
//	      this.oSHTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "BUYER"}), 
//	    	  template: oControl, sortProperty: "NETAMOUNT", filterProperty: "NETAMOUNT", filterOperator: sap.ui.model.FilterOperator.Contains }));
//	     
//	      oControl = new sap.ui.commons.TextView().bindText("GROSSAMOUNT",oController.numericFormatter); 
//	      oControl.setTextAlign("End");
//	      this.oSHTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "GROSS_AMOUNT"}), 
//	    	  template: oControl, sortProperty: "GROSSAMOUNT", filterProperty: "GROSSAMOUNT", hAlign: sap.ui.commons.layout.HAlign.End}));
//
//	      oControl = new sap.ui.commons.TextView().bindProperty("text","CURRENCY");
//	      this.oSHTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "CURRENCY"}), 
//	    	  template: oControl, sortProperty: "CURRENCY", filterProperty: "CURRENCY" }));
//
//	      this.oSHTable.setModel(oModel);
//	     var sort1 = new sap.ui.model.Sorter("SALESORDERID", true);
//	     
//	     this.oSHTable.bindRows({
//	    	    path: "/SalesOrderHeader",
//	    	    parameters: {expand: "Buyer",
//	    	    	select: "SALESORDERID,CURRENCY,GROSSAMOUNT,PARTNERID.PARTNERID,NETAMOUNT"},
//	    	    sorter: sort1
//	    	});
//		 
//		 
//		 this.oSHTable.setTitle("Sales Orders");
//		 oLayout.createRow(this.oSHTable);
//			
//		return oLayout;
		/************/
		var oLayout = new sap.ui.commons.layout.MatrixLayout();
		this.oModel = new sap.ui.model.odata.ODataModel("/sap/hana/democontent/epm/services/user.xsodata/", true);
		var updatePanel = new sap.ui.commons.Panel("updPanel").setText('New User Record Details');
		var layoutNew = new sap.ui.commons.layout.MatrixLayout({width:"auto"});
		var oVal1 = new sap.ui.commons.TextField("fName",{tooltip: "First Name", width: "200px", editable:true});
		var oVal2 = new sap.ui.commons.TextField("lName",{tooltip: "Last Name", width: "200px", editable:true});
		var oVal3 = new sap.ui.commons.TextField("email",{tooltip: "Email", width: "200px", editable:true});
		var oExcButton = new sap.ui.commons.Button({
		text : "Create Record",
		press : oController.callUserService });
		layoutNew.createRow(new sap.ui.commons.Label({text: "First Name: "}), oVal1 ); //oExcButton );
		layoutNew.createRow(new sap.ui.commons.Label({text: "Last Name: "}), oVal2 ); //oExcButton );
		layoutNew.createRow(new sap.ui.commons.Label({text: "Email: "}), oVal3, oExcButton );
		updatePanel.addContent(layoutNew);
		oLayout.createRow(updatePanel);
		oTable = new sap.ui.table.Table("userTbl",{tableId: "tableID",
		visibleRowCount: 10});
		oTable.setTitle("Users");
		//Table Column Definitions
		var oMeta = this.oModel.getServiceMetadata();
		var oControl;
		for ( var i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) {
			var property = oMeta.dataServices.schema[0].entityType[0].property[i];
			oControl = new sap.ui.commons.TextField({change: oController.updateService } ).bindProperty("value",property.name);
		if(property.name === 'PERS_NO'){
			oControl.setEditable(false);
		}
		oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: property.name}), template: oControl, sortProperty: property.name, filterProperty: property.name, filterOperator: sap.ui.model.FilterOperator.EQ, flexible: true, width: "125px" }));
		}
		oTable.setModel(this.oModel);
		oTable.bindRows("/Users");
		oTable.setTitle("Users" );
		oTable.setEditable(true);
		oLayout.createRow(oTable);
		return oLayout;
		}
});
	