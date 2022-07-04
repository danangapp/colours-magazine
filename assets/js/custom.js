      var storage = {
        set: function(key, value) {
          if (!key || !value) {return;}

          if (typeof value === "object") {
            value = JSON.stringify(value);
          }
          localStorage.setItem(key, value);
        },
        get: function(key) {
          var value = localStorage.getItem(key);

          if (!value) {return;}
          // assume it is an object that has been stringified
          if (value[0] === "{") {
            value = JSON.parse(value);
          }
          return value;
        },
        rem: function(key) {
          var value = localStorage.removeItem(key);
        }
      }
      var ID = {
        set : function () {
          uid =  Math.random().toString(36).substr(2, 9);          
          localStorage.setItem("uid", uid);
        },
        get: function(key) {
          var value = localStorage.getItem("uid");

          if (!value) {return;}
          // assume it is an object that has been stringified
          if (value[0] === "{") {
            value = JSON.parse(value);
          }
          return value;
        },
        rem: function(key) {
          var value = localStorage.removeItem("uid");
        }
    };
    function nasabah(){
      if( ID.get() === undefined || ID.get() === "undefined"){
        ID.set();
      }
      return ID.get();
    }
    function setup(){   
      $.ajaxSetup({
        headers : {
          'X-Auth' : 'a8f14e4d5f-ceeae167-a5al36-deddi-4bea25a43',
          'X-Keys' : 'a64a4b0dd1-9d5cefe2-c01lc9-0d25i-c1d582aaf'
        }
      });
    }
      // $(window).load(function(){
      //     // ..
      //     alert("s");
      //    
       // ..
      // });
      // $(window).on('resize scroll', function() {
      //   $('.content-page').each(function() {
      //     var activeColor = $(this).attr('data-url');
      //     if ($(this).isInViewport()) {
      //       // $('#fixed-' + activeColor).addClass(activeColor + '-active');
      //       if(activeColor!== undefined){
      //         lg(activeColor);
      //       }
      //     // } else {
      //       // $('#fixed-' + activeColor).removeClass(activeColor + '-active');
      //     }
      //   });
      // });

      window.addEventListener('resize', function(event){
        topbotbar();
      });
      $(document).ready(function() {


        $(document).on("click",".ov-back",function(){
          if(storage.get("flipPage")){
            if(storage.get("flipPage")){
              window.location.href="index.html#"+storage.get("flipPage");
            }else{
              window.location.href="index.html";
            }
          }else{
            $("#goto-flip").click();
          }
        })
        $(document).on("click","#goto-flip",function(){
            var x = "";
           $('.content-page').each(function() {
            var activeColor = $(this).attr('data-url');
            if ($(this).isInViewport()) {
              // $('#fixed-' + activeColor).addClass(activeColor + '-active');
              if(activeColor!== undefined){
                x = activeColor;
              }
            }
          })
          if($.isNumeric(x)){
              $flipuri = "index.html#p="+x;
              window.location.href = $flipuri;
          }else{
            $(".ov-back").click();
            // $flipuri = "index.html";
          }
          
        })
  		  $('body').bind('copy paste',function(e) {
  				alert("copy content is disable");
  				e.preventDefault(); return false; 
  			});
          v_stop();
          $edisi = $("#ptop").attr("data-openview");
          nasabah  = nasabah(); 
          pathPage = window.location.hash.substr(1);
          realPage = (parseInt(pathPage.replace("p","")))
      	  $(".comment-header").text("GARUDA INDONESIA - Edisi "+$edisi.replace("ga-",""));
          openHdr("")                     
          ////$(".ov-comment").hide();
          if($("#p"+realPage).length){
            $id = $("#p"+realPage);
            $parent1 = $id.parents(':eq(3)');
            $target1 = $parent1.attr("id");
            if (typeof $target1 === "undefined") {
              $parent2 = $id.parents(':eq(1)');
              $target2 = $parent2.attr("data-href");
              if (typeof $target2 === "undefined") {
                openHdr("");
              }else{
                openDtl($target2,"p"+realPage,"p"+realPage);
              }
            }else{              
             openDtl($target1,"p"+realPage,"p"+realPage); 
            }
          }
          $(document).on("keyup",".cmnt-input",function(e){
            $typo = $(this).val().length;
            if($typo>0){
              $(".cmnt-post").prop("disabled",false).removeClass("disabled")
              // if($typo>5){
              //   autoload_cmnt($typo);
              // }
              if(e.keyCode==13){
                $(".cmnt-post").click();
              }
            }else{
              $(".cmnt-post").prop("disabled",true).addClass("disabled");
              $(this).attr("data-reply","");
            }
          })
          $(document).on("keyup",".cmnt-input-name",function(){
          	if($(this).val().length>0){
          		$(".cmnt-post-name").prop("disabled",false).removeClass("disabled")
          	}else{
          		$(".cmnt-post-name").prop("disabled",true).addClass("disabled");
          	}
          })
          $(document).on("click", ".img", function() {
              $dtl = $(this).attr("data-href");
              $id  = $(this).attr("id").replace("ov-","");
              openDtl($dtl,"OpenView-Dtl","p"+$id);
          })
          $(document).on("click", ".ov-logo", function() {
              $goto = openPath();
              v_stop();
              openHdr($goto);
          })
          $(document).on("click", ".ov-maxi", function() {            
            ovi_full("show","click");
          })
          $(document).on("click", ".ov-mini", function() {           
            ovi_full("hide","click");
          })
          $(document).on("click", ".img-dtl", function() {
              $dtl = $(this).find("img").attr("id");
              pathPage = $dtl.substr(0, 1) + "=" + $dtl.substr(1, ($dtl.length))
              NewPage = "index.html#" + pathPage;
              "" != "index.html" && self.location['replace'](NewPage);
          })
          $(".ov-extend").attr("style", "font-weight:bold;font-style:underline");
          $(document).on("click", ".ov-thumb", function() {
              $(".content-page").find("h1, h2, h3").hide();
              $(".ganjil").attr("style", "background:#fff  !important");
              $(this).attr("style", "font-weight:bold;font-style:underline");
              $(".ov-extend").attr("style", "font-weight:normal;font-style:none");
          })
          $(document).on("click", ".ov-extend", function() {
              $(".content-page").find("h1, h2, h3").show();
              $(".ganjil").attr("style", "background:#f5f5f5 !important");
              $(this).attr("style", "font-weight:bold;font-style:underline");
              $(".ov-thumb").attr("style", "font-weight:normal;font-style:none");
          })
          $(document).on("click", ".ov-font", function() {
            $key  = "ov-font";
            $read = $(".content-page,.fisrt-content-page, div p,.content-page label,.content-page section");
            if($read.hasClass("font-18")){
              if(storage.get($key)){
                storage.rem($key);
              }else{
                storage.set($key,true);
              }
              $read.toggleClass("font-18");
            }else{              
              if(storage.get($key)){
                storage.rem($key);
              }else{
                storage.set($key,true);
              }
              $read.toggleClass("font-18");
            }
          })
          $(document).on("click", ".ov-menu", function() {
              $lb = $('#likebook');
              if($lb.is(":hidden")){
                $lb.show();
              }else{
                $lb.hide();
              }
          })
          
          $(document).on("click", ".menu-next", function() {
            $(".next-menu").toggle();          
          })

          $(document).on("click",".bookmark-link",function(){
            $link = $(this).attr("href");
            window.location.href = $link;
            window.location.reload();
            //window.location.replace($link);
          })
          $(document).on("click",".mybook",function(){
            $(".likebook").toggle()
          })

          $(".ov-cmnt").click(function() {
          	$frmcmnt = $(".ov-comment");
            $frmcmnt.toggle();
            if($frmcmnt.is(":visible")){
              storage.set("comment-frm",true);
              getcomment("default","0");              
            }else{
              storage.rem("comment-frm");
            }
           // 
            fokus("cmnt-input");
          })
          $(".ov-share,.ov-bookmark,.ov-like").click(function() {
              $id    = $(this).attr("id");
              $page  = $(".ov-footer").attr("openview-page");
              $judul = $(".ov-footer").attr("openview-page-title");
              $title = {page:openPath(),title:$judul}          
              $key   = $edisi+"|"+nasabah+"|"+$id+"|"+$page;
              if(storage.get($key)){
                if($id=="ov-like"){
                  like_book("like",$page,nasabah,"0");
                  $(this).find("img").attr("src","files/extfile/like.png");
                }else if($id=="ov-bookmark"){
                  like_book("book",$page,nasabah,"0");
                  $(this).find("img").attr("src","files/extfile/bookmark.png");
                }
                storage.rem($key);
              }else{
                storage.set($key,$title);
                if($id=="ov-like"){
                  if(storage.get($key)){
                    $(this).find("img").attr("src","files/extfile/like-ok.png");
                    like_book("like",$page,nasabah,"1");
                  }else{
                    $(this).find("img").attr("src","files/extfile/like.png");                    
                    like_book("like",$page,nasabah,"0");
                  }
                }else if($id=="ov-bookmark"){
                  if(storage.get($key)){
                    $(".likebook").show();
                    $(this).find("img").attr("src","files/extfile/bookmark-ok.png");                    
                    like_book("book",$page,nasabah,$judul);
                  }else{
                    $(this).find("img").attr("src","files/extfile/bookmark.png");                    
                    like_book("book",$page,nasabah,"0");
                  }
                }
              };              
              data_likebook($id);
          })
          $(document).on("click",".close-bookmark",function(){
            $(".likebook").hide();
          })
          $(document).on("click",".reply-cmnt",function(){
            $cid = $(this).attr("comment-id");
            $cnm = $(this).attr("comment-name");            
              $uname = storage.get("uname");
              if($uname === undefined){
                getuname();
              }else{
                $(".cmnt-input").val("@"+$cnm+" ").attr("data-reply",$cid);
                fokus("cmnt-input");
              }
          })
          $(document).on("click",".cmnt-post",function(){
            $disable = $(this).hasClass("disabled");
            if ($disable === false) {              
              $uname = storage.get("uname");
              if($uname === undefined){
                getuname();
              }else{
                $page  = $(".ov-footer").attr("openview-page");
                $uid   = storage.get("uid");
                $xcid   = $(".cmnt-input").attr("data-reply");
                $cmnt   = $(".cmnt-input").val();
                //alert($xcid);
                //alert($edisi+" "+$page+" "+$uid+" "+$uname+" "+$xcid);
                // setup();
                 $.ajax({
                    type: 'POST',

                    // make sure you respect the same origin policy with this url:
                    // http://en.wikipedia.org/wiki/Same_origin_policy
                    url: base_url("comment_post"),
                    // dataType:"json",
                    data: { 
                        'cid' : $xcid, 
                        'cuid': $uid, 
                        'cnam': $uname, 
                        'cedisi': $edisi, 
                        'csection': $page, // <-- the $ sign in the parameter name seems unusual, I would avoid it
                        'comment': $cmnt // <-- the $ sign in the parameter name seems unusual, I would avoid it
                    },
                    success: function(data){
                      $(".cmnt-input").val("").attr("data-reply","").focus();
                      $(".cmnt-post").prop("disabled",true).addClass("disabled");
                      //getcomment("load","0");
                      $result   = $("#result-comment");
                      $load_btn = $result.find(".load-parent");
                      // alert($load_btn.length);
                      if($load_btn.length){
                         if($xcid!=""){
                           $find_reply = $result.find("#com-"+$xcid);
                           if($find_reply.length){                            
                             $find_reply.append(data);
                           }else{
                             $load_btn.remove();
                             $result.append(data);
                             $result.append('<div class="load-parent glyphicon glyphicon-plus-sign"></div>');                            
                           }
                         }else{
                           $load_btn.remove();
                           $result.append(data);
                           $result.append('<div class="load-parent glyphicon glyphicon-plus-sign"></div>');
                         }
                      }else{
                         if($xcid!=""){
                           $find_reply = $result.find("#com-"+$xcid);
                           if($find_reply.length){                            
                             $find_reply.append(data);
                           }else{
                             // $load_btn.remove();
                             $result.append(data);
                             // $result.append('<div class="load-parent glyphicon glyphicon-plus-sign"></div>');                            
                           }
                         }else{
                           //$load_btn.remove();
                           $result.append(data);
                           // $result.append('<div class="load-parent glyphicon glyphicon-plus-sign"></div>');
                         }

                      }
                    }
                });
              }
            }
          })
          $(document).on("click",".load-parent",function(){
            $cmnt_parent = $("#result-comment").find(".prnt").length;
            getcomment("more-parent",$cmnt_parent);
            $(this).remove();
          })
          $(document).on("click",".child-hide",function(){
            $cmnt_parent = $(this).attr("id").replace("rep","ch");
            $id_parent   = $(this).closest("li").attr("id");
            $("#"+$id_parent).find("."+$cmnt_parent).hide();
            $(this).html("show reply").addClass("child-show").removeClass("child-hide");
          })
          $(document).on("click",".child-show",function(){
            $cmnt_parent = $(this).attr("id").replace("rep","ch");
            $id_parent   = $(this).closest("li").attr("id");
            $("#"+$id_parent).find("."+$cmnt_parent).show();
            $(this).html("hide reply").addClass("child-hide").removeClass("child-show");
          })
          $(document).on("click",".load-child",function(){
            $cmnt_id  = $(this).closest("li").attr("id");
            $prnt_id  = $cmnt_id.replace("com","pr");
            // $ttl_chld = $('#'+$cmnt_id).find("li").not('.load-cmnt').length;
            $ttl_chld = $('#'+$cmnt_id).find("."+$prnt_id).length;
            // alert($ttl_chld);
            getcomment("more-child",$cmnt_id+"#"+$ttl_chld);
          })
          $(document).on("click",".cmnt-post-name",function(){
            $disable = $(this).hasClass("disabled");
            $name    = $(".cmnt-input-name").val();
            if ($disable === false) {
              storage.set("uname",$name);
              alert("success..");
            }
              $(".cmnt-frm-name").fadeOut();
            setTimeout(function(){ 
              $(".cmnt-frm").fadeIn();
              $(".cmnt-input").focus();
            }, 500);
          })
          $(window).on('wheel', function(event){
           // if (isInView($('.menu-next'))){
           //    $(".next-menu").show();
           // }else{
              $(".next-menu,.xlikebook").hide();
           //}
          });

      })