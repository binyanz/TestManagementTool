$.import("HelloWorldUI5.services", "messages");
var MESSAGES = $.HelloWorldUI5.services.messages;


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
    case "delete":
        deletePO();
        break;
    default:
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody(MESSAGES.getMessage('SEPM_ADMIN', '002', encodeURI(aCmd)));
}

function deletePO() {
    var body = '';
    var purchaseOrderID = $.request.parameters.get('TPID');
    purchaseOrderID = purchaseOrderID.replace("'", "");
    if (purchaseOrderID === null) {
        $.response.status = $.net.http.BAD_REQUEST;
        $.response.setBody(MESSAGES.getMessage('SEPM_POWRK', '012'));
        return;
    }

    var conn = $.hdb.getConnection();
    var rs;
    var query;

    
    try {
        // Update Purchase Order Status in order to delete it
        query = "DELETE FROM \"TEST_MANAGEMENT_TEST\".\"HelloWorldUI5.data::TESTPLAN_TEST.TP_Info\" where TPID = ?";
        conn.executeUpdate(query, purchaseOrderID);
        conn.commit();
        conn.close();
    } catch (err) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(err.message);
        return;
    }

    body = MESSAGES.getMessage('SEPM_POWRK', '021'); // Success
    $.trace.debug(body);
    $.response.contentType = 'application/text';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;

}


