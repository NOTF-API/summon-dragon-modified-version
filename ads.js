var videoContent = document.getElementById('contentElement');

var adDisplayContainer =
    new google.ima.AdDisplayContainer(
        document.getElementById('adContainer'),
        videoContent);
        
adDisplayContainer.initialize();

var adsLoader = new google.ima.AdsLoader(adDisplayContainer);

adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);

function onAdError(adErrorEvent) {
    console.log("adError");
    document.getElementById("adContainer").style.display = "none";
    var GameConfig = __require("GameConfig");

    if (GameConfig.playNum == 0) {

        adCompleteFlag = true;
        if (adCompleteFlag && resCompleteFlag) {

            adCompleteFlag = false;

            var launchScene = GameConfig.launchScene;
            var Bros = GameConfig.Bros;
            var caS = GameConfig.caS;
            cc.director.loadScene(launchScene, null,
                function () {
                    adCompleteFlag = false;
                    if (Bros) {
                        caS = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }
                    cc.loader.onProgress = null;
                    console.log('Success to load scene: ' + launchScene);
                }
            );
        }
    }
    adEndComplete = true;
    if (adEndComplete && resEndComplete) {
        adEndComplete = false;
        console.log("indexOverErr");
        var MainManger = __require("MainManage");
        MainManger.showGameEndLayer();
    }
    console.log(adErrorEvent.getError());
    adsManager.destroy();
}


var contentEndedListener = function () {
    adsLoader.contentComplete();
};
videoContent.onended = contentEndedListener;

var preloader = new google.ima.AdsRequest();
preloader.adTagUrl = 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8708616103041212&description_url=http%3A%2F%2Fwww.vsane.com&videoad_start_delay=-1&hl=zh_CN&max_ad_duration=15000';
preloader.linearAdSlotWidth = 640;
preloader.linearAdSlotHeight = 400;
preloader.nonLinearAdSlotWidth = 640;
preloader.nonLinearAdSlotHeight = 400;


function showMyAds() {
    if (typeof (killads) == 'undefined') {
        console.log("AdNo");
        adEndComplete = false;
        var MainManger = __require("MainManage");
        MainManger.showGameEndLayer();
    } else {
        var winHeight = document.documentElement.clientHeight;
        if (document.body.clientHeight > 700) {
            document.getElementById("adContainer").style.height = winHeight - 85 + "px";
        } else {
            document.getElementById("adContainer").style.height = winHeight - 65 + "px";
        }
        document.getElementById("adContainer").style.display = "block";
        adsLoader.requestAds(preloader);
    }
}


function onAdsManagerLoaded(adsManagerLoadedEvent) {
    console.log("ADLoad");
    adCompleteFlag = true;
    adsManager = adsManagerLoadedEvent.getAdsManager(
        videoContent);
    adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested);

    var o = document.getElementById("adContainer");
    var h = o.offsetHeight;
    var w = o.offsetWidth;
    try {
        adsManager.init(w, h, google.ima.ViewMode.FULLSCREEN);
        adsManager.start();
    } catch (adError) {}
}

function onContentPauseRequested() {
    videoContent.removeEventListener('ended', contentEndedListener);
    videoContent.pause();
}

function onContentResumeRequested() {
    console.log("ADLoadComplete", resEndComplete);
    var GameConfig = __require("GameConfig");
    console.log("IndexMainManger", GameConfig.launchScene, GameConfig.Bros, GameConfig.caS);
    if (GameConfig.playNum == 1) {
        adCompleteFlag = true;
        if (adCompleteFlag && resCompleteFlag) {
            var launchScene = GameConfig.launchScene;
            var Bros = GameConfig.Bros;
            var caS = GameConfig.caS;
            cc.director.loadScene(launchScene, null,
                function () {
                    adCompleteFlag = false;
                    if (Bros) {
                        var canvas = document.getElementById('GameCanvas');
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }
                    cc.loader.onProgress = null;
                    console.log('Success to load scene1: ' + launchScene);
                }
            );
        }
    }
    adEndComplete = true;
    if (adEndComplete && resEndComplete) {
        adEndComplete = false;
        console.log("indexOverErr");
        var MainManger = __require("MainManage");
        MainManger.showGameEndLayer();
    }
    document.getElementById("adContainer").style.display = "none";
}

function noAdGoToScene() {
    var GameConfig = __require("GameConfig");
    console.log("IndexMainMangerMaing", GameConfig.launchScene, GameConfig.Bros, GameConfig.caS);
    var launchScene = GameConfig.launchScene;
    var Bros = GameConfig.Bros;
    var caS = GameConfig.caS;
    cc.director.loadScene(launchScene, null,
        function () {
            adCompleteFlag = false;
            if (Bros) {
                var canvas = document.getElementById('GameCanvas');
                canvas.style.visibility = '';
                var div = document.getElementById('GameDiv');
                if (div) {
                    div.style.backgroundImage = '';
                }
            }
            cc.loader.onProgress = null;
            console.log('Success to load scene1Main: ' + launchScene);
        }
    );
}