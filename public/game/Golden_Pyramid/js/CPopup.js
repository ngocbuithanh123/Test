var _oPopup;
function CPopup(){
    var _oPCon;
    var _oWinPopup;
    var _oBigWinPopup;
    var _oMegaWinPopup;
    var _oBonusPopup;
    var _oFreeSpinsPopup;
    
    var _iCurAlpha = 0;
    var _oPopupWinText;

    this.Init = function(){
        _oPCon = new createjs.Container();
        s_oAttachSection.addChild(_oPCon); 

        _oWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('WinPopup'));
        _oWinPopup.visible = false;
        _oWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oWinPopup);

        _oBigWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('BigWinPopup'));
        _oBigWinPopup.visible = false;
        _oBigWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oBigWinPopup);

        _oMegaWinPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('MegaWinPopup'));
        _oMegaWinPopup.visible = false;
        _oMegaWinPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oMegaWinPopup);
        
        _oPopupWinText = new createjs.Text(" ", "70px " + FONT_BOLD, "#4f2930");
        _oPopupWinText.x = 660;
        _oPopupWinText.y = 390;
        _oPopupWinText.alpha = _iCurAlpha;
        _oPopupWinText.textAlign = "center";
        _oPopupWinText.textBaseline = "alphabetic";
        _oPCon.addChild(_oPopupWinText);

        _oBonusPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('BonusPopup'));
        _oBonusPopup.visible = false;
        _oBonusPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oBonusPopup);

        _oFreeSpinsPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('FreeSpinsPopup'));
        _oFreeSpinsPopup.visible = false;
        _oFreeSpinsPopup.alpha = _iCurAlpha;
        _oPCon.addChild(_oFreeSpinsPopup); 
    };

    this.showPopup = function(a){
        _oInterface.disableGuiButtons(false);
        _iCurAlpha = 0;
		var timeout = 1000;
        if(a === 0){
            _oWinPopup.visible = true;
            _oWinPopup.alpha = _iCurAlpha;
			timeout = 2000;
        }else if(a === 1){
            _oBigWinPopup.visible = true;
            _oBigWinPopup.alpha = _iCurAlpha;
			timeout = 2100;
        }else if(a === 2){
            _oMegaWinPopup.visible = true;
            _oMegaWinPopup.alpha = _iCurAlpha;
			timeout = 4700;
        }else if(a === 3){
            _oBonusPopup.visible = true;
            _oBonusPopup.alpha = _iCurAlpha;
			timeout = 4700;
        }else if(a === 4){
            _oFreeSpinsPopup.visible = true;
            _oFreeSpinsPopup.alpha = _iCurAlpha;
			timeout = 4700;
        }
        _oPopupWinText.visible = true;
        _oPopupWinText.alpha = _iCurAlpha;
        _oPCon.visible = true;
        this._fadeInPopup(a);
        this.hidePopup();
        setTimeout(() => {
            _oFireAnim.ShowDancingFire();
        }, 000);
    };

    this.hidePopup = function(){
        setTimeout(() => {
            _oFireAnim.showFire1();
            _oFireAnim.hideFire2();
            _iCurAlpha = 0;
            _oWinPopup.visible = false;
            _oWinPopup.alpha = _iCurAlpha;
            _oBigWinPopup.visible = false;
            _oBigWinPopup.alpha = _iCurAlpha;
            _oMegaWinPopup.visible = false;
            _oMegaWinPopup.alpha = _iCurAlpha;
            _oBonusPopup.visible = false;
            _oBonusPopup.alpha = _iCurAlpha;
            _oFreeSpinsPopup.visible = false;
            _oFreeSpinsPopup.alpha = _iCurAlpha;
            _oPopupWinText.visible = false;
            _oPopupWinText.alpha = _iCurAlpha;
            _oPopupWinText.text = " ";
            if(MoneyFromFreeSpin === 0 && !isStartFreeSpin && !isStartBonus){
                _oInterface.enableGuiButtons();
            }
            this.resetPopupWin();
            _oPCon.visible = false;
        }, 3000); 
    };

    this._fadeInPopup = function(a){
        _iCurAlpha = 1;
        var object;
        if(a === 0){
            object = _oWinPopup;
            playSound("SmallWin",1,0);
        }else if(a === 1){
            object = _oBigWinPopup;
            playSound("BigWin",1,0);
        }else if(a === 2){
            object = _oMegaWinPopup;
            playSound("MegaWin",1,0);
        }else if(a === 3){
            object = _oBonusPopup;
            playSound("MegaWin",1,0);
        }else if(a === 4){
            object = _oFreeSpinsPopup;
            playSound("MegaWin",1,0);
        }
        createjs.Tween.get(object).to({alpha:_iCurAlpha }, 1000,createjs.Ease.quintIn);
        createjs.Tween.get(_oPopupWinText).to({alpha:_iCurAlpha }, 1000,createjs.Ease.quintIn);
    };

    this.showPopupText = function(a, b, c){
        var _alpha;
        var _txt;
        var _y;
        if(c === 0 || c === 1){
            _alpha = 1;
            _txt = b + "Win: " + TEXT_CURRENCY + a.toFixed(2);
            if(c === 0){
                _y = 370;
            }else if(c === 1){
                _y = 330;
            }
        }

        if(c === 2){
            _alpha = 0;
        }
        
        _oPopupWinText.text = _txt;
        _oPopupWinText.alpha = _alpha;
        _oPopupWinText.y = _y;
    };

    this.resetPopupWin = function(){
        _oPopupWinText.text = " ";
        _oPopupWinText.alpha = 0;
    };

    this.Init();
}