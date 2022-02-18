var _oInterface;
var _oAudioToggle;
var _oAudioToggleMute;
function CInterface(iCurBet,iTotBet,iMoney){

    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    var _aPayline;
    var _oButExit;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _isShowNextResult;

    var _oInfoBut;
    var _oPreviewBut;
    var _oQuitBut;

    var _oPlusLineBut;
    var _oMinusLineBut;
    var _oPlusCoinBut;
	var _oMinusCoinBut;
    var _oMaxBetBut;
    var _oSpinBut;
    var _oAutoSpinBut;

    var _oOnNextResultToggle;
    var _oRedeemBut;
    var _oAddEntriesBut;

    var _oShow10ResultBut;
    var _oBanner1But;
    var _oBanner2But;
    
    var _oFreeSpinNumText;
    var _oNumLinesText;
    var _oCoinText;
    var _oWinText;
    var _oMoneyText;
    
    var _oNextTitText;
    var _oEntriesTitText
    var _oLinesTitText;
    var _oBetTitText;
    var _oWinTitText;
    var _oWinningTitText;

    var _oNextResultText;
    var _oEntriesText;

    var _oFreeSpinPanel;

    var _oLinesBox;
    var _oTotalBetBox;

    this._init = function(iCurBet,iTotBet,iMoney){
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH + 5000 - (oSprite.width/2) - 2,y:(oSprite.height/2) + 2};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oAttachSection);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon')
            _oAudioToggle = new CTextButton(299, 38, 0, -1, oSprite, " ", " ", FONT_BOLD, "#fdf9bf", 15);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
			_oAudioToggle.setVisible(true);
			
			 oSprite = s_oSpriteLibrary.getSprite('audio_icon_mute')
            _oAudioToggleMute = new CTextButton(299, 38, 0, -1, oSprite, " ", " ", FONT_BOLD, "#fdf9bf", 15);
            _oAudioToggleMute.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
			_oAudioToggleMute.setVisible(false);
            
            _pStartPosFullscreen = {x:_pStartPosExit.x - oSprite.width/2 - 2,y:oSprite.height/2 + 2};
        }else{
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:_pStartPosExit.x - (oSprite.width/2) - 2,y:(oSprite.height/2) + 2};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oAttachSection);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        //this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
        _isShowNextResult = false;

        this.InitTopButton();
        
        this.InitBottom1();
        this.InitBottom2();
        this.InitLines();
		_oSoundPanel = new CSoundPanel();
        _oPopup = new CPopup();
        _oTenNextResult = new CTenNextResult();
        _oNextResultText.text = " ";
        _oCouponPopup = new CCouponPopup();
        _oAddEntriesPopup = new CAddEntriesPopup();
        _oRedeemPopup = new CRedeemPopup();
        _oNotification = new CNotification();
        this.InitRightSide();
    };

    this.InitLines = function(){
        _aPayline = new Array();
        for(var k = 0;k<NUM_PAYLINES;k++){
            var oBmp = createBitmap(s_oSpriteLibrary.getSprite('payline_'+(k+1) ));
            oBmp.visible = false;
            oBmp.x = 75;
            s_oAttachSection.addChild(oBmp);
            _aPayline[k] = oBmp;
        }
    };

    this.InitTopButton = function(){
        var oSprite = s_oSpriteLibrary.getSprite('info_but');
        _oInfoBut = new CTextButton(351 + (oSprite.width / 2), 39, 0, 0, oSprite, TEXT_PAYTABLE," ", FONT_REGULAR, "#ffffff", 17);
        _oInfoBut.addEventListener(ON_MOUSE_UP, this._onInfo, this);

        oSprite = s_oSpriteLibrary.getSprite('info_but');
        _oPreviewBut = new CTextButton(490 + (oSprite.width / 2), 39, 0, 0, oSprite, TEXT_PREVIEW," ", FONT_REGULAR, "#ffffff", 17);
        _oPreviewBut.addEventListener(ON_MOUSE_UP, this._onPreview, this);

        oSprite = s_oSpriteLibrary.getSprite('info_but');
        _oQuitBut = new CTextButton(930 + (oSprite.width / 2), 39, 0, 3, oSprite, "QUIT"," ", FONT_REGULAR, "#ffffff", 17);
        _oQuitBut.addEventListener(ON_MOUSE_UP, this._onQuit, this);
    };

    this.InitRightSide = function(){
        var oSprite = s_oSpriteLibrary.getSprite('MadamSkiBtn');
        _oShow10ResultBut = new CTextButton(1085 + (oSprite.width / 2), 150, 0, 5, oSprite, " "," ", FONT_REGULAR, "#ffffff", 24);
        _oShow10ResultBut.addEventListener(ON_MOUSE_UP, this.show10NextResult, this);

        oSprite = s_oSpriteLibrary.getSprite('Banner');
        _oBanner1But = new CTextButton(1092 + (oSprite.width / 2), 375, 0, 5, oSprite, " "," ", FONT_REGULAR, "#ffffff", 24);
        _oBanner1But.addEventListener(ON_MOUSE_UP, this.showCoupon1, this);

        oSprite = s_oSpriteLibrary.getSprite('Banner');
        _oBanner2But = new CTextButton(1092 + (oSprite.width / 2), 550, 0, 5, oSprite, " "," ", FONT_REGULAR, "#ffffff", 24);
        _oBanner2But.addEventListener(ON_MOUSE_UP, this.showCoupon2, this);
    };

    this.InitBottom1 = function(){


		
        var oSprite = s_oSpriteLibrary.getSprite('MinusBtn');
        _oMinusLineBut = new CTextButton(288 + (oSprite.width / 2), 544, 0, 0,oSprite," "," ",FONT_BOLD,"#ffffff",30);
        _oMinusLineBut.addEventListener(ON_MOUSE_UP, this._onMinusLine, this);

        oSprite = s_oSpriteLibrary.getSprite('PlusBtn');
        _oPlusLineBut = new CTextButton(345 + (oSprite.width / 2), 544, 0, 0, oSprite, " "," ", FONT_BOLD, "#ffffff", 30);
        _oPlusLineBut.addEventListener(ON_MOUSE_UP, this._onPlusLine, this);
        
        oSprite = s_oSpriteLibrary.getSprite('MinusBtn');
        _oMinusCoinBut = new CTextButton(441 + (oSprite.width / 2), 544, 0, 0, oSprite, " "," ",FONT_BOLD,"#ffffff",30);
        _oMinusCoinBut.addEventListener(ON_MOUSE_UP, this._onMinusBet, this);

        oSprite = s_oSpriteLibrary.getSprite('PlusBtn');
        _oPlusCoinBut = new CTextButton(511 + (oSprite.width / 2), 544, 0, 0, oSprite, " "," ", FONT_BOLD, "#ffffff", 30);
        _oPlusCoinBut.addEventListener(ON_MOUSE_UP, this._onPlusBet, this);

        oSprite = s_oSpriteLibrary.getSprite('spin_but');
        _oSpinBut = new CTextButton(590 + (oSprite.width / 2),560, -1, -4, oSprite, " "," ", FONT_REGULAR, "#ffffff", 37);
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);

        _oFreeSpinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('freespin_panel'));
        _oFreeSpinPanel.x = 590;
        _oFreeSpinPanel.y = 475;
        _oFreeSpinPanel.visible = false;
        s_oAttachSection.addChild(_oFreeSpinPanel);

        oSprite = s_oSpriteLibrary.getSprite('but_maxbet_bg');
        _oMaxBetBut = new CTextButton(543 + (oSprite.width / 2), CANVAS_HEIGHT - (oSprite.height / 2) - 9 , 0, 0,oSprite,TEXT_MAX_BET," ",FONT_REGULAR,"#ffffff",17);
        _oMaxBetBut.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);

        oSprite = s_oSpriteLibrary.getSprite('but_autospin');
        _oAutoSpinBut = new CTextButton(675 + (oSprite.width / 2), CANVAS_HEIGHT - (oSprite.height / 2) - 9, 0, 0, oSprite, TEXT_AUTOSPIN," ", FONT_REGULAR, "#ffffff", 17); //732
        _oAutoSpinBut.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);

        _oNumLinesText = new createjs.Text(NUM_PAYLINES, "25px " + FONT_BOLD, "#ffde00");
        _oNumLinesText.x =  343;
        _oNumLinesText.y = 551;
        _oNumLinesText.textAlign = "center";
        _oNumLinesText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oNumLinesText);
        
        _oCoinText = new createjs.Text(iCurBet.toFixed(2), "25px " + FONT_BOLD, "#ffde00");
        _oCoinText.x =  502;
        _oCoinText.y = 551;
        _oCoinText.textAlign = "center";
        _oCoinText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oCoinText);
        
        _oWinText = new createjs.Text(TEXT_CURRENCY + "0.00", "25px " + FONT_BOLD, "#ffde00");
        _oWinText.x = 780;
        _oWinText.y = 551;
        _oWinText.textAlign = "center";
        _oWinText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oWinText);

        _oMoneyText = new createjs.Text(TEXT_CURRENCY + iMoney.toFixed(2) , "25px " + FONT_BOLD, "#ffde00");
        _oMoneyText.x = 922;
        _oMoneyText.y = 551;
        _oMoneyText.textAlign = "center";
        _oMoneyText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oMoneyText);

        _oFreeSpinNumText = new createjs.Text("", "50px " + FONT_REGULAR, "#ffde00");
        _oFreeSpinNumText.x = 660;
        _oFreeSpinNumText.y = CANVAS_HEIGHT - 100;
        _oFreeSpinNumText.textAlign = "center";
        _oFreeSpinNumText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oFreeSpinNumText);

        _oLinesTitText = new createjs.Text("LINES", "20px " + FONT_REGULAR, "#ffffff");
        _oLinesTitText.x = 343;
        _oLinesTitText.y = 522;
        _oLinesTitText.textAlign = "center";
        _oLinesTitText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oLinesTitText);

        _oBetTitText = new createjs.Text(TEXT_BET, "20px " + FONT_REGULAR, "#ffffff");
        _oBetTitText.x = 502;
        _oBetTitText.y = 522;
        _oBetTitText.textAlign = "center";
        _oBetTitText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oBetTitText);

        _oWinTitText = new createjs.Text("WIN", "20px " + FONT_REGULAR, "#ffffff");
        _oWinTitText.x = 780;
        _oWinTitText.y = 522;
        _oWinTitText.textAlign = "center";
        _oWinTitText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oWinTitText);

        _oWinningTitText = new createjs.Text("WINNINGS", "20px " + FONT_REGULAR, "#ffffff");
        _oWinningTitText.x = 920;
        _oWinningTitText.y = 522;
        _oWinningTitText.textAlign = "center";
        _oWinningTitText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oWinningTitText);
    };

    this.CheckFreeSpinPanel = function(){
        return _oFreeSpinPanel.visible;
    };

    this.SetVisibleFreeSpinPanel = function(_visible){
        _oFreeSpinPanel.visible = _visible;
    };

    this.InitBottom2 = function(){
        var oSprite = s_oSpriteLibrary.getSprite('Btn2');
        _oRedeemBut = new CTextButton(810 + (oSprite.width / 2), 614, 0, 0, oSprite, "REDEEM"," ", FONT_REGULAR, "#ffffff", 17);
        _oRedeemBut.addEventListener(ON_MOUSE_UP, this._onRedeem, this);

        oSprite = s_oSpriteLibrary.getSprite('Btn2');
        _oAddEntriesBut = new CTextButton(946 + (oSprite.width / 2), 614, 0, 0, oSprite, "ADD ENTRIES"," ", FONT_REGULAR, "#ffffff", 17);
        _oAddEntriesBut.addEventListener(ON_MOUSE_UP, this._onAddEntries, this);

        _oEntriesTitText = new createjs.Text("ENTRIES", "20px " + FONT_REGULAR, "#ffffff"); 
        _oEntriesTitText.x = 475;
        _oEntriesTitText.y = 591;
        _oEntriesTitText.textAlign = "center";
        _oEntriesTitText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oEntriesTitText);

        _oEntriesText = new createjs.Text("50000", "25px " + FONT_BOLD, "#ffde00");
        _oEntriesText.x =  475;
        _oEntriesText.y = 621;
        _oEntriesText.textAlign = "center";
        _oEntriesText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oEntriesText);

        _oNextTitText = new createjs.Text("NEXT", "20px " + FONT_REGULAR, "#ffffff"); 
        _oNextTitText.x =  327;
        _oNextTitText.y = 591;
        _oNextTitText.textAlign = "center";
        _oNextTitText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oNextTitText);

        _oNextResultText = new createjs.Text("$0.00", "25px " + FONT_BOLD, "#ffde00");
        _oNextResultText.x =  350;
        _oNextResultText.y = 621;
        _oNextResultText.textAlign = "center";
        _oNextResultText.textBaseline = "alphabetic";
        s_oAttachSection.addChild(_oNextResultText);

        oSprite = s_oSpriteLibrary.getSprite('on_nextresult')
        _oOnNextResultToggle = new CToggle(376,585,oSprite,s_bAudioActive,s_oAttachSection);
        _oOnNextResultToggle.addEventListener(ON_MOUSE_UP, this._onShowNextResultToggle, this);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        _oSpinBut.unload();
        _oSpinBut = null;
        _oAutoSpinBut.unload();
        _oAutoSpinBut = null;
        _oInfoBut.unload();
        _oInfoBut = null;
        _oPlusLineBut.unload();
        _oPlusLineBut = null;
		_oMinusLineBut.unload();
        _oMinusLineBut = null;
        _oPlusCoinBut.unload();
        _oPlusCoinBut = null;
		_oMinusCoinBut.unload();
        _oMinusCoinBut = null;
        _oMaxBetBut.unload();
        _oMaxBetBut = null;
		_oPreviewBut.unload();
		_oPreviewBut = null;
        
        if(DISABLE_SOUND_MOBILE === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
        
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(200, 50);
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };

    this.refreshMoney = function(iMoney){
        _oMoneyText.text = TEXT_CURRENCY + iMoney.toFixed(2);
    };
    
    this.refreshBet = function(iBet){
        _oCoinText.text = iBet.toFixed(2);
    };
    
    this.refreshNumLines = function(iLines){
        _oNumLinesText.text = iLines;
        
        for(var i=0;i<NUM_PAYLINES;i++){
            if(i<iLines){
                _aPayline[i].visible = true;
            }else{

            }
        }
        
        setTimeout(function(){for(var i=0;i<NUM_PAYLINES;i++){
            _aPayline[i].visible = false;
        }},1000);
    };
    
    this.resetWin = function(){
        _oWinText.text = TEXT_CURRENCY + "0.00";
    };
    
    this.refreshWinText = function(iWin){
        _oWinText.text = TEXT_CURRENCY + iWin.toFixed(2);
        
    };
    
    this.refreshFreeSpinNum = function(iNum){
        _oFreeSpinNumText.text = iNum;
    };
    
    this.showLine = function(iLine){
        _aPayline[iLine-1].visible = true;
    };
    
    this.hideLine = function(iLine){
        _aPayline[iLine-1].visible = false;
    };
    
    this.hideAllLines = function(){
        for(var i=0;i<NUM_PAYLINES;i++){
            _aPayline[i].visible = false;
        }
    };
    
    this.disableBetBut = function(bDisable){
        for(var i=0;i<NUM_PAYLINES;i++){
            
        }
    };
    
    this.enableGuiButtons = function(){
        _oSpinBut.enable();
        _oAutoSpinBut.setText(TEXT_AUTOSPIN);
        _oAutoSpinBut.enable();
        _oMaxBetBut.enable();
        _oPlusCoinBut.enable();
		_oPreviewBut.enable();
		_oMinusCoinBut.enable();
        _oPlusLineBut.enable();
		_oMinusLineBut.enable();
        _oInfoBut.enable();
        _oShow10ResultBut.enable();
        _oBanner1But.enable();
        _oBanner2But.enable();
        _oAddEntriesBut.enable();
        _oRedeemBut.enable();
        _oQuitBut.enable();
    };
	
    this.enableSpin = function(){
        _oSpinBut.enable();
        _oAutoSpinBut.setText(TEXT_AUTOSPIN);
        _oAutoSpinBut.enable();
        _oMaxBetBut.enable();
    };
    
    this.enableAutoSpin = function(){
        _oAutoSpinBut.enable();
    };

    this.disableSpin = function(bAutoSpin){
        _oSpinBut.disable();
        if(bAutoSpin){
            _oAutoSpinBut.setText(TEXT_STOP_AUTO);
        }else{
            _oAutoSpinBut.disable();
        }
        _oMaxBetBut.disable();
    };
    
    this.disableAutoSpin = function(){
        _oAutoSpinBut.disable();
    };
    
    this.disableGuiButtons = function(bAutoSpin){
        _oInfoBut.disable();
        _oPreviewBut.disable();
        _oQuitBut.disable();

        _oPlusLineBut.disable();
        _oMinusLineBut.disable();

        _oPlusCoinBut.disable();
        _oMinusCoinBut.disable();
        
        _oMaxBetBut.disable();
        _oSpinBut.disable();
        if(bAutoSpin){
            _oAutoSpinBut.setText(TEXT_STOP_AUTO);
        }else{
            _oAutoSpinBut.disable();
        }

        _oRedeemBut.disable();
        _oAddEntriesBut.disable();

        _oShow10ResultBut.disable();
        _oBanner1But.disable();
        _oBanner2But.disable();
    };

    this.disableGuiButtonsWhenPreview = function(){
        _oSpinBut.disable();
        _oAutoSpinBut.disable();
        _oMaxBetBut.disable();
        _oPlusCoinBut.disable();
		_oMinusCoinBut.disable();
        _oPlusLineBut.disable();
		_oMinusLineBut.disable();
        _oInfoBut.disable();
        _oShow10ResultBut.disable();
        _oBanner1But.disable();
        _oBanner2But.disable();
        _oAddEntriesBut.disable();
        _oRedeemBut.disable();
        _oQuitBut.disable();
    };
    
    this._onBetLineClicked = function(iLine){
        this.refreshNumLines(iLine);
        
        s_oGame.activateLines(iLine);
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    this._onSpin = function(){
        playSound("Spin",1,0);
        s_oGame.onSpin();
    };
    
    this._onAutoSpin = function(){
        playSound("press_but",1,0);
        if(_oAutoSpinBut.getText() === TEXT_AUTOSPIN){
            s_oGame.onAutoSpin();
        }else{
            _oAutoSpinBut.disable();
            _oAutoSpinBut.setText(TEXT_AUTOSPIN);
            
            s_oGame.onStopAutoSpin();
        }
        
    };
    
    this._onMinusLine = function(){
        playSound("Decrease",1,0);
        s_oGame.MinusLine();
    };

    this._onPlusLine = function () {
        playSound("Increase",1,0);
        s_oGame.PlusLine();
    };
    
    this._onInfo = function(){
        playSound("press_but",1,0);
        s_oGame.onInfoClicked();
    };

    this._onPreview = function () {
        playSound("press_but",1,0);
        //this.show10NextResult();
        if(isPreviewShow){
            GetSymbolBeforePreview();
            this.enableGuiButtons();
            _oPreviewBut.setText(TEXT_PREVIEW);
        }else{
            GetResultPreview();
            this.disableGuiButtonsWhenPreview();
            _oPreviewBut.setText(TEXT_RETURN);
        }
        
    };

    this._onQuit = function(){
        playSound("press_but",1,0);
    };
    
    this._onMinusBet = function(){
        playSound("Decrease",1,0);
        s_oGame.MinusCoinBet();
    };

    this._onPlusBet = function () {
        playSound("Increase",1,0);
        s_oGame.PlusCoinBet();
    };
    
    this._onMaxBet = function(){
        playSound("Spin",1,0);
        s_oGame.onMaxBet();
    };

    this._onShowNextResultToggle = function(){
        _isShowNextResult = !_isShowNextResult;
        this._onShowNextResult();
    };

    this._onShowNextResult = function(){
        var indexCoin = findIndexCoin(_iCurBet);
        var indexLineActive = _iLastLineActive - 1;
        if(listResult[indexLineActive][indexCoin].length <= 0){
            return;
        }
        if(!_isShowNextResult){
            //off   
            _oNextResultText.text = " ";
        }else{
            //on
            var result = parseFloat(s_oGame.Get1NextResult());
            result = Math.floor(result * 100) / 100;
            _oNextResultText.text = "$" + result.toFixed(2);
        }
    };

    this.show10NextResult = function(){
        playSound("press_but",1,0);
        _oTenNextResult.show10NextResult();
    };

    this.showCoupon1 = function(){
        playSound("press_but",1,0);
        _oCouponPopup.ShowCoupon(0);
    };

    this.showCoupon2 = function(){
        playSound("press_but",1,0);
        _oCouponPopup.ShowCoupon(1);
    };
	
	this._onRedeem = function(){
        playSound("press_but",1,0);
        _oRedeemPopup.show();
    };
    
    this._onAddEntries = function(){
        playSound("press_but",1,0);
        _oAddEntriesPopup.show();
    };
	
	this._refreshEntries = function(_entries){
		_oEntriesText.text = _entries;
	};
    
    this._onAudioToggle = function(){
        _oSoundPanel.show(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init(iCurBet,iTotBet,iMoney);
    
    return this;
}

var s_oInterface = null;