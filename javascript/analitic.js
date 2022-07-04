var param = window.location;
var page = param.hash.replace("#p=", "");
var ip = "", countrys = "", oldPage = page, size;
var useTimer, seconds = 0;
useTimer = setInterval(myTimer, 1000);	

function myTimer() {
	seconds++;
}

const getUA = () => {
    let device = "Unknown";
    const ua = {
        "Generic Linux": /Linux/i,
        "Android": /Android/i,
        "BlackBerry": /BlackBerry/i,
        "Bluebird": /EF500/i,
        "Chrome OS": /CrOS/i,
        "Datalogic": /DL-AXIS/i,
        "Honeywell": /CT50/i,
        "iPad": /iPad/i,
        "iPhone": /iPhone/i,
        "iPod": /iPod/i,
        "macOS": /Macintosh/i,
        "Windows": /IEMobile|Windows/i,
        "Zebra": /TC70|TC55/i,
    }
    Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));
    return device;
}


var sBrowser, sUsrAg = navigator.userAgent;
var cust = sUsrAg

// The order matters here, and this may report false positives for unlisted browsers.

if (sUsrAg.indexOf("Firefox") > -1) {
  sBrowser = "Mozilla Firefox";
  // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
} else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
  sBrowser = "Samsung Internet";
  // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
} else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
  sBrowser = "Opera";
  // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
} else if (sUsrAg.indexOf("Trident") > -1) {
  sBrowser = "Microsoft Internet Explorer";
  // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
} else if (sUsrAg.indexOf("Edge") > -1) {
  sBrowser = "Microsoft Edge";
  // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
} else if (sUsrAg.indexOf("Mobile") > -1) {
  sBrowser = "Mobile";
  // mozilla/5.0 (linux; android 8.1.0; android sdk built for x86 build/osm1.180201.026; wv) applewebkit/537.36 (khtml, like gecko) version/4.0 chrome/61.0.3163.98 mobile safari/537.36
} else if (sUsrAg.indexOf("Chrome") > -1) {
  sBrowser = "Google Chrome";
  // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
} else if (sUsrAg.indexOf("Safari") > -1) {
  sBrowser = "Apple Safari";
  // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
} else {
  sBrowser = "unknown";
}

$( document ).ready(function() {
    size = `${window.screen.width}x${window.screen.height}`;	
	$.getJSON("https://panel.versoview.com/xhr/country",
        function(data) {
        	ip = data.ip;
        	countrys = data.country;
    		saveFormData();
    	}
    )
});

function saveFormData() {
	if (seconds > 0){
		param = window.location;
		page = param.hash.replace("#p=", "");
		$.post("https://panel.versoview.com/analitic",
			{
				ip: ip,
				country: countrys,
				app: "colours",
				edition: "june",
				years: "2022",
				position: "1",
				page: oldPage || 1,
				period: seconds,
				device: getUA(),
				browser: sBrowser,
				custom: cust,
				size: size,
			});

		oldPage = page;
		clearInterval(useTimer);
		seconds = 0;
		useTimer = setInterval(myTimer, 1000);					
	}
}			

window.onhashchange = function () {
	saveFormData();
}

// window.addEventListener('beforeunload', (event) => {
// 	if (sBrowser != "Mobile"){
// 		saveFormData()
// 		event.preventDefault();
// 		event.returnValue = '';		
// 	}
// });

jQuery.fn.single_double_click = function (single_click_callback, double_click_callback, timeout) {
	return this.each(function () {
		var clicks = 0, self = this;
		jQuery(this).click(function (event) {
			clicks++;
			if (clicks == 1) {
				setTimeout(function () {
					if (clicks == 1) {
						single_click_callback.call(self, event);
					} else {
						double_click_callback.call(self, event);
					}
					clicks = 0;
				}, timeout || 300);
			}
		});
	});
}
