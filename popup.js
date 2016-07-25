var hostname;
var sessionID;
var SRN;

jQuery(document).ready(function(){

	chrome.runtime.sendMessage({command: "getAuthorization"}, function(response) {
		hostname = response.hostname;
		sessionID = response.sessionID;
		SRN = response.SRN;	
		if (sessionID && SRN){
			$('#nodata').hide();
			$('#environment').text(getEnvironmentName(hostname));
		} else {
			$('#data').hide();
		}
	});
	
	$('#sessionID').click(function() {
		copyTextToClipboard(sessionID);
		return false;
	});

	$('#SRN').click(function() {
		copyTextToClipboard(SRN);
		return false;
	});

	
});

function copyTextToClipboard(text) {
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  body.removeChild(copyFrom);
}

function getEnvironmentName(hostname) {
	switch (hostname){
		case "nyvm1669.ptc.un.org"	: return "DEV";
		case "ermsweb.dev.un.org"	: return "DEV";
		case "crmsitmobile.un.org"	: return "QA";
		case "ermsweb.qa.un.org"	: return "QA";
		case "ermsweb.un.org"		: return "PROD";
		default						: return hostname;
	}
}