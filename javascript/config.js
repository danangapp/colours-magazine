var flipstyle;
var flippingTime;
var HomeButtonVisible;
var HomeURL;
var ShareButtonVisible;
var FlipSound;
var backGroundImgURL;
var DownloadButtonVisible;
var PrintButtonVisible;
var appLogoIcon = "files/extfile/logo.png";
var appLogoLinkURL = "/";
var bookTitle = "";
var bookDescription = "";
var DownloadURL = "";
var Vimg = "?v2";

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    flipstyle = "Slide";
    flippingTime = 0;
    HomeButtonVisible = "Show";1
    HomeURL = "/";
    DownloadButtonVisible = "Hide";
    ShareButtonVisible = "Show";
    FlipSound = "No";
    backGroundImgURL = "files/extfile/bg.jpg";
    $(".button[title='Print']").hide();
    PrintButtonVisible = "Hide";
    Hilang = "Hide";
} else {
    flipstyle = "Flip";
    flippingTime = 0.6;
    HomeButtonVisible = "Hide";
    HomeURL = "";
    DownloadButtonVisible = "Show";
    ShareButtonVisible = "Hide";
    FlipSound = "No";
    backGroundImgURL = "files/extfile/bg.jpg";
    $(".button[title='Print']").show();
    PrintButtonVisible = "Show";    
    Hilang = "Show";
}
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');
}

