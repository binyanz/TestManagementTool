sap.ui.controller("HelloWorldUI5.view.Table", {

	onInit: function() {

		var sServiceUrl = "/HelloWorldUI5/services/testplan.xsodata/";
		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		oModel.setDefaultCountMode("Inline");
		this.getView().setModel(oModel);
		oModel.setDefaultBindingMode("TwoWay");
		var oTable = this.byId("tpTable");
		oTable.getBinding("rows").attachChange(function() {
			oTable.setTitle(oBundle.getText("tps", [oTable.getBinding("rows").iLength]));
		});
		
	},

	//Toolbar Button Press Event Handler
	onTBPress: function(oEvent, oController) {
		

		//Excel Download
		if (oEvent.getSource() === this.byId("btnExcel")) {
			// xsjs will handle the content type and download will trigger automatically
			window.open("/HelloWorldUI5/services/poWorklistQuery.xsjs?cmd=Excel");
			return;
		}

		//Zip Functionality
		if (oEvent.getSource() === this.byId("btnZip")) {
			// xsjs will handle the content type and download will trigger automatically
			window.open("/HelloWorldUI5/services/poWorklistQuery.xsjs?cmd=Zip");
			return;  
		}

		//Check for selected item for all other events
		var oTable = this.byId("tpTable");
		var data = oTable.getModel();
		var poId = data.getProperty("TPID", oTable.getContextByIndex(oTable.getSelectedIndex()));
		if (poId === undefined || poId === null) {
			sap.ui.commons.MessageBox.show(oBundle.getText("error_select"),
				"ERROR",
				oBundle.getText("error_action"));
		} else {
			//Supported Buttons - Delete and Edit
			switch (oEvent.getSource().getId()) {
				case this.byId("btnDelete").getId():
					sap.ui.commons.MessageBox.confirm(oBundle.getText("confirm_delete", [poId]),
						jQuery.proxy(function(bResult) {
							this.deleteConfirm(bResult, this, poId);
						}, this),
						oBundle.getText("title_delete"));
					break;
				case this.byId("btnEdit").getId():
					break;
			}
		}

	},


	//Table Row Select Event Handler
	onRowSelect: function(oEvent) {

	},

	//Delete Confirmation Dialog Results
	deleteConfirm: function(bResult, oController, poId) {
		if (bResult) {
			var aUrl = '/HelloWorldUI5/services/testPlanlistUpdate.xsjs?cmd=delete' + '&TPId=' + escape(poId);
			jQuery.ajax({
				url: aUrl,
				method: 'GET',
				dataType: 'text',
				success: function(myTxt) {
					oController.onDeleteSuccess(myTxt, oController);
				},
				error: oController.onErrorCall
			});
		}
	},

	//Approve Confirmation Dialog Results
	approvalConfirm: function(bResult, oController, poId, action) {
		if (bResult) {
			var aUrl = '/sap/hana/democontent/epm/services/testPlanlistUpdate.xsjs?cmd=approval' + '&PurchaseOrderId=' + escape(poId) + '&Action=' +
				escape(action);
			jQuery.ajax({
				url: aUrl,
				method: 'GET',
				dataType: 'text',
				success: function(myTxt) {
					oController.onApprovalSuccess(myTxt, oController, action);
				},
				error: oController.onErrorCall
			});
		}
	},

	//Delete Successful Event Handler
	onDeleteSuccess: function(myTxt, oController) {

		oController.refreshTable();
		sap.ui.commons.MessageBox.show(oBundle.getText("delete_success"),
			"SUCCESS",
			oBundle.getText("title_delete_success"));

	},

	//Approval Successful Event Handler
	onApprovalSuccess: function(myTxt, oController, action) {

		oController.refreshTable();
		sap.ui.commons.MessageBox.show(oBundle.getText("title_approve_success", [action]),
			"SUCCESS",
			oBundle.getText("title_approve_success"));

	},

	//Error Event Handler
	onErrorCall: function(jqXHR, textStatus, errorThrown) {
		if (jqXHR.status == '500') {
			sap.ui.commons.MessageBox.show(jqXHR.responseText,
				"ERROR",
				oBundle.getText("error_action"));
			return;
		} else {
			sap.ui.commons.MessageBox.show(jqXHR.statusText,
				"ERROR",
				oBundle.getText("error_action"));
			return;
		}
	},

	//Utility function to refresh the table & reset # of recs in title
	refreshTable: function() {
		oTable = this.byId("tpTable");
		var bindingInfo = oTable.getBindingInfo("rows");
		var sort1 = new sap.ui.model.Sorter("TPID");
		oTable.bindRows("/TestPlanGeneralInfo", sort1, bindingInfo.filters);

		var columns = oTable.getColumns();
		var length = columns.length;
		for (var i = 0; i < length; i++) {
			columns[i].setFilterValue('');
			columns[i].setFiltered(false);
		}
	},


	/* Called when binding of the model is modified.
	 *
	 */
	onBindingChange: function(oController) {
		var oTable = this.byId("tpTable");
		var iNumberOfRows = oTable.getBinding("rows").iLength;
		oTable.setTitle(oBundle.getText("tps", [numericSimpleFormatter(iNumberOfRows)]));
	},

	onRowSelectionChange: function(oEvent) {

		//alert(event.getSource().getSelectedItem().getBindingContext().getObject().Name);
    	//console.log(JSON.stringify(event.getSource().getSelectedItem().getBindingContext().getObject()));

		this.getOwnerComponent().fireEvent("tpTableRowSelectionChange", {
			origin: oEvent
		});
	},

	openTileDialog: function(oEvent) {
		var iData = parseInt(oEvent.getSource().data("tileDialog"));
		var oTileDialog = new sap.account.TileDialog(this, iData);
		this.getView().addDependent(oTileDialog);
		oTileDialog.open();
	},

	onAfterRendering: function(oEvent) {
		var oController = this;
		var oModel = new sap.ui.model.odata.ODataModel("/HelloWorldUI5/services/testplan.xsodata/", true);
		var oSHTable = sap.ui.getCore().byId("idShellView--po_table_view--tpTable");
		oModel.attachRequestCompleted(function() {
			oController.onBindingChange(oController);
		});
		oSHTable.setModel(oModel);
	}
	
});  