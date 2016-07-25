var hostname;
var sessionID; 
var SRN; 

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.command == "getAuthorization"){
		  var response = {};
		  response.hostname = hostname;
		  response.sessionID = sessionID;
		  response.SRN = SRN;	  
		  sendResponse(response);
		}
	}
);
  
chrome.webRequest.onBeforeRequest.addListener(
	function(details){ 
		hostname = (new URL(details.url)).hostname;
		sessionID = details.requestBody.formData.SessId[0];
		SRN = details.requestBody.formData.SRN[0];
	},
    {urls: ["*://*/*/authenticate"]},
    ["requestBody"]
);