function orgt(s) {
    return binl2hex(core_hx(str2binl(s), s.length * chrsz));
}
var bookConfig = {
    DownloadButtonVisible: "Hide",
    BookmarkButtonVisible: "Hide",
    searchColor: "#00ffff",
    searchAlpha: 0.3,
    leastSearchChar: 0,
    CreatedBy: "Flip HTML5 for windows 6.3.7.0",
    BookTemplateName: "Metro",
    loadingBackground: "#0f1624",
    searchPositionJS: "files/search/text_position[%d].js",
    loadingCaption: "Loading",
    loadingCaptionColor: "#DDDDDD",
    loadingPicture: "assets/images/vv.gif",
    loadingPicture2: "assets/images/ga-logo.png",
    bgBeginColor: "#F5F5F5",
    bgEndColor: "#F5F5F5",
    bgMRotation: 90,
    backGroundImgURL: backGroundImgURL,
    backgroundPosition: "Stretch",
    backgroundOpacity: 100,
    backgroundScene: "None",
    LeftShadowWidth: 100,
    LeftShadowAlpha: 1,
    RightShadowWidth: 40,
    RightShadowAlpha: 1,
    ShowTopLeftShadow: "Yes",
    FlipStyle: flipstyle,
    FlipDirection: "0",
    autoDoublePage: "Yes",
    showMirrorSide: "Show",
    retainBookCenter: "Yes",
    isTheBookOpen: "No",
    RightToLeft: "No",
    pageBackgroundColor: "#FFFFFF",
    OriginPageIndex: 1,
    flipshortcutbutton: "Show",
    QRCode: "Hide",
    thicknessWidthType: "thick",
    thicknessColor: "#FFFFFF",
    BindingType: "side",
    HardPageEnable: "No",
    hardCoverBorderWidth: 8,
    cornerRound: 8,
    borderColor: "#572F0D",
    outerCoverBorder: "Yes",
    coverTexture: "none",
    HardInnerPageEnable: "No",
    totalPagesCaption: "",
    pageNumberCaption: "",
    leftMargin: 10,
    topMargin: 10,
    rightMargin: 10,
    bottomMargin: 10,
    leftMarginOnMobile: 0,
    topMarginOnMobile: 0,
    rightMarginOnMobile: 0,
    bottomMarginOnMobile: 0,
    bleedAreaLeft: "0%",
    bleedAreaTop: "0%",
    bleedAreaRight: "0%",
    bleedAreaBottom: "0%",
    maxWidthToSmallMode: "400",
    maxHeightToSmallMode: "300",
    appLogoIcon: "files/extfile/logo-clr.png",
    // appLogoLinkURL: "https://colours-indonesia.com/",
    appLogoLinkURL: "#",
    appLogoOpenWindow: "Blank",
    bookTitle: "FLIPBOOK",
    bookDescription: "",
    toolbarColor: "#22305F",
    // iconColor: "#b49252",
    iconColor: "#d4b170",
    iconFontColor: "#717171",
    pageNumColor: "#333333",
    formBackgroundColor: "#333333",
    formFontColor: "#EEEEEE",
    logoHeight: "25",
    logoPadding: "10",
    logoTop: "8",
    logoLeft: "0", //addd
    FirstButtonIcon: "",
    PreviousButtonIcon: "",
    NextButtonIcon: "",
    LastButtonIcon: "",
    enablePageBack: "Hide",
    BackwardButtonIcon: "",
    ForwardButtonIcon: "",
    HomeButtonVisible: "Hide",
    HomeURL: "%first page%",
    HomeButtonIcon: "",
    AnnotationButtonVisible: "Hide",
    AnnotationButtonIcon: "",
    ShareButtonVisible: "Show",
    PageButtonVisible: "Hide",
    ShareButtonIcon: "files/extfile/people.png",
    ThumbnailsButtonVisible: "Show",
    thumbnailAlpha: 100,
    ThumbnailButtonIcon: "",
    ZoomButtonVisible: "Show",
    ZoomInButtonIcon: "",
    ZoomOutButtonIcon: "",
    FullscreenButtonVisible: "Hide",
    FullscreenButtonIcon: "",
    ExitFullscreenButtonIcon: "",
    BookMarkButtonVisible: Hilang,
    BookmarkButtonIcon: "",
    TableOfContentButtonVisible: "Show",
    TableOfContentButtonIcon: "",
    SearchButtonVisible: "Hide",
    leastSearchChar: 3,
    searchKeywordFontColor: "#FFB000",
    SearchButtonIcon: "",
    SelectTextButtonVisible: "Hide",
    SelectTextButtonIcon: "",
    PrintButtonVisible: "Hide",
    PrintButtonIcon: "",
    printWatermarkFile: "",
    BackgroundSoundButtonVisible: "Hide",
    BackgroundSoundURL: "",
    BackgroundSoundLoop: -1,
    BackgroundSoundButtonOnIcon: "",
    BackgroundSoundButtonOffIcon: "",
    HelpButtonVisible: "Hide",
    helpContentFileURL: "",
    helpWidth: 400,
    helpHeight: 450,
    showHelpContentAtFirst: "No",
    HelpButtonIcon: "",
    InstructionsButtonVisible: "Show",
    InstructionsButtonIcon: "files/extfile/pre_image_white.png?v1",
    aboutButtonVisible: "Hide",
    CompanyLogoFile: "",
    AboutButtonIcon: "",
    AutoPlayButtonVisible: "Hide",
    autoPlayAutoStart: "No",
    autoPlayDuration: 3,
    autoPlayLoopCount: 1,
    AutoPlayStartButtonIcon: "",
    AutoPlayStopButtonIcon: "",
    minZoomWidth: 403,
    minZoomHeight: 518,
    DownloadButtonVisible: "Show",
    DownloadButtonIcon: "files/extfile/ov.png",
    DownloadURL: "ovi.html"+Vimg,
    VideoButtonVisible: "Hide",
    VideoButtonIcon: "",
    SlideshowButtonVisible: "Hide",
    SlideshowButtonIcon: "",
    PhoneButtonVisible: "Hide",
    PhoneButtonIcon: "",
    FlipSound: FlipSound,
    flippingTime: flippingTime,
    mouseWheelFlip: "Yes",
    CurlingPageCorner: "No",
    updateURLForPage: "Yes",
    OpenWindow: "Blank",
    showLinkHint: "No",
    haveAdSense: "No",
    adSenseWidth: 200,
    adSenseHeight: 200,
    adSenseLeft: 50,
    adSenseTop: 50,
    adSenseClientId: "",
    googleAnalyticsID: "",
    language: "English",
    AboutAddress: "Guang Dong Guang Zhou China",
    AboutEmail: "support@fliphtml5.com",
    AboutMobile: "",
    AboutWebsite: "http://www.fliphtml5.com",
    AboutDescription: "FlipHTML5 Software Co., Ltd., established in 2010, is headquartered in China, with branch offices in HongKong China. We have focused on Digital Flip Book publishing tools for years, and been the leading flipbook software provider in the world. We supply to customers all over the world. We are committed to offering cost-effective software and service for commercial or personal use.",
    AboutAuthor: "fliphtml5.com",
    SlideshowAutoPlay: false,
    SlideshowPlayInterval: 5,
    totalPageCount: 44,
    largePageWidth: 1654,
    largePageHeight: 2205,
    normalPath: "files/page/",
    largePath: "files/page/",
    thumbPath: "files/thumb/"
}

