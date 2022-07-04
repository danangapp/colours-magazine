//alert(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));


// $(document).ready(function(){    
//     if (location.hostname != "localhost"){
//         setInterval(function(){
//             window.location.href="";
//         },30000)
//     }
// })
// const ovi = [{"page" : "2"},{"page" : "3"},{"page" : "6"},{"page" : "7"},{"page" : "8"},{"page" : "9"},{"page" : "10"},{"page" : "11"},{"page" : "12"},{"page" : "13"},{"page" : "14"},{"page" : "15"},{"page" : "24"},{"page" : "25"}];
const ovi = []

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

window.setTimeout(function(){
    localStorage.removeItem("firstLoading")
},500)

function preloadImages() {
    global.toolBarIconsURL = [uiBaseURL + "previous_normal.png", uiBaseURL + "next_normal.png"];
    global.phoneIconsURL = [phoneBaseURL + "phone_icon.png"];

    if(localStorage.getItem("firstLoading")){
        var waktu = 0;
    }else{
      if($(location).attr("hostname")=="localhost"){
		var waktu = 0;
	  }else{
        var waktu = 5000;
	  }
    }
    var b = function(b) {
            window.setTimeout(function(){
                jsLoadingBar && jsLoadingBar.destroy();
                onBookLoad.chooseBookStyle()
            },waktu)
        },
        c = function(b) {
            window.setTimeout(function(){
                jsLoadingBar && jsLoadingBar.destroy();
                onBookLoad.chooseBookStyle();
            },waktu)
            setTimeout(function() {
                window.scrollTo(0, 1)
            }, 0)
        };
    isPhone() || isPad() ? $(window).loader(phoneIconsURL, c) : $(window).loader(toolBarIconsURL, b)
}

Class("DownloadButton", {
    create: function() {
        this._super();
        this.setSrc("download", bookConfig.DownloadButtonIcon);
        this.initLanguage("btnDownload", "Download")
    },
    onClick: function(b) {
        pathPage = window.location.hash.substr(1);
        NewPage  = bookConfig.DownloadURL+"#"+pathPage.replace("=","");
        "" != bookConfig.DownloadURL && self.location['replace'](NewPage);
        storage.set("flipPage",pathPage);
    }
}).extend("ToolbarButton");
// button download change with ovi logo and ovi page
Class("PhoneDownloadButton", {
    create: function() {
        this._super();
        this.setSrc("download", bookConfig.DownloadButtonIcon);
        this.initLanguage("btnDownload", "Download")
    },
    onClick: function(b) {
        pathPage = window.location.hash.substr(1);
        //NewPage  = bookConfig.DownloadURL+pathPage.replace("=","")+"#"+pathPage.replace("=","");          
        NewPage  = bookConfig.DownloadURL+"#"+pathPage.replace("=","");
        "" != bookConfig.DownloadURL && self.location['replace'](NewPage);
        storage.set("flipPage",pathPage);
    }

}).extend("PhoneToolbarButtons").extend("DownloadButton");

Class("PhoneInstructionsButton", {
    create: function() {
        this._super();
        this.setSrc("instructions", bookConfig.InstructionsButtonIcon);
        this.initLanguage("btnInstructions", "instructions")
    },
    onClick: function(b) {
        // alert("function back button");     
		localStorage.removeItem("firstLoading");
        window.location = 'https://versoview.com/';
        // bookConfig.InstructionsButtonVisible && !window.bookInstructions && (global.bookInstructions = new BookInstructions(tmpContainer));
        // global.bookInstructions && function() {
        //     bookInstructions.showOrHide()
        // }.delay(10)
    }
}).extend("PhoneToolbarButtons").extend("ToolbarButton");

