/**
 * BACKEND CODE for Google Apps Script
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Update your "Code.gs" with this NEW content.
 * 3. Save.
 * 4. Deploy -> Manage Deployments -> Edit (pencil) -> New Version -> Deploy.
 *    (You MUST create a new version for changes to take effect).
 */

// CONFIGURATION
var SHEET_ORDERS = "Orders";
var SHEET_CLIENTS = "Clients";
var SHEET_TICKETS = "Tickets";
var FOLDER_NAME = "ClientReceipts";

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Setup Clients Sheet
  var sheetClients = ss.getSheetByName(SHEET_CLIENTS);
  if (!sheetClients) {
    sheetClients = ss.insertSheet(SHEET_CLIENTS);
    sheetClients.appendRow(["ClientID", "Name", "Email", "Password", "RegisteredAt"]);
  }

  // Setup Orders Sheet
  var sheetOrders = ss.getSheetByName(SHEET_ORDERS);
  if (!sheetOrders) {
    sheetOrders = ss.insertSheet(SHEET_ORDERS);
    sheetOrders.appendRow(["OrderID", "ClientID", "ClientEmail", "Amount", "Method", "ReceiptURL", "Status", "CreatedAt", "ApprovedAt", "ApprovedBy"]);
  }

  // Setup Tickets Sheet
  var sheetTickets = ss.getSheetByName(SHEET_TICKETS);
  if (!sheetTickets) {
    sheetTickets = ss.insertSheet(SHEET_TICKETS);
    sheetTickets.appendRow(["TicketID", "ClientID", "OrderID", "Subject", "Status", "Messages", "CreatedAt", "LastUpdated"]);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
     return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Server busy" })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;

    if (action === "register") {
      return registerUser(data);
    } else if (action === "login") {
      return loginUser(data);
    } else if (action === "create_order") {
      return createOrder(data);
    } else if (action === "upload_receipt") {
      return uploadReceipt(data);
    } else if (action === "update_status") {
      return updateStatus(data);
    } else if (action === "reply_ticket") {
      return replyTicket(data);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Invalid action" })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (e.parameter.type === 'tickets') {
    return getTickets(e);
  }
  return getOrders(e);
}

// --- AUTHENTICATION ---
function registerUser(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_CLIENTS);
  var rows = sheet.getDataRange().getValues();
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][2] === data.email) { 
      return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Email already exists" })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  var clientId = "CL-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  sheet.appendRow([clientId, data.name, data.email, data.password, new Date()]);

  return ContentService.createTextOutput(JSON.stringify({ 
    "result": "success", 
    "user": { "id": clientId, "name": data.name, "email": data.email, "role": "client" }
  })).setMimeType(ContentService.MimeType.JSON);
}

function loginUser(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_CLIENTS);
  var rows = sheet.getDataRange().getValues();

  // Admin Bypass
  if (data.email === 'minudasandil31@gmail.com' && data.password === 'admin123') { 
     return ContentService.createTextOutput(JSON.stringify({ 
      "result": "success", 
      "user": { "id": "ADMIN-001", "name": "DeepMind Admin", "email": data.email, "role": "admin" }
    })).setMimeType(ContentService.MimeType.JSON);
  }

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][2] === data.email && rows[i][3] === data.password) {
      return ContentService.createTextOutput(JSON.stringify({ 
        "result": "success", 
        "user": { "id": rows[i][0], "name": rows[i][1], "email": rows[i][2], "role": "client" }
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Invalid credentials" })).setMimeType(ContentService.MimeType.JSON);
}

// --- ORDER MANAGEMENT ---
function createOrder(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_ORDERS);
  
  var imageUrl = "";
  if (data.receiptImage) {
    imageUrl = saveToDrive(data.receiptImage, data.orderId);
  }

  var rowData = [
    data.orderId,
    data.clientId || "UNKNOWN",
    data.email, 
    data.amount,
    data.method,
    imageUrl,
    data.status || "unpaid",
    new Date(),
    "", 
    ""  
  ];

  sheet.appendRow(rowData);

  // --- AUTOMATION: Create Ticket ---
  createAutoTicket(data.clientId, data.orderId, data.planName || "New Hosting Plan");

  return ContentService.createTextOutput(JSON.stringify({ "result": "success", "orderId": data.orderId }))
    .setMimeType(ContentService.MimeType.JSON);
}

function uploadReceipt(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_ORDERS);
  var rows = sheet.getDataRange().getValues();
  var orderId = data.orderId;

  // Assuming standard order (relying on manual setup or consistent creates)
  // Finding cols by name is safer but for speed in snippet we stick to finding by ID logic
  // Update logic to find by ID col 0
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] == orderId) { 
      var imageUrl = saveToDrive(data.receiptImage, orderId + "_receipt");
      sheet.getRange(i + 1, 6).setValue(imageUrl); // Col 6 is ReceiptURL
      sheet.getRange(i + 1, 7).setValue("verifying"); // Col 7 is Status
      return ContentService.createTextOutput(JSON.stringify({ "result": "success", "receiptUrl": imageUrl }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Order not found" })).setMimeType(ContentService.MimeType.JSON);
}

function updateStatus(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_ORDERS);
  var rows = sheet.getDataRange().getValues();
  var orderId = data.orderId;
  var newStatus = data.status; 

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] == orderId) { 
      sheet.getRange(i + 1, 7).setValue(newStatus); // Status
      if (newStatus === 'active') {
         sheet.getRange(i + 1, 9).setValue(new Date()); // ApprovedAt
         sheet.getRange(i + 1, 10).setValue(data.adminId || 'Admin'); // ApprovedBy
         if (data.clientEmail) sendEmail(data.clientEmail, "APPROVED");
      } else if (newStatus === 'rejected') {
         if (data.clientEmail) sendEmail(data.clientEmail, "REJECTED");
      }
      return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Order not found" })).setMimeType(ContentService.MimeType.JSON);
}

