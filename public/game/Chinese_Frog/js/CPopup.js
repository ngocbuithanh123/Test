var _oPopup;
function CPopup(){
    var _oPCon;
	var _oSubContainer;
    var _oWinPopup;
    var _oBigWinPopup;
    var _oMegaWinPopup;
    var _oBonusPopup;
    var _oFreeSpinsPopup;
    var _iCurAlpha = 0;
    var _oPopupWinText;
	var _light;
	var _listMoneyAnim;
	var _curIndexMoneyAnim = 0;
	var _isAction = false;

    this.Init = function(){
        _oPCon = new createjs.Container();
        s_oAttachSection.addChild(_oPCon); 
		
		_oSubContainer = new createjs.Container();
		s_oAttachSection.addChild(_oSubContainer); 
		
		_oSubContainer2 = new createjs.Container();
		s_oAttachSection.addChild(_oSubContainer2); 
		
		_light = new createjs.Bitmap(s_oSpriteLibrary.getSprite('light'));
        _light.visible = false;
        _light.alpha = _iCurAlpha;
        _oPCon.addChild(_light);
		
		this.initMoneyAnim();
		
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
        _oSubContainer2.addChild(_oBonusPopup);

        _oFreeSpinsPopup = new createjs.Bitmap(s_oSpriteLibrary.getSprite('FreeSpinsPopup'));
        _oFreeSpinsPopup.visible = false;
        _oFreeSpinsPopup.alpha = _iCurAlpha;
        _oSubContainer2.addChild(_oFreeSpinsPopup); 
		
		
    };
	
	this.initMoneyAnim = function(){
		_listMoneyAnim = new Array();
        for(var t=0;t<61;t++){
            var _moneyAnim = new createjs.Bitmap(s_oSpriteLibrary.getSprite('moneyAnim'+t));
            _moneyAnim.visible = false;
			_moneyAnim.alpha = 1;
            _oPCon.addChild(_moneyAnim);
            _listMoneyAnim.push(_moneyAnim);
        }
	};

    this.showPopup = function(a){
        _oInterface.disableGuiButtons(false);
        _iCurAlpha = 0;
		_light.visible = true;
        _light.alpha = _iCurAlpha;
        if(a === 0){
            _oWinPopup.visible = true;
            _oWinPopup.alpha = _iCurAlpha;
        }else if(a === 1){
            _oBigWinPopup.visible = true;
            _oBigWinPopup.alpha = _iCurAlpha;
        }else if(a === 2){
            _oMegaWinPopup.visible = true;
            _oMegaWinPopup.alpha = _iCurAlpha;
        }else if(a === 3){
            _oBonusPopup.visible = true;
            _oBonusPopup.alpha = _iCurAlpha;
        }else if(a === 4){
            _oFreeSpinsPopup.visible = true;
            _oFreeSpinsPopup.alpha = _iCurAlpha;
        }
        _oPopupWinText.visible = true;
        _oPopupWinText.alpha = _iCurAlpha;
        _oPCon.visible = true;
		_oSubContainer2.visible = true;
		_oSubContainer.visible = true;
		_isAction = true;
        this._fadeInPopup(a);
        this.hidePopup();
    };

    this.hidePopup = function(){
        setTimeout(() => {
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
			_oSubContainer2.visible = false;
			_oSubContainer.visible = false;
			_oSubContainer.removeAllChildren();
			_isAction = false;
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
            playSound("FreeSpinPopupSound",1,0);
        }else if(a === 4){
            object = _oFreeSpinsPopup;
            playSound("FreeSpinPopupSound",1,0);
        }
        createjs.Tween.get(object).to({alpha:_iCurAlpha }, 1000,createjs.Ease.quintIn);
        createjs.Tween.get(_oPopupWinText).to({alpha:_iCurAlpha }, 1000,createjs.Ease.quintIn);
		createjs.Tween.get(_light).to({alpha:_iCurAlpha }, 000,createjs.Ease.quintIn);
    };

    this.showPopupText = function(a, b, c){
		
        var _alpha;
        var _txt;
        var _y;
		var isShow = false;
        if(c === 0 || c === 1){
            _alpha = 1;
            _txt = b + "Win: " + TEXT_CURRENCY + a.toFixed(2);
            if(c === 0){
                _y = 370;
            }else if(c === 1){
                _y = 330;
            }
			isShow = true;
        }

        if(c === 2){
            _alpha = 0;
			_txt = " ";
			isShow = false;
        }
        
        //_oPopupWinText.text = _txt;
		_oPopupWinText.text = " ";
        _oPopupWinText.alpha = _alpha;
        _oPopupWinText.y = _y;
		
		var _a = a.toFixed(2);
		setTimeout(() => {
			this.ShowNumber(_a,isShow);
		}, 0000); 
    };
	
	this.ChangePosition = function(){
		_oPCon.x = 100;
		_oSubContainer.x = 100;
	};
	
	this.ShowNumber = function(number, isShow){
		if(s_oGame.GetIsStartFreeSpin()){ return;}
		if(s_oGame.GetIsStartBonus()){ return;}
		//95 65
		//y = 200
		//3 x = 440
		//2 x = 490
		//1 x = 555
		console.log("ShowNumber");
		var listNum = new Array();
		var _alpha = 0;
		var _x = 0;
		var _xPlus = 0;
		if(number.length === 4){
			_x = 440;
		}else if(number.length === 3){
			_x = 490;
		}else if(number.length === 1){
			_x = 555;
		}
		var _oCurrency = new createjs.Bitmap(s_oSpriteLibrary.getSprite('currency'));
		_oCurrency.visible = isShow;
		_oCurrency.alpha = _alpha;
		_oCurrency.x = _x;
		_oCurrency.y = 200;
		_oSubContainer.addChild(_oCurrency);
		listNum.push(_oCurrency);
		for(var i=0; i<number.length;i++){
			var res = number.charAt(i);
			if(i === 0){
				_xPlus += 95;
				var _num0 = new createjs.Bitmap(s_oSpriteLibrary.getSprite('num' + res));
				_num0.visible = isShow;
				_num0.alpha = _alpha;
				_num0.x = _x + _xPlus;
				_num0.y = 200;
				_oSubContainer.addChild(_num0);
				listNum.push(_num0);
			}else{
				if(res === "."){
					_xPlus += 65;
					var nextNum = new createjs.Bitmap(s_oSpriteLibrary.getSprite('dotNum'));
					nextNum.visible = isShow;
					nextNum.alpha = _alpha;
					nextNum.x = _x + _xPlus;
					nextNum.y = 200;
					_oSubContainer.addChild(nextNum);
					listNum.push(nextNum);
				}else{
					var subRes = number.charAt(i - 1);
					if(subRes === "."){
						_xPlus += 65;
					}else{
						_xPlus += 95;
					}
					var nextNum = new createjs.Bitmap(s_oSpriteLibrary.getSprite('num' + res));
					nextNum.visible = isShow;
					nextNum.alpha = _alpha;
					nextNum.x = _x + _xPlus;
					nextNum.y = 200;
					_oSubContainer.addChild(nextNum);
					listNum.push(nextNum);
				}
			}
		}
		
		for(j=0; j< listNum.length; j++){
			createjs.Tween.get(listNum[j]).to({alpha:1 }, 1000,createjs.Ease.quintIn);
		}
	};

    this.resetPopupWin = function(){
        _oPopupWinText.text = " ";
        _oPopupWinText.alpha = 0;
    };
	
	this.ActionAnim = function(){
		for(var i=0; i< 61; i++){
			_listMoneyAnim[i].visible = false;
		}
		_listMoneyAnim[_curIndexMoneyAnim].visible = true;
		_curIndexMoneyAnim++;
		if(_curIndexMoneyAnim >= 61){
			_curIndexMoneyAnim = 0;
		}
	};
	
	this.update = function(){
		if(!_isAction){return;}
		this.ActionAnim();
	};

    this.Init();
}