var ThumbnailFrame = Class({
    create: function(b) {
        this._super(b);
        this.direction = rightToLeft ? Direction.right : Direction.left;
        this.leftButtonUrl = uiBaseURL + "prev_page.png";
        this.rightButtonUrl = uiBaseURL + "next_page.png";
        this.itemArray = [];
        this.taskList = new TaskList;
        this.taskList.setLargeLength(5);
        this.initDefaultDom();
        this.initHtml();
        this.initEvent();
        this.refresh();     
        //openview start
        if(window.innerHeight<420){
            this.hide();
        }else{
            this.show();
        }   
        //openview end
    },
    initHtml: virtual_function,
    initCss: function() {
        rightToLeft && this.stage.addClass("rightToLeft");
        this.stage.css({
            color: this.fontColor
        });
        this.close.css({
            "background-color": this.mainColor
        })
    },
    initDefaultDom: function() {
        this.close = $("<div class='close' style='background-image:url(" + this.closeUrl + ")'></div>");
        this.close.click(this.hide.bind(this));
        this.leftBtn = $("<div class='leftBtn btn'><img src='" + this.leftButtonUrl + "'/></div>");
        this.rightBtn = $("<div class='rightBtn btn'><img src='" + this.rightButtonUrl + "'/></div>");
        this.pageCaption = $("<span class='pageCaption'></span>");
        this.initSwiper()
    },
    initSwiper: function() {
        this.thumbnailSwiper = $("<div class='thumbnailSwiper stage'></div>");
        this.thumbnailSwiperList = $("<div class='swiper'></div>");
        this.progress = $("<div class='progress'></div>");
        this.progressBar = $("<div class='progressBar'></div>");
        this.refreshSwiper(this.thumbnailSwiperList);
        this.thumbnailSwiper.append(this.thumbnailSwiperList);
        this.thumbnailSwiper.append(this.progress);
        this.progress.append(this.progressBar)
    },
    initEvent: function() {
        this.stage.bind("mousedown touchstart", function(b) {
            b.stopPropagation()
        });
        if (this.leftBtn) this.leftBtn.onTap(function() {
            this.thumbnailSwiper.move(rightToLeft ?
                -170 : 170)
        }.bind(this));
        if (this.rightBtn) this.rightBtn.onTap(function() {
            this.thumbnailSwiper.move(rightToLeft ? 170 : -170)
        }.bind(this));
        rightToLeft ? this.thumbnailSwiper.scroll({}, Direction.right) : this.thumbnailSwiper.scroll({}, Direction.left)
    },
    onResize: function() {
        this.refresh();
        if (this.thumbnailSwiperList.width() < 0.9 * windowWidth - 52) {
            var b = this.thumbnailSwiperList.width() + 52;
            this.stage.css({
                width: b + "px",
                left: (windowWidth - b) / 2 + "px"
            })
        } else this.stage.css({
            width: "100%",
            left: "0",
            padding: "5px"
        })
    },
    refresh: function() {
        this.thumbnailSwiper.refreshData()
    },
    refreshSwiper: function(b) {
        this.length = 0;
        for (var c = BookInfo.getThumbnailPages(), d = 0; d < c.length; d++) this.addItem(b, c[d]);
        b.css("width", this.length + "px")
    },
    mergeAll: function() {
        for (var b = 0; b < this.itemArray.length; b++) this.itemArray[b].merge()
    },
    fissionAll: function() {
        for (var b = 0; b < this.itemArray.length; b++) this.itemArray[b].fission()
    },
    addItem: function(b, c) {
        var d = new ThumbnailItem(b, c);
        d.setPosition(this.length, this.direction);
        this.length += d.length;
        this.length += d.margin;
        this.itemArray.push(d)
    },
    clearHighLight: function() {
        $(".highlight").removeClass("highlight")
    },
    setHighLight: function(b) {
        this.pageCaption.html(getShownPageNumberInfo(b));
        $(".highlight").removeClass("highlight");
        for (var c = 0; c < this.itemArray.length; c++) 0 <= this.itemArray[c].pages.indexOf(b) && this.itemArray[c].setHighLight(b);
        window.setTimeout(this.thumbnailSwiper.animateToCenterItem, 10)
    },
    getShowStatu: function() {
        return this.visible
    },
    getHeight: function() {
        return this.getTopHeight() + this.getBottomHeight()
    },
    getTopHeight: function() {
        return 0
    },
    getBottomHeight: function() {
        return this.visible ? 136 : 0
    },
    fillImage: function(b) {
        this.itemArray &&
            this.itemArray[b] && !this.itemArray[b].fill && (this.LoadCount++, this.itemArray[b].fillContent(), this.itemArray[b].fill = !0)
    },
    fillContent: function() {
        this.interval && !this.interval.isRunning() ? this.interval.start() : this.interval = function() {
            this.performTask()
        }.interval(this, 60)
    },
    performTask: function() {
        for (var b = this.getShownItems(), c = b[1], b = b[0]; b <= c; b++) {
            var d = function() {
                thumbnail.fillImage(this.index)
            }.bind({
                index: b
            });
            d.id = b;
            this.taskList.unShiftTask(d)
        }
    },
    getShownItems: function() {
        var b = this.thumbnailSwiper.stageLength,
            c = -this.thumbnailSwiper.getCurrentLength(),
            d = 2 * this.itemArray[0].cells[0].length + this.itemArray[0].margin,
            b = parseInt(b / d) + 2,
            c = parseInt(c / d),
            d = Math.min(c + b, this.itemArray.length),
            c = Math.max(0, c);
        return [c, d]
    },
    showOrHide: function() {
        this.visible ? this.hide() : this.show();
        onStageResize()
    },
    show: function() {
        this.setHighLight(BookInfo.getCurrentPageIndex());
        this.visible = !0;
        this.stage.show();
        this.refresh();
        this.fillContent();
        $(".thumbnail_win10").attr("FrameThumb","show");
    },
    hide: function() {
        this.visible = !1;
        this.stage.hide();
        this.interval && this.interval.stop();
        $(".thumbnail_win10").attr("FrameThumb","hide");
    }
}).extend(FormFrame);