// --- TICKET SYSTEM ---
function createAutoTicket(clientId, orderId, planName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_TICKETS);
  
  var ticketId = "TK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  var subject = "New Order Verification: " + planName;
  var initialMsg = JSON.stringify([{
    sender: "system",
    text: "Thank you for your order! Your request is pending approval. An admin will review your payment shortly.",
    timestamp: new Date().getTime()
  }]);

  sheet.appendRow([ticketId, clientId, orderId, subject, "open", initialMsg, new Date(), new Date()]);
}

function replyTicket(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_TICKETS);
  var rows = sheet.getDataRange().getValues();
  
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0] == data.ticketId) { // TicketID col 0
      var currentMsgs = [];
      try {
        currentMsgs = JSON.parse(rows[i][5]); // Messages col 5
      } catch(e) {}
      
      currentMsgs.push({
        sender: data.senderRole, // 'client' or 'admin'
        text: data.message,
        timestamp: new Date().getTime()
      });
      
      sheet.getRange(i + 1, 6).setValue(JSON.stringify(currentMsgs));
      sheet.getRange(i + 1, 8).setValue(new Date()); // LastUpdated
      
      return ContentService.createTextOutput(JSON.stringify({ "result": "success" })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Ticket not found" })).setMimeType(ContentService.MimeType.JSON);
}

function getTickets(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_TICKETS);
  var rows = sheet.getDataRange().getValues();
  var data = [];

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    
    // Filter by ClientID if provided
    if (e.parameter.clientId && row[1] !== e.parameter.clientId) continue;

    data.push({
      id: row[0],
      client_id: row[1],
      order_id: row[2],
      subject: row[3],
      status: row[4],
      messages: JSON.parse(row[5] || "[]"),
      created_at: new Date(row[6]).getTime(),
      last_updated: new Date(row[7]).getTime()
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// --- UTILS ---
function getOrders(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_ORDERS);
  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var data = [];

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var headerName = headers[j];
      if (headerName === "OrderID") obj["id"] = row[j];
      else if (headerName === "Status") obj["status"] = row[j]; 
      else if (headerName === "CreatedAt") obj["created_at"] = new Date(row[j]).getTime();
      else if (headerName === "ClientEmail") obj["customer_email"] = row[j];
      else if (headerName === "ClientID") obj["client_id"] = row[j];
      else if (headerName === "Amount") obj["price"] = row[j];
      else if (headerName === "ReceiptURL") obj["receipt"] = row[j];
      else obj[headerName] = row[j];
    }
    
    // Derived status
    if (obj['status'] === 'unpaid') {
        obj['payment_status'] = 'unpaid';
        obj['status'] = 'pending';
    } else {
        obj['payment_status'] = 'paid';
    }

    if (e.parameter.clientId && obj['client_id'] !== e.parameter.clientId) {
      continue;
    }
    if (e.parameter.email && obj['customer_email'] !== e.parameter.email) {
      continue;
    }
    data.push(obj);
  }

  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function saveToDrive(base64Data, fileName) {
  try {
    var folders = DriveApp.getFoldersByName(FOLDER_NAME);
    var folder;
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(FOLDER_NAME);
    }
    
    var contentType = "image/png"; 
    var data = base64Data;
    if (base64Data.indexOf(';') > -1) {
        contentType = base64Data.substring(5, base64Data.indexOf(';'));
        data = base64Data.substring(base64Data.indexOf(',') + 1);
    }
    
    var bytes = Utilities.base64Decode(data);
    var blob = Utilities.newBlob(bytes, contentType, fileName);
    
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (e) {
    return "Error: " + e.toString();
  }
}

function sendEmail(email, status) {
  try {
    var subject = "Status Update: " + status;
    var body = "Your order status is now: " + status;
    MailApp.sendEmail(email, subject, body);
  } catch(e) {}
}
