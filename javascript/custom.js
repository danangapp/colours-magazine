$(document).ready(function(){
	var hg = window.innerHeight;
	var wd = window.innerWidth;

	bottomtoolbar("l");
})
window.addEventListener('resize', function(event){
	bottomtoolbar("r");
});

// show_backbutton();
var agen = /iPhone|iPad|iPod/i.test(navigator.userAgent);


var standalone = window.navigator.standalone,
  userAgent = window.navigator.userAgent.toLowerCase(),
  safari = /safari/.test(userAgent),
  ios = /iphone|ipod|ipad/.test(userAgent);

if (ios) {
  if (!standalone && safari) {
  } else if (!standalone && !safari) {
    //alert("webview");
	show_backbutton();
  } else{
  };
} else {
  if (userAgent.includes('wv')) {
  } else {
  }
};

function show_backbutton(){
	if(localStorage.getItem("firstLoading")){
		waktu = 500;
	}else{		
		waktu = 5200;
	};
	setTimeout(function(){
		$ss = $(".phoneTopBar .button").last();
		$ss.show();
	},waktu)
}

function bottomtoolbar($x){	
	var agen = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	/* if(agen){
		if($x=="r"){
			// alert(window.location.href);
			// window.location.href=window.location.href;
			
			localStorage.setItem("firstLoading",true);
			location.reload();
		}
	}else{ */
	    setTimeout(function(){ 
			var naz = $(".phoneTopBar");	
			var zre = $(".phoneBottomBar");	
			var zar = $(".thumbnail_win10");
			var naz1  = naz.attr("style");
			var zre1  = zre.attr("style");
			var zar1  = zar.attr("style");
			if(window.innerHeight<=420){
				var naz2  = naz1.replace("top: 0px","top: -60px");
				var zre2  = zre1.replace("bottom: 0px","bottom: -60px");
				// var zar2  = zar1.replace("none","block");
				if($x=="r"){
					naz.attr("style",naz2);
					zre.attr("style",zre2);
				}
				if(zar1.indexOf("display")){
					zar.attr("style",zar1+"display:none;");
				}			
			}else{
				if(naz1){
					var naz2  = naz1.replace("top: -60px","top: 0px");
					var zre2  = zre1.replace("bottom: -60px","bottom: 0px");
					var zar2  = zar1.replace("none","block");
					naz.attr("style",naz2);
					zre.attr("style",zre2);
					zar.attr("style",zar2);
				}
			}
	   }, 100);
	   
	//}
}