var ThumbnailItem = Class({
    create: function(b, c) {
        this.parent = b;
        this.margin = 12;
        this.pages = c;
        this.cells = [];
        this.initHtml();
        this.onResize()
    },
    onResize: function() {
        for (var b = this.length = 0; b < this.cells.length; b++) this.length += this.cells[b].length;
        this.item.css({
            width: this.length + "px"
        })
    },
    initHtml: function() {
        this.item = $("<div class='item_focus focus'></div>");
        this.initStructure();	
        //openview start
        var exist = 0;
        var xpage = "";
        for (var i in ovi) {
        	const page = ovi[i].page;
        	const page1 = this.cells[0] ? this.cells[0].index : 0;
        	const page2 = this.cells[1] ? this.cells[1].index : 0;        	
        	if (page){
        		if (page == page1 || page == page2){
        			exist = 1;
        			xpage = page;
        			break;
        		}else{
        		    xpage = "";
        			exist = 0;
        		}
        	}
        }
        if (exist == 1){
			this.item.append("<div style='min-height: 20px; text-align:left; color:white;margin-left:15px' class='ov-page' id='p"+xpage+"'><img src='" + uiBaseURL + "gold_logo.png'/></div>");
		}else{
			this.item.append("<div style='min-height: 20px; text-align:left; color:white;'></div>");
		}
        //openview end
        this.addItem();
        this.item.append(this.title);
        this.parent.append(this.item)
    },
    initStructure: function() {
        this.initCells();
        for (var b = getShownPageNumber(this.cells[0].index),
                c = 1; c < this.cells.length; c++) b = b + "-" + getShownPageNumber(this.cells[c].index);
        this.title = $("<div class='title'>" + b + "</div>")
    },
    fillContent: function() {
        for (var b = this.cells.length, c = 0; c < b; c++) this.cells[c].fillContent(0)
    },
    addItem: function() {
        for (var b = this.cells.length, c = 0; c < b; c++) this.item.append(this.cells[c].getDom())
    },
    initCells: function() {
        for (var b = 0; b < this.pages.length; b++) {
            var c = new ThumbnailCell(this.item, this.pages[b]);
            this.cells.push(c)
        }
    },
    setPosition: function(b, c) {
        this.item.css(c, b + "px")
    },
    fission: function() {
        this.item.removeClass("focus");
        1 == this.cells.length ? (BookInfo.isLeftPage(this.cells[0].index, !0) ? this.cells[0].setStyle({
            left: "-3px",
            right: "auto"
        }) : this.cells[0].setStyle({
            right: "-3px",
            left: "auto"
        }), this.cells[0].fission()) : (this.cells[0].fission(), this.cells[1].fission(), this.cells[0].setStyle({
            left: "-3px",
            right: "auto"
        }), this.cells[1].setStyle({
            right: "-3px",
            left: "auto"
        }))
    },
    merge: function() {
        this.item.addClass("focus");
        1 == this.cells.length ? (this.cells[0] && this.cells[0].setStyle({
            left: "0",
            right: "0"
        }), this.cells[0].merge()) : (this.cells[0].merge(),
            this.cells[1].merge(), this.cells[0].setStyle({
                left: "0",
                right: "auto"
            }), this.cells[1].setStyle({
                right: "0",
                left: "auto"
            }))
    },
    setHighLight: function(b) {
        for (var c = 0; c < this.cells.length; c++) this.cells[c].setHighLight(b);
        this.item.addClass("highlight")
    },
    clearHighLight: function() {
        this.item.removeClass("highlight");
        for (var b = 0; b < this.cells.length; b++) this.cells[b].clearHighLight()
    }
});

var ThumbnailForm = Class({
    create: function(b) {
        this.direction = 0;
        this.height = 80;
        this._super(b)
    },
    initHtml: function() {
        this.stage = $("<div class='thumbnail_win10'></div>");
        this.stage.append(this.leftBtn);
        this.stage.append(this.thumbnailSwiper);
        this.stage.append(this.rightBtn);
        this.stage.append(this.pageCaption);
        this.parent.append(this.stage)
    }
}).extend(ThumbnailFrame);

