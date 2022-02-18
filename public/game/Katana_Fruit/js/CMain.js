function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
		canvas.addEventListener("touchstart", dragStart, false);
		canvas.addEventListener("touchend", dragEnd, false);
		canvas.addEventListener("touchmove", drag, false);

		canvas.addEventListener("mousedown", dragStart, false);
		canvas.addEventListener("mouseup", dragEnd, false);
		canvas.addEventListener("mousemove", drag, false);
        s_oStage = new createjs.Stage(canvas);  
        
        s_oAttachSection = new createjs.Container();
        s_oStage.addChild(s_oAttachSection);
        
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", this._update);
	
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        
    };

    this.soundLoaded = function(){
         _iCurResource++;
         var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *92);

         _oPreloader.refreshLoader(iPerc);
         if(_iCurResource === RESOURCE_TO_LOAD){
            this._loadImages();
            _bUpdate = true;
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }
		
        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/press_but.ogg", "press_but");
                createjs.Sound.registerSound("./sounds/reels.ogg", "reels");
                createjs.Sound.registerSound("./sounds/reel_stop.ogg", "reel_stop",6);
                createjs.Sound.registerSound("./sounds/start_reel.ogg", "start_reel",5);
                

                createjs.Sound.registerSound("./sounds/Mr_Chicken_BGMusic.ogg", "BGMusic");
				createjs.Sound.registerSound("./sounds/reveal_egg.ogg", "reveal_egg");
                createjs.Sound.registerSound("./sounds/BonusSymbol.ogg", "BonusSymbol",6);
                createjs.Sound.registerSound("./sounds/FreespinSymbol.ogg", "FreespinSymbol",6);
                createjs.Sound.registerSound("./sounds/WildSymbol.ogg", "WildSymbol",6);
                createjs.Sound.registerSound("./sounds/Spin.ogg", "Spin");
                createjs.Sound.registerSound("./sounds/Decrease.ogg", "Decrease");
                createjs.Sound.registerSound("./sounds/Increase.ogg", "Increase");
                createjs.Sound.registerSound("./sounds/SmallWin.ogg", "SmallWin");
                createjs.Sound.registerSound("./sounds/BigWin.ogg", "BigWin");
                createjs.Sound.registerSound("./sounds/MegaWin.ogg", "MegaWin");

				
				createjs.Sound.registerSound("./sounds/avatar_win.ogg", "avatar_win");
				createjs.Sound.registerSound("./sounds/avatar_cut.ogg", "avatar_cut");
				createjs.Sound.registerSound("./sounds/bonus_end.ogg", "bonus_end");
				createjs.Sound.registerSound("./sounds/bonus_mult.ogg", "bonus_mult");
				createjs.Sound.registerSound("./sounds/swoosh.ogg", "swoosh");
				
				createjs.Sound.registerSound("./sounds/symbol_0_1_2.ogg", "symbol_0_1_2");
				createjs.Sound.registerSound("./sounds/symbol_3_4_5.ogg", "symbol_3_4_5");
				createjs.Sound.registerSound("./sounds/symbol_6.ogg", "symbol_6");
				createjs.Sound.registerSound("./sounds/symbol_7_8_9.ogg", "symbol_7_8_9");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/press_but.mp3", "press_but");
                createjs.Sound.registerSound("./sounds/reels.mp3", "reels");
                createjs.Sound.registerSound("./sounds/reel_stop.mp3", "reel_stop",6);
                createjs.Sound.registerSound("./sounds/start_reel.mp3", "start_reel",5);

                createjs.Sound.registerSound("./sounds/Mr_Chicken_BGMusic.mp3", "BGMusic");
				createjs.Sound.registerSound("./sounds/reveal_egg.mp3", "reveal_egg");

                createjs.Sound.registerSound("./sounds/BonusSymbol.mp3", "BonusSymbol",6);
                createjs.Sound.registerSound("./sounds/FreespinSymbol.mp3", "FreespinSymbol",6);
                createjs.Sound.registerSound("./sounds/WildSymbol.mp3", "WildSymbol",6);
                createjs.Sound.registerSound("./sounds/Spin.mp3", "Spin");
                createjs.Sound.registerSound("./sounds/Decrease.mp3", "Decrease");
                createjs.Sound.registerSound("./sounds/Increase.mp3", "Increase");
                createjs.Sound.registerSound("./sounds/SmallWin.mp3", "SmallWin");
                createjs.Sound.registerSound("./sounds/BigWin.mp3", "BigWin");
                createjs.Sound.registerSound("./sounds/MegaWin.mp3", "MegaWin");
				
				
				createjs.Sound.registerSound("./sounds/avatar_win.mp3", "avatar_win");
				createjs.Sound.registerSound("./sounds/avatar_cut.mp3", "avatar_cut");
				createjs.Sound.registerSound("./sounds/bonus_end.mp3", "bonus_end");
				createjs.Sound.registerSound("./sounds/bonus_mult.mp3", "bonus_mult");
				createjs.Sound.registerSound("./sounds/swoosh.mp3", "swoosh");
				
				createjs.Sound.registerSound("./sounds/symbol_0_1_2.mp3", "symbol_0_1_2");
				createjs.Sound.registerSound("./sounds/symbol_3_4_5.mp3", "symbol_3_4_5");
				createjs.Sound.registerSound("./sounds/symbol_6.mp3", "symbol_6");
				createjs.Sound.registerSound("./sounds/symbol_7_8_9.mp3", "symbol_7_8_9");
        }
        RESOURCE_TO_LOAD += 9;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        // NO USER
        s_oSpriteLibrary.addSprite("but_lines_bg","./sprites/nouse/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_bg","./sprites/nouse/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/nouse/but_exit.png");
        s_oSpriteLibrary.addSprite("spin_bg","./sprites/nouse/spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but","./sprites/nouse/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("bet_but","./sprites/nouse/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim","./sprites/nouse/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("logo","./sprites/nouse/logo.png");
        s_oSpriteLibrary.addSprite("logo_freespin","./sprites/nouse/logo_freespin.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/nouse/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/nouse/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/nouse/logo_ctl.png");
        
        //MENU
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/menu/bg_menu.jpg");
		s_oSpriteLibrary.addSprite("but_play_menu","./sprites/menu/but_play.png");

        //LOAD POPUP GAME PLAY SPRITE
        s_oSpriteLibrary.addSprite("WinPopup", "./sprites/popup_gameplay/WinPopup.png");
        s_oSpriteLibrary.addSprite("BigWinPopup", "./sprites/popup_gameplay/BigWinPopup.png");
        s_oSpriteLibrary.addSprite("MegaWinPopup", "./sprites/popup_gameplay/MegaWinPopup.png");
        s_oSpriteLibrary.addSprite("BonusPopup", "./sprites/popup_gameplay/BonusPopup.png");
        s_oSpriteLibrary.addSprite("FreeSpinsPopup", "./sprites/popup_gameplay/FreeSpinsPopup.png");
        s_oSpriteLibrary.addSprite("freespin_panel","./sprites/popup_gameplay/freespin_panel.png");
        
        //LOAD POPUP GAME PLAY SPRITE
        s_oSpriteLibrary.addSprite("NextResultPopup", "./sprites/popup/NextResultPopup.png");
        s_oSpriteLibrary.addSprite("NotificationPopup", "./sprites/popup/NotificationPopup.png");
        s_oSpriteLibrary.addSprite("ExitBtn", "./sprites/popup/ExitBtn.png");
        s_oSpriteLibrary.addSprite("AddEntriesBG", "./sprites/popup/AddEntriesBG.png");
        s_oSpriteLibrary.addSprite("AddEntriesBut1", "./sprites/popup/AddEntriesBut1.png");
        s_oSpriteLibrary.addSprite("AddEntriesBut2", "./sprites/popup/AddEntriesBut2.png");
        s_oSpriteLibrary.addSprite("checkbox", "./sprites/popup/checkbox.png");
        s_oSpriteLibrary.addSprite("RedeemBG", "./sprites/popup/RedeemBG.png");
        s_oSpriteLibrary.addSprite("CouponBG", "./sprites/popup/CouponBG.png");
        s_oSpriteLibrary.addSprite("UndoBut", "./sprites/popup/UndoBut.png");
        s_oSpriteLibrary.addSprite("ValueBut1", "./sprites/popup/ValueBut1.png");
        s_oSpriteLibrary.addSprite("ValueBut2", "./sprites/popup/ValueBut2.png");
        s_oSpriteLibrary.addSprite("CouponPlus", "./sprites/popup/CouponPlus.png");
        s_oSpriteLibrary.addSprite("CouponMinus", "./sprites/popup/CouponMinus.png");
        s_oSpriteLibrary.addSprite("checkbox", "./sprites/popup/checkbox.png");
        s_oSpriteLibrary.addSprite("ConfirmBut", "./sprites/popup/ConfirmBut.png");
    
        //LOAD COUPON BANNER SPRITE
        s_oSpriteLibrary.addSprite("MadamSkiBtn", "./sprites/couponbanner/MadamSkiBtn.png");
        s_oSpriteLibrary.addSprite("Banner", "./sprites/couponbanner/Banner.png");
        
        //LOAD INTERFACE SPRITE
        s_oSpriteLibrary.addSprite("audio_icon_mute","./sprites/interface/audio_icon_mute.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/interface/audio_icon.png");
        s_oSpriteLibrary.addSprite("LinesBox", "./sprites/interface/LinesBox.png");
        s_oSpriteLibrary.addSprite("TotalBetBox", "./sprites/interface/TotalBetBox.png");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/interface/bg_game.jpg");
        s_oSpriteLibrary.addSprite("Btn2", "./sprites/interface/Btn2.png");
        s_oSpriteLibrary.addSprite("mask_slot","./sprites/interface/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but","./sprites/interface/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("but_autospin","./sprites/interface/but_autospin.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg","./sprites/interface/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("info_but","./sprites/interface/but_info_bg.png");
        s_oSpriteLibrary.addSprite("MinusBtn", "./sprites/interface/MinusBtn.png");
        s_oSpriteLibrary.addSprite("PlusBtn", "./sprites/interface/PlusBtn.png");
        s_oSpriteLibrary.addSprite("Fire1", "./sprites/interface/Fire1.png");
        s_oSpriteLibrary.addSprite("Fire2", "./sprites/interface/Fire2.png");
        s_oSpriteLibrary.addSprite("on_nextresult","./sprites/interface/on_nextresult.png");
		s_oSpriteLibrary.addSprite("slideSound","./sprites/interface/slideSound.png");
		s_oSpriteLibrary.addSprite("slidePoint","./sprites/interface/slidePoint.png");
        s_oSpriteLibrary.addSprite("logoAnim","./sprites/interface/logoAnim.png");
        s_oSpriteLibrary.addSprite("avatar_idle","./sprites/interface/avatar_idle.png");
        s_oSpriteLibrary.addSprite("avatar_win","./sprites/interface/avatar_win.png");
        s_oSpriteLibrary.addSprite("particle_effect_0","./sprites/interface/particle_effect_0.png");
        s_oSpriteLibrary.addSprite("particle_effect_1","./sprites/interface/particle_effect_1.png");
        s_oSpriteLibrary.addSprite("particle_effect_2","./sprites/interface/particle_effect_2.png");
        s_oSpriteLibrary.addSprite("particle_effect_3","./sprites/interface/particle_effect_3.png");
		s_oSpriteLibrary.addSprite("msg_box","./sprites/interface/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus","./sprites/interface/bg_loading_bonus.jpg");
        
        
        //LOAD SYMBOLS AND ANIMS SPRITES
        for(var i=1;i<NUM_SYMBOLS+1;i++){
            s_oSpriteLibrary.addSprite("symbol_"+i,"./sprites/symbols/symbol_"+i+".png");
        }
        
        //LOAD WINNING LINES SPRITES
        for(var j=1;j<NUM_PAYLINES+1;j++){
            s_oSpriteLibrary.addSprite("payline_"+j,"./sprites/paylines/payline_"+j+".png");
        }

        //LOAD PAYTABLE SPRITES
        for(var k=1;k<NUM_PAGEPAYTABLE+1;k++){
            s_oSpriteLibrary.addSprite("paytable"+k,"./sprites/paytable/paytable"+k+".jpg");
        }
        s_oSpriteLibrary.addSprite("but_arrow_next","./sprites/paytable/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev","./sprites/paytable/but_arrow_prev.png");
        
        //LOAD BONUS SPRITES
		s_oSpriteLibrary.addSprite("bonus_bg","./sprites/bonus/bonus_bg.jpg");
        s_oSpriteLibrary.addSprite("chicken","./sprites/bonus/chicken.png");
        s_oSpriteLibrary.addSprite("hit_area_chicken","./sprites/bonus/hit_area_chicken.png");
        s_oSpriteLibrary.addSprite("egg","./sprites/bonus/egg.png");
		s_oSpriteLibrary.addSprite("amount_bonus_win","./sprites/bonus/amount_bonus_win.png");
		s_oSpriteLibrary.addSprite("avatar_strafe_in","./sprites/bonus/avatar_strafe_in.png");
		s_oSpriteLibrary.addSprite("avatar_strafe_out","./sprites/bonus/avatar_strafe_out.png");
		s_oSpriteLibrary.addSprite("shadow_fruit","./sprites/bonus/shadow_fruit.png");
		
		
		
		
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD * 92);

        _oPreloader.refreshLoader(iPerc);

        if(_iCurResource === RESOURCE_TO_LOAD){
            setTimeout(function(){
                iPerc = 100;
                _oPreloader.refreshLoader(iPerc);
            }, 1000);
            setTimeout(function(){
                s_oMain.onAllResourcesLoaded(); 
            }, 2000);
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllResourcesLoaded = function(){
        s_oGameSettings = new CSlotSettings();
        s_oMsgBox = new CMsgBox();
        WIN_OCCURRENCE = _oData.win_occurrence;
        MIN_REEL_LOOPS = _oData.min_reel_loop;
        REEL_DELAY = _oData.reel_delay;
        TIME_SHOW_WIN = _oData.time_show_win;
        TIME_SHOW_ALL_WINS = _oData.time_show_all_wins;
        SLOT_CASH = _oData.slot_cash;
        FREESPIN_OCCURRENCE = _oData.freespin_occurrence;
        BONUS_OCCURRENCE = _oData.bonus_occurrence;
        FREESPIN_SYMBOL_NUM_OCCURR = _oData.freespin_symbol_num_occur;
        NUM_FREESPIN = _oData.num_freespin;
        BONUS_PRIZE = _oData.bonus_prize;
        BONUS_PRIZE_OCCURR = _oData.bonus_prize_occur;
        COIN_BET = _oData.coin_bet;
        NUM_SPIN_FOR_ADS = oData.num_spin_ads_showing;
        PAYTABLE_VALUES = new Array();
        for(var i=0;i<7;i++){
            PAYTABLE_VALUES[i] = oData["paytable_symbol_"+(i+1)];
        }
		PERC_WIN_EGG_1 = oData.perc_win_egg_1;
		PERC_WIN_EGG_2= oData.perc_win_egg_2;
		PERC_WIN_EGG_3= oData.perc_win_egg_3;
        //this.gotoMenu();
		this._initBonus();
        SettingWhenStartGame();
    };
	
	this._initBonus = function(){
        s_aEggOccurence = new Array();
        
        var i;
        //OCCURENCE FOR EGG 1
        for(i=0;i<PERC_WIN_EGG_1;i++){
            s_aEggOccurence.push(0);
        }
        
        //OCCURENCE FOR EGG 1
        for(i=0;i<PERC_WIN_EGG_2;i++){
            s_aEggOccurence.push(1);
        }
        
        //OCCURENCE FOR EGG 1
        for(i=0;i<PERC_WIN_EGG_3;i++){
            s_aEggOccurence.push(2);
        }
    };

    this.exitFromMenu = function () {
        s_oMain.gotoGame();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function () {
        _oGame = new CGame(_oData);   				
        _iState = STATE_GAME;
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
	createjs.Sound.setMute(true);
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(s_bAudioActive){
                createjs.Sound.setMute(false);
        }
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
                
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    _oData = oData;
    ENABLE_FULLSCREEN = _oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = _oData.check_orientation;
    SHOW_CREDITS = _oData.show_credits;
    
    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oAttachSection;
var s_oMain;
var s_oSpriteLibrary;
var s_bLogged = false;
var s_oMsgBox;
var s_oGameSettings;
var s_aEggOccurence;