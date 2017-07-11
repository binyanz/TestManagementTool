jQuery.sap.declare("HelloWorldUI5.Component");

sap.ui.core.UIComponent.extend("HelloWorldUI5.Component",{
   metadata : {
       name : "TEST-TestManagementlist",
       version : "10",
       includes : ["css/style.css","js/global.js"],
       dependencies : {
           libs : ["sap.ui.ux3","sap.ui.commons","sap.ui.table"],
           components : []
       },
    
       config : {
           resourceBundle : "i18n/messagebundle.hdbtextbundle",
           serviceConfig : {
               serviceUrl : "/HelloWorldUI5/services/testplan.xsodata/"
           }
       }
   },
   
   init : function(){
       
       sap.ui.core.UIComponent.prototype.init.apply(this,arguments);
       
       var mConfig = this.getMetadata().getConfig();
       
       var oRootPath = jQuery.sap.getModulePath("HelloWorldUI5");
       
       var i18nModel = new sap.ui.model.resource.ResourceModel({
           bundleUrl : [oRootPath, mConfig.resourceBundle].join("/")
       });
       this.setModel(i18nModel, "i18n");
       
   },
   
   createContent : function(){
       
       return sap.ui.xmlview("idShellView",jQuery.sap.viewName);
       
   }
   
});