Class("PhoneToolbar", {
    initBar: function() {
        this.topBar = $("<div class='phoneTopBar'></div>");
        this.bottomBar = $("<div class='phoneBottomBar'></div>");
        this.parent.append(this.topBar);
        this.parent.append(this.bottomBar);
        bookConfig.appLogoIcon && (this.logo = new PhoneLogo, this.logo.setPosition(10, 0), this.logo.addTo(this.topBar));
        this.initStyle();
        this.enterToShow()
    },
    initButtons: function() {
        this.buttons = new ObjectPool;
        global.pageEditor && global.pageEditor.setting && parseBool(global.pageEditor.setting.shoppingCartHTML) &&
            this.buttons.add(new PhoneShoppingCartButton);
        bookConfig.ThumbnailsButtonVisible && this.buttons.add(new PhoneThumbnailButton);
        bookConfig.TableOfContentButtonVisible && this.buttons.add(new PhoneTableOfContentButton);
        this.buttons.add(new PhoneGotoPageButton);
        bookConfig.ZoomButtonVisible && this.buttons.add(new PhoneZoomButton);
        bookConfig.BookMarkButtonVisible && this.buttons.add(new PhoneBookmarkButton);
        bookConfig.PhoneButtonVisible && this.buttons.add(new PhoneNumberButton);
        (bookConfig.BackgroundSoundButtonVisible ||
            bookConfig.FlipSound) && this.buttons.add(new PhoneBackgroundSoundButton);
        bookConfig.SearchButtonVisible && this.buttons.add(new PhoneSearchButton);
        bookConfig.PrintButtonVisible && this.buttons.add(new PhonePrintButton);
        bookConfig.AnnotationButtonVisible && !isPhone() && this.buttons.add(new PhoneAnnotationButton);
        bookConfig.ShareButtonVisible && this.buttons.add(new PhoneShareButton);
        bookConfig.DownloadButtonVisible && this.buttons.add(new PhoneDownloadButton);
        1 < language.length && this.buttons.add(new PhoneLanguageButton);
        bookConfig.HomeButtonVisible && this.buttons.add(new PhoneHomeButton);
        bookConfig.AutoPlayButtonVisible && this.buttons.add(new PhoneAutoPlayButton);
        bookConfig.EmailButtonVisible && this.buttons.add(new PhoneEmailButton);
        bookConfig.SelectTextButtonVisible && this.buttons.add(new PhoneTextButton);
        1 >= this.buttons.length && bookConfig.enablePageBack && (this.buttons.remove(this.buttons.find("gotopage").get(0)), this.buttons.add(new PhoneBackwardButton), this.buttons.add(new PhoneFirstPageButton), this.buttons.add(new PhonePreviousPageButton),
            this.buttons.add(new PhoneNextPageButton), this.buttons.add(new PhoneLastPageButton), this.buttons.add(new PhoneForwardButton));
        3 >= this.buttons.length && !bookConfig.enablePageBack && (this.buttons.remove(this.buttons.find("gotopage").get(0)), this.buttons.add(new PhoneFirstPageButton), this.buttons.add(new PhonePreviousPageButton), this.buttons.add(new PhoneNextPageButton), this.buttons.add(new PhoneLastPageButton));
        6 < this.buttons.length && this.buttons.add(new PhoneMoreButton);
        bookConfig.InstructionsButtonVisible &&
            this.buttons.add(new PhoneInstructionsButton);
        this.buttons.each(function(b) {
            b.setCallback(this.afterButtonClick.bind(this));
            this.setButtonTitle(b)
        }.bind(this))
    },
    setButtonTitle: function(b) {
        b.setTitle(b.caption)
    },
    resetButtonPosition: function() {
        (new PhoneButtonQueue({
            buttons: this.buttons,
            barWidth: windowWidth,
            buttonWidth: 40,
            buttonTop: 0,
            topBar: this.topBar,
            bottomBar: this.bottomBar,
            extended: this.extendedBar
        })).sort();
        this.extendedBar.resize();
        this.extendedBar.hide();
        this.buttons.each(function(b) {
            b.changeColor();
            b.changeCaptionColor()
        }.bind(this))
    },
    initStyle: function() {
        bookConfig.appLogoIcon || bookConfig.InstructionsButtonVisible || this.topBar.remove();
        this.topBar.css({
            background: this.color
        });
        this.bottomBar.css({
            "background-color": this.color
        })
    },
    initExtendedbar: function() {
        this.extendedBar = new PhoneExtendedBar(this.parent);
        global.moreBar = this.extendedBar
    },
    onResize: function(b, c) {
        this.resetButtonPosition()
    },
    getHeight: function() {
        return 0
    },
    getTopHeight: function() {
        return 0
    },
    getLogoHeight: function() {
        return 0
    },
    getBottomHeight: function() {
        return 0
    },
    getWidth: function() {
        return 0
    },
    initEvents: function() {
        this.topBar && this.topBar.bind(_event._enter, function() {
            this.enterOption && window.clearTimeout(this.enterOption)
        }.bind(this));
        this.bottomBar && this.bottomBar.bind(_event._enter, function() {
            this.enterOption && window.clearTimeout(this.enterOption)
        }.bind(this))
    },
    show: function() {        
        var $Thmb = $(".thumbnail_win10");
        if($Thmb.attr("framethumb")=="show"){
            $Thmb.fadeIn();
        }
        this.visible || (this.visible = !0, this.bottomBar.animate({
                bottom: 0
            }, 300), this.topBar.animate({
                top: 0
            }, 300), bookType == BookType.singlePhone_book && singlePhoneBook && singlePhoneBook.setShow(!1),
            bookType == BookType.phone_book && phoneBook && phoneBook.setShow(!1))
    },
    hide: function() {       
        //openview start
        // lg("frame top bot hide");
        //isPhone() || isPad() ? $(window).loader(phoneIconsURL, c) : $(window).loader(toolBarIconsURL, b)
        if(window.innerHeight<420){
            $(".thumbnail_win10").hide();
            this.visible && (this.enterOption && window.clearTimeout(this.enterOption), this.visible = !1, this.bottomBar.animate({
                bottom: -60     
            }, 300), this.topBar.animate({
                top: -60
            }, 300), global.phoneGotoPagePanel && global.phoneGotoPagePanel.hide(), this.extendedBar && this.extendedBar.hide(), bookType == BookType.singlePhone_book && singlePhoneBook && singlePhoneBook.setShow(!0), bookType == BookType.phone_book && phoneBook && phoneBook.setShow(!0))
        }else{
            if(isPhone() || isPad()){
             if(window.innerHeight<600){
                $(".thumbnail_win10").hide();
                this.visible && (this.enterOption && window.clearTimeout(this.enterOption), this.visible = !1, this.bottomBar.animate({
                    bottom: -60     
                }, 300), this.topBar.animate({
                    top: -60
                }, 300), global.phoneGotoPagePanel && global.phoneGotoPagePanel.hide(), this.extendedBar && this.extendedBar.hide(), bookType == BookType.singlePhone_book && singlePhoneBook && singlePhoneBook.setShow(!0), bookType == BookType.phone_book && phoneBook && phoneBook.setShow(!0))            
             }else{
                this.visible && (this.enterOption && window.clearTimeout(this.enterOption), this.visible = !1, this.bottomBar.animate({
                    bottom: 0       
                }, 300), this.topBar.animate({
                    top: 0
                }, 300), global.phoneGotoPagePanel && global.phoneGotoPagePanel.hide(), this.extendedBar && this.extendedBar.hide(), bookType == BookType.singlePhone_book && singlePhoneBook && singlePhoneBook.setShow(!0), bookType == BookType.phone_book && phoneBook && phoneBook.setShow(!0))                            
             }
            }else{
                this.visible && (this.enterOption && window.clearTimeout(this.enterOption), this.visible = !1, this.bottomBar.animate({
                    bottom: 0       
                }, 300), this.topBar.animate({
                    top: 0
                }, 300), global.phoneGotoPagePanel && global.phoneGotoPagePanel.hide(), this.extendedBar && this.extendedBar.hide(), bookType == BookType.singlePhone_book && singlePhoneBook && singlePhoneBook.setShow(!0), bookType == BookType.phone_book && phoneBook && phoneBook.setShow(!0))
            }    
        } 
        //openview end
    },
    showOrHide: function() {
        !0 ===
            this.visible ? this.hide() : this.show()
    },
    enterToShow: function() {
        this.show();
        this.enterOption = window.setTimeout(this.hide.bind(this), 5E3)
    }
}).extend("Toolbar");
share_description, share_screenshot, AnalysisShare = Class({
        create: function() {
            share_screenshot = Directory.getFilePath(share_url).substring(0, share_url.lastIndexOf("/")) + "/" + bookConfig.thumbPath + "1.jpg";
            0 <= bookConfig.thumbPath.indexOf("../") && (share_screenshot = Directory.getFilePath(share_url).substring(0, share_url.lastIndexOf("/")), share_screenshot = Directory.getUpperFilePath(share_screenshot) + bookConfig.thumbPath.remove("../") +
                "1.jpg");
            share_description = bookConfig.bookDescription;
            bookConfig.socialShareLink && (share_url = bookConfig.socialShareLink);
            this.refreshList()
        },
        getList: function() {
            return this.shareList
        },
        refreshList: function() {
            this.url = Metacharacter(share_url);
            this.title = Metacharacter(share_title);
            this.screenshot = Metacharacter(share_screenshot);
            this.description = Metacharacter(share_description);
            this.shareList = window.shareObj ? this.initShareList() : this.initDefaultShareList()
        },
        initShareList: function() {
            if (!window.shareObj ||
                0 >= window.shareObj.length) return [];
            for (var b = window.shareObj.length, c = [], d = 0; d < b; d++) {
                var f = this.fixItemInfo(window.shareObj[d]);
                c.push(f)
            }
            return c
        },
        fixItemInfo: function(b) {
            if (b) {
                var c = share_url,
                    d = "",
                    f = "";
                try {
                    d = window.parent.location.href, f = window.top.location.href
                } catch (g) {}
                var h = window.document.title,
                    k = c.substring(0, c.lastIndexOf("/")) + "/" + bookConfig.thumbPath + "1.jpg",
                    l = b.url + "";
                0 <= l.indexOf("${url_no_page}") && (l = l.remove("${url_no_page}"), c = c.removeStartFrom("#p="), d = d.removeStartFrom("#p="), f =
                    f.removeStartFrom("#p="));
                l = l.replaceAll("${url}", c, !0);
                l = l.replaceAll("${url_parent}", d, !0);
                l = l.replaceAll("${url_top}", f, !0);
                l = l.replaceAll("${shot-img}", k, !0);
                l = l.replaceAll("${title}", h, !0);
                c = b.logo + "";
                bookConfig.isFlipPdf && c.startsWith("./") && (c = "." + c);
                return {
                    url: l,
                    logo: c,
                    title: b.title + ""
                }
            }
        },
        initDefaultShareList: function() {
            return [
            {
                logo: uiBaseURL + "wa.png",
                url: "whatsapp://send?text=" + this.url + "&text=" + this.url,
                title: "Whatsapp",
                name: "Whatsapp"
            },
            {
                logo: uiBaseURL + "tl.png",
                url: "https://telegram.me/share/url?url=" + this.url,
                title: "Telegram",
                name: "Telegram"
            },{
                logo: uiBaseURL + "facebook.png",
                url: "javascript:ShareToFaceBook({url:share_url, title:share_title, screenshot:share_screenshot, description:share_description})",
                title: "Facebook",
                name: "facebook"
            },/* {
                logo: uiBaseURL + "google.png",
                url: "https://plus.google.com/share?url=" + this.url,
                title: "Google",
                name: "google"
            }, */{
                logo: uiBaseURL + "email.png",
                url: getEmailUrl(),
                title: "Email",
                name: "email"
            }, {
                logo: uiBaseURL + "twitter.png",
                url: "https://twitter.com/intent/tweet?url=" + this.url + "&text=" + this.url,
                title: "Twitter",
                name: "twitter"
            }]
        }
    })

