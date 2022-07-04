      function topbotbar(){        
        var hg = screen.height;
        var wd = screen.width;
        //lg(wd+" "+hg);
        if(hg<=420){
          ovi_full("hide","auto");              
        }else{
          ovi_full("show","auto");
        }
      }
      function ovi_full($tipe,$method){        
        if($tipe=="show"){   
          // $(".ov-maxi").addClass("hide").animate({"margin-right":"25%"}, "slow");  
          $(".content-nav,.ov-footer,#top-one").fadeIn();
        }else{   
          // $(".ov-maxi").removeClass("hide").animate({"margin-right":"0"}, "slow");  
          $(".content-nav,.ov-footer,#top-one").fadeOut();
        }
      }
      function autoload_cmnt($len){
        $num = 10;
        $rms = ($len/$num)/$num*$num;
        if(Number.isInteger($rms)){
          getcomment("load","0");
        }
        // setTimeout(function(){            
        //   
        // },5000);
      }
      function fokus($class){
          setTimeout(function(){
            $("."+$class).focus();
          },700);
      }
      function getuname(){
        $uname = storage.get("uname");
        if($uname === undefined){
          alert("please input your name first...");
          $(".cmnt-frm").fadeOut();      
          $(".cmnt-frm-name").removeClass("hide").show()
          setTimeout(function(){
            $(".cmnt-input-name").focus().val("");
          },1000);
        }
      }

      function jxhr(url){
        var jqXHR = $.ajax({
          url   : base_url(url),
          dataType: 'json',
          async : false
        });
        return JSON.parse(jqXHR.responseText);
      }
      function v_stop(){
        $vv = $('#video_player').trigger("pause");
      }

      function openPath(){        
        pathPage = window.location.hash.substr(1);
        $goto = pathPage.replace("p","ov-");
        return $goto;
      }
      function openHdr($goto){
        parent.location.hash = "";
        hide_menu_bottom("disabled");
        $("#OpenView-Dtl").hide();
        $(".cnt-dtl").hide();
        $(".cnt-show").hide();              
        $(".ov-comment").hide();
        $(".cmnt-frm-name").hide();
        $(".cnt-hdr").show();
        //### getdata("hdr",$edisi,nasabah);
        if($goto!=""){
          if($("#"+$goto).hasAttr("list-content-first")){
            godtl("top-one");
          }else{
            gohdr($goto,"60");      
          }
        }
        //### data_likebook("");
        change_text_menu("","hdr");
        $("#result-comment").html("");
      }
      function comment_frm(){
        if(storage.get("comment-frm")){
          $(".ov-comment").show();
        }
      }
      function openDtl($dtl,$goto,$push){          
        parent.location.hash = $push;
        $("#OpenView-Dtl").show();
        $(".cnt-dtl").hide();
        $(".cnt-hdr").hide();
        //*** lg($dtl);
        $("#"+$dtl).show();
        //### load_likebook($dtl,$push);
        //### data_likebook($dtl);
        load_readcontent();
        change_text_menu($dtl,"dtl");
        hide_menu_bottom("enable");
        //*** lg($goto+" "+$push);
        if($goto=="OpenView-Dtl"){          
          godtl("top-one");
        }
        //*** lg($goto+" "+$push);
        //### $("#result-comment").html("");
        //### getcomment("default","0");
        //### comment_frm();
      }
      function change_text_menu($dtl,$tipe){
        if($tipe=="dtl"){
          $title = $("#"+$dtl).attr("data-title");
          $(".text-menu1").hide();
          $(".text-menu0").show();
          if(screen.width<720){
            $(".text-menu0").find("a").text($title);
          }else{
            if($title.length<20){
              $(".text-menu0").find("a").text("GARUDA INDONESIA - "+$title);
            }else{
              $(".text-menu0").find("a").text($title);
            }            
          }
        }else{
          $(".text-menu1").show();
          $(".text-menu0").hide();          
        }
      }
      function getdata($key,$edisi,$nasabah){
        $.getJSON(base_url($key+'/'+$edisi+'/'+$nasabah),function(data,status){
          if(status=="success"){
                // lg(data["cmnt"].length)
                if(data["like"].length){
                  var objk = data["like"];
                  for(var k in objk) {
                     var konten  = objk[k].content;
                     var t_like  = objk[k].tlike;
                     $('.get-api-ovi').each(function(i) {
                          var prev = $(this).attr("data-ovi");
                          var obj1 = $(this).find(".hdr-ov-like").find("span");
                          if (prev == konten){
                            $(obj1).text(t_like);
                          }
                     });
                  }
                }
                if(data["cmnt"].length){
                  var objk = data["cmnt"];
                  for(var k in objk) {
                     var konten  = objk[k].content;
                     var t_cmnt  = objk[k].tcmnt;
                     $('.get-api-ovi').each(function(i) {
                          var prev = $(this).attr("data-ovi");
                          var obj2 = $(this).find(".hdr-ov-cmnt").find("span");
                          if (prev == konten){
                            $(obj2).text(t_cmnt);
                          }
                     });
                  }
                }
            }
         })
      }
      function lg($obj){
        console.log($obj);
      }
      function getcomment($tipe,$num){
        $("ov-loading").fadeIn();
        // alert($num);
        $section = $(".ov-footer").attr("openview-page");
        if($tipe=="more-child"){
          $data = $num.split("#");
          if($data.length>1){
            $vdata  = $data[0]+"-"+$data[1];
          }else{
            $vdata  = $num;
          }
        }else{
          $vdata  = $num;
        }
        $.get(base_url("comment_get/"+$section+"/"+$tipe+"/"+$vdata),function(data,status){
          if(status=="success"){
            if($num=="0"){
              $("#result-comment").html(data);
            }else{
              if($tipe=="more-child"){
                // alert($data[0]);
                $chld_id = $data[0].replace("com","ch");
                $rep_id  = $data[0].replace("com","rep");
                $pr_id   = $data[0].replace("com","pr");
                // alert($data[1]);
                $prnt_ul = $("#"+$data[0]);
                $prnt_ul.find("."+$chld_id).append(data);
                $comment = $("#"+$rep_id);
                $ttl     = parseInt($comment.attr("data-child"));
                $ttl_rep = $prnt_ul.find("."+$pr_id).length;
                // $reply   = parseInt($data[1]);
                $jumlah  = $ttl-$ttl_rep;
                  if( $jumlah < 1 ){
                    $comment.removeClass("load-child").addClass("child-hide").html("hide reply...");
                  }else{
                    $comment.find("span").html("("+$jumlah+")"); 
                  }                  
                // }
              }else{
                $("#result-comment").append(data);
              }
             // skrool('.cmnt-bottom','#ov-comment');
            }
          }
          $("ov-loading").fadeOut();
         })
      }

      // like_book("like",$id,"0");
      function like_book($tipe,$section,$id,$value){
        // alert($edisi);
         $.ajax({
            type: 'POST',
            url: base_url("likebook"),
            dataType:"json",
            data: { 
                'tipe' : $tipe, 
                'uid': $id, 
                'value': $value,
                'edisi':$edisi,
                'section':$section,
                'section_dtl':''
            },
            success: function(data){
              
            }
        });
      }
      function hide_menu_bottom($btn){        
        if($btn=="disabled"){
          $(".popup").show();
          $(".ov-like").find("img").attr("src","files/extfile/like.png");
          $(".ov-bookmark").find("img").attr("src","files/extfile/bookmark.png");
        }else{
          $(".popup").hide();
        }
      }

      $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
      };
      function godtl($id){
          $xid = $("#"+$id);
          $('html, body').animate({
              scrollTop: $xid.offset().top
          }, 100);
      }
      function gohdr($id,$add){
          $xid = $("."+$id);
          $('html, body').animate({
              scrollTop: $xid.offset().top - $add
          }, 100);
      }
      function gogo($add){
          $xid = $(".cnt-dtl");
          $('html, body').animate({
              scrollTop: $xid.offset().top - $add
          }, 100);
      }
      function skrool($class,$cont){        
        var $container = $("html, body");
        if($cont!=""){
          $container = $($cont);
        }
        var $scrollTo = $($class);
        $container.animate({scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop(), scrollLeft: 0},300); 
      }

      function load_readcontent(){        
        $key  = "ov-font";
        $read = $(".content-page,.fisrt-content-page, div p,.content-page label,.content-page section");
        if(storage.get($key)){
          $read.addClass("font-18");
        }
      }
      function load_likebook($dtl,$push){
        $push  = $push.replace("p","");
        $page  = $dtl;
        $title = $("#"+$page).find("h2").text();
        $(".ov-footer").attr("openview-page",$page).attr("openview-page-title",$title);        
        $key1   = $edisi+"|"+nasabah+"|ov-like|"+$page;
        $key2   = $edisi+"|"+nasabah+"|ov-bookmark|"+$page;
        if(storage.get($key1)){
          $("#ov-like").find("img").attr("src","files/extfile/like-ok.png");
        }else{
          $("#ov-like").find("img").attr("src","files/extfile/like.png");
        };
        if(storage.get($key2)){
          $("#ov-bookmark").find("img").attr("src","files/extfile/bookmark-ok.png");
        }else{
          $("#ov-bookmark").find("img").attr("src","files/extfile/bookmark.png");
        };
      }
      function data_likebook($dtl){
        //likebook
        $(".dlike ul").html("");
        $(".dbook ul").html("");
        $(".cnt-dtl").each(function() {
          $page  = $(this).attr("id");
          $key1  = $edisi+"|"+nasabah+"|ov-like|"+$page;
          $val1  = storage.get($key1);
          $key2  = $edisi+"|"+nasabah+"|ov-bookmark|"+$page;
          $val2  = storage.get($key2);
          $judul = $page.replace("-"," ").toUpperCase();
          if($val1){       
            $url1  = $val1["page"].replace("ov-","p");  
            $(".dlike ul").append("<li><a href='ovi.html#"+$url1+"' class='bookmark-link'>"+$judul+" : "+$val1["title"]+"</a></li>");
          }
          if($val2){            
            $url2  = $val2["page"].replace("ov-","p");   
            $(".dbook ul").append("<li><a href='ovi.html#"+$url2+"'  class='bookmark-link'>"+$judul+" : "+$val2["title"]+"</a></li>");
          }
        })
      }
      function isInView(elem){
         return $(elem).offset().top - $(window).scrollTop() < $(elem).height() ;
      }
      function unic(){
        $.get(base_url("unic"), function(data, status){
              unic_device = data;
        });        
      }
      function base_url($url){
          if($(location).attr("hostname")=="localhost"){
            return "http://localhost/agencyfish/weblist/versoview/openvi/"+$url;
          }else{
            return "https://panel.versoview.com/openvi/"+$url;
          }
      }
      $.fn.hasAttr = function(name) {  
         return this.attr(name) !== undefined;
      };