var fliphtml5_pages=[{"l":"files/page/1.jpg"+Vimg, "n":"files/page/1.jpg"+Vimg, "t":"files/thumb/1.jpg"+Vimg},{"l":"files/page/2.jpg"+Vimg, "n":"files/page/2.jpg"+Vimg, "t":"files/thumb/2.jpg"+Vimg},{"l":"files/page/3.jpg"+Vimg, "n":"files/page/3.jpg"+Vimg, "t":"files/thumb/3.jpg"+Vimg},{"l":"files/page/4.jpg"+Vimg, "n":"files/page/4.jpg"+Vimg, "t":"files/thumb/4.jpg"+Vimg},{"l":"files/page/5.jpg"+Vimg, "n":"files/page/5.jpg"+Vimg, "t":"files/thumb/5.jpg"+Vimg},{"l":"files/page/6.jpg"+Vimg, "n":"files/page/6.jpg"+Vimg, "t":"files/thumb/6.jpg"+Vimg},{"l":"files/page/7.jpg"+Vimg, "n":"files/page/7.jpg"+Vimg, "t":"files/thumb/7.jpg"+Vimg},{"l":"files/page/8.jpg"+Vimg, "n":"files/page/8.jpg"+Vimg, "t":"files/thumb/8.jpg"+Vimg},{"l":"files/page/9.jpg"+Vimg, "n":"files/page/9.jpg"+Vimg, "t":"files/thumb/9.jpg"+Vimg},{"l":"files/page/10.jpg"+Vimg, "n":"files/page/10.jpg"+Vimg, "t":"files/thumb/10.jpg"+Vimg},{"l":"files/page/11.jpg"+Vimg, "n":"files/page/11.jpg"+Vimg, "t":"files/thumb/11.jpg"+Vimg},{"l":"files/page/12.jpg"+Vimg, "n":"files/page/12.jpg"+Vimg, "t":"files/thumb/12.jpg"+Vimg},{"l":"files/page/13.jpg"+Vimg, "n":"files/page/13.jpg"+Vimg, "t":"files/thumb/13.jpg"+Vimg},{"l":"files/page/14.jpg"+Vimg, "n":"files/page/14.jpg"+Vimg, "t":"files/thumb/14.jpg"+Vimg},{"l":"files/page/15.jpg"+Vimg, "n":"files/page/15.jpg"+Vimg, "t":"files/thumb/15.jpg"+Vimg},{"l":"files/page/16.jpg"+Vimg, "n":"files/page/16.jpg"+Vimg, "t":"files/thumb/16.jpg"+Vimg},{"l":"files/page/17.jpg"+Vimg, "n":"files/page/17.jpg"+Vimg, "t":"files/thumb/17.jpg"+Vimg},{"l":"files/page/18.jpg"+Vimg, "n":"files/page/18.jpg"+Vimg, "t":"files/thumb/18.jpg"+Vimg},{"l":"files/page/19.jpg"+Vimg, "n":"files/page/19.jpg"+Vimg, "t":"files/thumb/19.jpg"+Vimg},{"l":"files/page/20.jpg"+Vimg, "n":"files/page/20.jpg"+Vimg, "t":"files/thumb/20.jpg"+Vimg},{"l":"files/page/21.jpg"+Vimg, "n":"files/page/21.jpg"+Vimg, "t":"files/thumb/21.jpg"+Vimg},{"l":"files/page/22.jpg"+Vimg, "n":"files/page/22.jpg"+Vimg, "t":"files/thumb/22.jpg"+Vimg},{"l":"files/page/23.jpg"+Vimg, "n":"files/page/23.jpg"+Vimg, "t":"files/thumb/23.jpg"+Vimg},{"l":"files/page/24.jpg"+Vimg, "n":"files/page/24.jpg"+Vimg, "t":"files/thumb/24.jpg"+Vimg},{"l":"files/page/25.jpg"+Vimg, "n":"files/page/25.jpg"+Vimg, "t":"files/thumb/25.jpg"+Vimg},{"l":"files/page/26.jpg"+Vimg, "n":"files/page/26.jpg"+Vimg, "t":"files/thumb/26.jpg"+Vimg},{"l":"files/page/27.jpg"+Vimg, "n":"files/page/27.jpg"+Vimg, "t":"files/thumb/27.jpg"+Vimg},{"l":"files/page/28.jpg"+Vimg, "n":"files/page/28.jpg"+Vimg, "t":"files/thumb/28.jpg"+Vimg},{"l":"files/page/29.jpg"+Vimg, "n":"files/page/29.jpg"+Vimg, "t":"files/thumb/29.jpg"+Vimg},{"l":"files/page/30.jpg"+Vimg, "n":"files/page/30.jpg"+Vimg, "t":"files/thumb/30.jpg"+Vimg},{"l":"files/page/31.jpg"+Vimg, "n":"files/page/31.jpg"+Vimg, "t":"files/thumb/31.jpg"+Vimg},{"l":"files/page/32.jpg"+Vimg, "n":"files/page/32.jpg"+Vimg, "t":"files/thumb/32.jpg"+Vimg},{"l":"files/page/33.jpg"+Vimg, "n":"files/page/33.jpg"+Vimg, "t":"files/thumb/33.jpg"+Vimg},{"l":"files/page/34.jpg"+Vimg, "n":"files/page/34.jpg"+Vimg, "t":"files/thumb/34.jpg"+Vimg},{"l":"files/page/35.jpg"+Vimg, "n":"files/page/35.jpg"+Vimg, "t":"files/thumb/35.jpg"+Vimg},{"l":"files/page/36.jpg"+Vimg, "n":"files/page/36.jpg"+Vimg, "t":"files/thumb/36.jpg"+Vimg},{"l":"files/page/37.jpg"+Vimg, "n":"files/page/37.jpg"+Vimg, "t":"files/thumb/37.jpg"+Vimg},{"l":"files/page/38.jpg"+Vimg, "n":"files/page/38.jpg"+Vimg, "t":"files/thumb/38.jpg"+Vimg},{"l":"files/page/39.jpg"+Vimg, "n":"files/page/39.jpg"+Vimg, "t":"files/thumb/39.jpg"+Vimg},{"l":"files/page/40.jpg"+Vimg, "n":"files/page/40.jpg"+Vimg, "t":"files/thumb/40.jpg"+Vimg},{"l":"files/page/41.jpg"+Vimg, "n":"files/page/41.jpg"+Vimg, "t":"files/thumb/41.jpg"+Vimg},{"l":"files/page/42.jpg"+Vimg, "n":"files/page/42.jpg"+Vimg, "t":"files/thumb/42.jpg"+Vimg},{"l":"files/page/43.jpg"+Vimg, "n":"files/page/43.jpg"+Vimg, "t":"files/thumb/43.jpg"+Vimg},{"l":"files/page/44.jpg"+Vimg, "n":"files/page/44.jpg"+Vimg, "t":"files/thumb/44.jpg"+Vimg},{"l":"files/page/45.jpg"+Vimg, "n":"files/page/45.jpg"+Vimg, "t":"files/thumb/45.jpg"+Vimg},{"l":"files/page/46.jpg"+Vimg, "n":"files/page/46.jpg"+Vimg, "t":"files/thumb/46.jpg"+Vimg},{"l":"files/page/47.jpg"+Vimg, "n":"files/page/47.jpg"+Vimg, "t":"files/thumb/47.jpg"+Vimg},{"l":"files/page/48.jpg"+Vimg, "n":"files/page/48.jpg"+Vimg, "t":"files/thumb/48.jpg"+Vimg}];
var language = [{
    language: "english",
    btnFirstPage: "First",
    btnNextPage: "Next",
    btnLastPage: "Last",
    btnPrePage: "Previous",
    btnGoToHome: "Home",
    btnDownload: "OpenView",
    btnSoundOn: "Sound On",
    btnSoundOff: "Sound Off",
    btnPrint: "Print",
    btnThumb: "Thumbnails",
    btnBookMark: "Bookmark",
    frmBookMark: "Bookmark",
    btnZoomIn: "Zoom In",
    btnZoomOut: "Zoom Out",
    btnAutoFlip: "Hide",
    btnStopAutoFlip: "Stop Auto Flip",
    btnSocialShare: "Share",
    btnHelp: "Help",
    btnAbout: "About",
    btnSearch: "Search",
    btnFullscreen: "Fullscreen",
    btnExitFullscreen: "Exit Fullscreen",
    btnMore: "More",
    frmPrintCaption: "Print",
    frmPrintall: "Print All Pages",
    frmPrintcurrent: "Print Current Page",
    frmPrintRange: "Print Range",
    frmPrintexample: "Example: 2,3,5-10",
    frmPrintbtn: "Print",
    frmShareCaption: "Share",
    frmShareLabel: "Share",
    frmShareInfo: "You can easily share this publication to social networks.Just click the appropriate button below",
    frminsertLabel: "Insert to Site",
    frminsertInfo: "Use the code below to embed this publication to your website.",
    frmaboutcaption: "Contact",
    frmaboutcontactinformation: "Contact Information",
    frmaboutADDRESS: "Address",
    frmaboutEMAIL: "Email",
    frmaboutWEBSITE: "Website",
    frmaboutMOBILE: "Mobile",
    frmaboutAUTHOR: "Author",
    frmaboutDESCRIPTION: "Description",
    frmSearch: "Search",
    frmToc: "Table Of Contents",
    btnTableOfContent: "Table Of Contents",
    btnNote: "Annotation",
    lblLast: "This is the last page.",
    lblFirst: "This is the first page.",
    lblFullscreen: "Click to view in fullscreen",
    lblName: "Name",
    lblPassword: "Password",
    lblLogin: "Login",
    lblCancel: "Cancel",
    lblNoName: "User name can not be empty.",
    lblNoPassword: "Password can not be empty.",
    lblNoCorrectLogin: "Please enter the correct user name and password.",
    btnVideo: "Video Gallery",
    btnSlideShow: "Slideshow",
    pnlSearchInputInvalid: "The search text is too short.",
    btnDragToMove: "Move by mouse drag",
    btnPositionToMove: "Move by mouse position",
    lblHelp1: "Drag the page corner to view",
    lblHelp2: "Double click to zoom in, out",
    lblCopy: "Copy",
    lblAddToPage: "Add To Page",
    lblPage: "Page",
    lblTitle: "Title",
    lblEdit: "Edit",
    lblDelete: "Delete",
    lblRemoveAll: "Remove All",
    tltCursor: "Cursor",
    tltAddHighlight: "Add highlight",
    tltAddTexts: "Add texts",
    tltAddShapes: "Add shapes",
    tltAddNotes: "Add notes",
    tltAddImageFile: "Add image file",
    tltAddSignature: "Add signature",
    tltAddLine: "Add line",
    tltAddArrow: "Add arrow",
    tltAddRect: "Add rect",
    tltAddEllipse: "Add ellipse",
    lblDoubleClickToZoomIn: "Double click to zoom in.",
    lblPages: "Pages",
    infCopyToClipboard: "Your browser dose not support clipboard, please do it yourself.",
    lblDescription: "Title",
    frmLinkLabel: "Link",
    infNotSupportHtml5: "Your browser does not support HTML5.",
    frmHowToUse: "How To Use",
    lblHelpPage1: "Click to access OpenView's easy-read format",
    lblHelpPage2: "Share on social media",
    lblHelpPage3: "Click to zoom",
    lblHelpPage4: "Jump to a page",
    lblHelpPage5: "view / hide editorial carousel.",
    frmQrcodeCaption: "Scan the bottom two-dimensional code to view with mobile phone.",
    btnPageBack: "Backward",
    btnPageForward: "Forward",
    btnLanguage: "Change Language",
    msgConfigMissing: "Configuration file is missing, unable to open the book.",
    frmTelephone: "Tel",
    btnDialing: "Call",
    lblSelectMessage: "Please copy the the text content in the text box.",
    btnSelectText: "Select Text"
}];
var ols = [{
    "caption": "Salam Garuda Indonesia",
    "page": 2,
    "level": 1,
    "children": []
}, {
    "caption": "Publisher",
    "page": 4,
    "level": 1,
    "children": []
},{
    "caption": "Travel : Singapore",
    "page": 6,
    "level": 1,
    "children": []
}, {
    "caption": "GarudaMiles",
    "page": 20,
    "level": 1,
    "children": []
}, {
    "caption": "News",
    "page": 24,
    "level": 1,
    "children": []
}, {
    "caption": "Garuda Indonesia",
    "page": 16,
    "level": 1,
    "children": [{
        "caption": "Onboard",
        "page": 16,
        "level": 2,
        "children": []
    }, {
        "caption": "Invocation",
        "page": 18,
        "level": 2,
        "children": []
    }, {
        "caption": "Fly Healthy",
        "page": 19,
        "level": 2,
        "children": []
    },{
        "caption": "Sky Team News Office",
        "page": 26,
        "level": 2,
        "children": []
    }, {
        "caption": "World Office",
        "page": 30,
        "level": 2,
        "children": []
    }, {
        "caption": "Airport Map",
        "page": 31,
        "level": 2,
        "children": []
    }, {
        "caption": "Customs Declaration Assistance",
        "page": 32,
        "level": 2,
        "children": []
    }, {
        "caption": "Hand Hygiene",
        "page": 33,
        "level": 2,
        "children": []
    }, {
        "caption": "Fleet Facts",
        "page": 36,
        "level": 2,
        "children": []
    }, {
        "caption": "Flight Schedule",
        "page": 38,
        "level": 2,
        "children": []
    }, {
        "caption": "Domestic Network",
        "page": 39,
        "level": 2,
        "children": []
    }, {
        "caption": "International Network",
        "page": 40,
        "level": 2,
        "children": []
    }]
}];
var bmtConfig = [];
var staticAd = {
    "haveAd": false,
    "interval": 3000,
    "data": []
};
var videoList = [];
var slideshow = [];
var flipByAudio = {
    "audioType": 0,
    "audioFile": "",
    "showPlayer": false,
    "items": []
};
var phoneNumber = [];
var bookPlugin = null;
$(".phoneTopBar").hide();
var appBanners = document.getElementsByClassName('phoneTopBar');

for (var i = 0; i < appBanners.length; i++) {
    appBanners[i].style.display = 'none';
}