var PcShareForm = Class({
    create: function(b) {
        this.elements = new ShareElements(this);
        this._super(b)
    },
    onCreate: function() {
        this.stage.css({
            "background-color": this.mainColor,
            color: this.fontColor
        });
        this.titleList.css({
            "border-bottom": "1px solid " + this.fontColorObj.rgba(0.1)
        });
        this.shareTitle.css({
            "border-bottom": "2px solid " + this.fontColor
        });
        this._super()
    },
    initHtml: function() {
        this.stage.append(this.title);
        this.stage.append(this.close);
        var b = $("<div class='share_content'></div>");
        this.stage.append(b);
        this.initTitleList();
        b.append(this.titleList);
        this.content1 = $("<div class='content1'></div>");
        this.content2 = $("<div class='content2'></div>");
        this.content1.append(this.linkTitle);
        this.content1.append(this.linkArea);
        this.content1.append(this.copy1);
        this.content1.append($("<p>" + getLanguage("frmShareCaption", "Share") + ":</p>"));
        var c;
        c = getLanguage("frmShareInfo", "You can easily share this publication to social networks, just click the appropriate button below.");
        this.content1.append($("<p>" + c + "</p>"));
        this.content1.append(this.sharePanel);
        c = getLanguage("frminsertInfo", "Use the code below to embed this publication to your website.");
        this.content2.append($("<p>" + c + "</p>"));
        this.content2.append(this.insertArea);
        this.content2.append(this.copy2);
        b.append(this.content1);
        b.append(this.content2);
        this._super()
    },
    initTitleList: function() {
        this.titleList = $("<div class='title_list'></div>");
        this.shareTitle = $("<span class='focus'>" + getLanguage("frmShareCaption", "Share") + "</span>");
        this.insertTitle = $("<span>" + getLanguage("frminsertLabel", "Insert to Site") +
            "</span>");
        this.titleList.append(this.shareTitle);
        this.titleList.append(this.insertTitle);
        this.shareTitle.bind("mousedown", function(b) {
            b.stopPropagation()
        });
        this.insertTitle.bind("mousedown", function(b) {
            b.stopPropagation()
        });
        this.shareTitle.onTap(function() {
            this.insertTitle.removeClass("focus");
            this.shareTitle.addClass("focus");
            this.insertTitle.css({
                "border-bottom": "none"
            });
            this.shareTitle.css({
                "border-bottom": "2px solid " + this.fontColor
            });
            this.content1.show();
            this.content2.hide()
        }.bind(this));
        this.insertTitle.onTap(function() {
            this.insertTitle.addClass("focus");
            this.shareTitle.removeClass("focus");
            this.shareTitle.css({
                "border-bottom": "none"
            });
            this.insertTitle.css({
                "border-bottom": "2px solid " + this.fontColor
            });
            this.content1.hide();
            this.content2.show()
        }.bind(this))
    },
    onShow: function() {
        this.close.changeButtonColor(this.fontColor)
    }
}).extend(FadeOutFadeForm);

var BookInstructionsPage = Class({
        create: function(b, c) {
            this.parent = b;
            this.initHtml(b, c);
            this.initEvent()
        },
        initHtml: function(b, c) {
            this.container = $("<div class='bookInstructions helpPage'></div>");
            this.title = $("<h3 class='bookInstructions helpTitle'>" + this.getTitle() + "</h3>");
            this.image = $("<div class='bookInstructions helpPageImg'" + this.getImageURL(c) + "></div>");
            this.description = $("<div class='bookInstructions helpBottomText'>" + this.getDescription(c) + "</div>");
            b.append(this.container);
            this.container.append(this.title);
            this.container.append(this.image);
            this.container.append(this.description);
            this.container.attr("bookInstructionPageNum", c)
        },
        getImageURL: function(b) {
            return "style='background: url(" + uiBaseURL + b + "-2x-ov.png) no-repeat center  center ;background-size:contain;'"
        },
        getTitle: function() {
            return getLanguage("frmHowToUse", "How to use")
        },
        getDescription: function(b) {
            switch (b) {
                case 1:
                    return getLanguage("lblHelpPage1", "Click to access OpenView's easy-read format");
                case 2:
                    return getLanguage("lblHelpPage2", "Share on social media");
                case 3:
                    return getLanguage("lblHelpPage3", "Click to zoom");
                case 4:
                    return getLanguage("lblHelpPage4", "Jump to a page");
                case 5:
                    return getLanguage("lblHelpPage5", "view / hide editorial carousel")
            }
        },
        initEvent: function() {
            (new Hammer(this.container[0])).on("swipe", function(b) {
                10 <= b.deltaX ? bookInstructions.toNextPage() : -10 >= b.deltaX ? bookInstructions.toPreviousPage() : ""
            }.bind(this))
        }
    }),
    BookInstructionsDot =
    Class({
        create: function(b, c) {
            this.parent = b;
            this.id = c;
            this.initHtml();
            this.initEvent()
        },
        initHtml: function() {
            this.dot = $("<li ></li>");
            this.dot.attr("bookInstructionDotNum", this.id);
            1 == this.id ? this.dot.attr("class", "bookInstructions icon_active") : "";
            this.parent.append(this.dot)
        },
        initEvent: function() {
            (new Hammer(this.dot[0])).on("tap", function() {
                this.pageIndex = parseInt(this.dot.attr("bookInstructionDotNum"));
                bookInstructions.setCurrentPage(this.pageIndex)
            }.bind(this))
        }
    }),
    BookInstructions = Class({
        create: function(b) {
            this.pageWidth =
                document.body.clientWidth;
            this.pageIndex = 1;
            this.totalPageCount = 5;
            this.closeSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzQyMUQ1MUVBRjlBMTFFNjk0NUZCNDY1NTgzODYzOTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzQyMUQ1MUZBRjlBMTFFNjk0NUZCNDY1NTgzODYzOTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NDIxRDUxQ0FGOUExMUU2OTQ1RkI0NjU1ODM4NjM5NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NDIxRDUxREFGOUExMUU2OTQ1RkI0NjU1ODM4NjM5NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PosYs0wAAABhSURBVHja7NRBCgAgCATAlP7/5e0SEZK6gdClhW46UEoCoFVGW3E+uIJ5ohxrPFC2Jg/b66gre6iLMW9o0RBjhyIs9mxtQA6KAi2WonqBUSult3uWoT1pYKb/f5viDAEGAD4SFiVn1efjAAAAAElFTkSuQmCC";
            this.visible = !1;
            this.parent = b;
            this.pages = [];
            this.initHtml(b);
            this.initCss();
            this.initEvent()
        },
        initHtml: function(b) {
            this.container = $("<div class='bookInstructions helpBody hide'></div>");
            this.swiper = $("<div class='bookInstructions swiper'></div>");
            this.dots = $('<ul class="bookInstructions helpBullet"></ul>');
            for (var c = 1; 5 >= c; c++) this.pages.push(new BookInstructionsPage(this.swiper, c)), new BookInstructionsDot(this.dots, c);
            this.closeBtn = $('<span class="bookInstructions icon_drop" ><img src=' + this.closeSrc +
                "></span>");
            b.append(this.container);
            this.container.append(this.swiper);
            this.container.append(this.dots);
            this.container.append(this.closeBtn)
        },
        initCss: function() {
            var b = transformCSS({
                tran: {
                    x: this.pageWidth,
                    y: 0
                }
            });
            this.container.css({
                "background-image": "url(" + uiBaseURL + 'bg.png")no-repeat',
                "background-position": "bottom"
            });
            this.container.css(b);
            b = transformCSS({
                tran: {
                    x: 0,
                    y: 0
                }
            });
            this.swiper.css(b)
        },
        toNextPage: function() {
            this.setCurrentPage(1 < this.pageIndex - 1 ? this.pageIndex - 1 : 1)
        },
        toPreviousPage: function() {
            this.setCurrentPage(this.pageIndex +
                1 >= this.totalPageCount ? this.totalPageCount : this.pageIndex + 1)
        },
        setCurrentPage: function(b) {
            this.pageIndex = b ? b : this.pageIndex;
            b = transformCSS({
                tran: {
                    x: -(this.pageIndex - 1) * this.pageWidth,
                    y: 0
                }
            });
            animateOnce(this.swiper, b, 300, null);
            this.dots.find("li").removeClass("icon_active");
            this.dots.find("li[bookInstructionDotNum=" + this.pageIndex + "]").addClass("icon_active")
        },
        showOrhide: function() {
            this.visible ? this.hide() : this.show()
        },
        show: function() {
            this.visible = !0;
            this.container.removeClass("hide");
            var b = transformCSS({
                tran: {
                    x: 0,
                    y: 0
                }
            });
            animateOnce(this.container, b, 300, function() {}.bind(this))
        },
        hide: function() {
            this.visible = !1;
            var b = transformCSS({
                tran: {
                    x: this.pageWidth,
                    y: 0
                }
            });
            animateOnce(this.container, b, 300, function() {
                this.container.addClass("hide")
            }.bind(this))
        },
        showOrHide: function() {
            this.visible ? this.hide() : this.show()
        },
        initEvent: function() {
            this.container.bind("touchstart", function(b) {
                b.preventDefault()
            });
            this.closeBtn.bind(_event._end, function() {
                this.hide()
            }.bind(this));
            $(window).resize(function(b) {
                this.pageWidth = document.body.clientWidth;
                this.setCurrentPage()
            }.bind(this))
        },
        changeLanguage: function() {
            for (var b = 0; b < this.pages.length; b++) {
                var c = this.pages[b];
                c.title.html(c.getTitle());
                c.description.html(c.getDescription(b + 1))
            }
        }
    });

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function initComponents() {
    //if (isPhone() || isPad()) {
    //openview start
    bookConfig.PrintButtonVisible && (global.printBody = new PcPrintForm({
        parent: tmpContainer,
        formType: "print",
        rightToLeft: rightToLeft
    })), bookConfig.HelpButtonVisible && (global.helpBody = new PcHelpForm({
        parent: tmpContainer,
        formType: "help",
        rightToLeft: rightToLeft
    })), bookConfig.aboutButtonVisible && (global.aboutBody = new PcAboutForm({
        parent: tmpContainer,
        formType: "about",
        rightToLeft: rightToLeft
    })), bookConfig.ShareButtonVisible && (global.sharePanel = new PcShareForm({
        parent: tmpContainer,
        formType: "share",
        rightToLeft: rightToLeft
    })), 1 < language.length && (global.languagePanel = new PcLanguageForm({
        parent: tmpContainer,
        formType: "language",
        rightToLeft: rightToLeft
    })), bookConfig.VideoButtonVisible && (global.videoGallery = new PcVideoGalleryForm({
        parent: tmpContainer,
        formType: "videoGallery",
        rightToLeft: rightToLeft
    }, global.videoList)), bookConfig.SlideshowButtonVisible &&
    (global.photoGallery = new PhotoGallery(tmpContainer, global.slideshow)), bookConfig.TableOfContentButtonVisible && (global.frmTableOfContent = new PcTableOfContentForm({
        parent: tmpContainer,
        formType: "tableOfContent",
        rightToLeft: rightToLeft
    })), bookConfig.SearchButtonVisible && (global.frmSearch = new PcSearchForm({
        parent: tmpContainer,
        formType: "search",
        rightToLeft: rightToLeft
    })), bookConfig.ThumbnailsButtonVisible && ("catalog" == bookConfig.FlipStyle.toLowerCase() && "lite" == bookConfig.ToolbarViewMode.toLowerCase() &&
        (global.thumbnail = new CatalogThumbnailBar(tmpContainer)), isSlideBook() && "lite" == bookConfig.ToolbarViewMode.toLowerCase() && (global.thumbnail = new SlideThumbnailBar(tmpContainer)), global.thumbnail || (global.thumbnail = new ThumbnailForm({
            parent: tmpContainer,
            formType: "thumbnail",
            rightToLeft: rightToLeft
        }))), !isBelowIE9() && bookConfig.BookMarkButtonVisible && (global.bookmark = new PcBookmarkForm({
        parent: tmpContainer,
        formType: "bookmark",
        rightToLeft: rightToLeft
    })), initLogoBar();
    !isPhone() && bookConfig.AnnotationButtonVisible &&     (global.annotationPannel = new AnnotationPannel(tmpContainer));
    bookConfig.QRCode && (global.QRcode = new CodeBar(tmpContainer), global.QRbutton = new QRButton(tmpContainer));
    initFlipSound();
    global.backgroundObj = new initBackground(tmpContainer);
    bookConfig.flipshortcutbutton && (global.flipShotButton = new FlipShotButton(tmpContainer));
    global.auto_player = new AutoFlip;
    global.bgSound = new BackgroundSound;
    global.volumeControlBar = new VolumeControlBar(tmpContainer);
    global.flipPageAudio = new FlipByAudio(tmpContainer, global.flipByAudio)    
    //openview start
}

function lg(log=''){
    console.log(log);
}