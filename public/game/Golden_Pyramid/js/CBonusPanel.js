function CBonusPanel(){
    var _bInitGame;
    var _iCurAnim;
    var _iTimeIdle;
    var _iTimeWin;
    var _iGameState;
    var _iPrizeToShow;
    var _iCurAlpha;
    var _oWheel;
    var _oLeds;
    var _oSpinBut;
	var _oBackBut;
    var _oTextHighLight;
    var _oContainer;
	var _oPoint;
	var _oPopupBonus;

    
    this._init = function(){
        _iTimeIdle = 0;
        _iTimeWin = 0;
        _iCurAlpha = 0;
        _bInitGame = false;
        _iGameState = STATE_BONUS_IDLE;
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
		
        s_oAttachSection.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_bonus'));
        _oContainer.addChild(oBg);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_spin_bonus');
        _oSpinBut = new CTextButton(658 + (oSprite.width / 2), 600, -1, -5 ,oSprite,TEXT_SPIN," ",FONT_ZDYK,"#ffffff",45,_oContainer);  
        _oSpinBut.addEventListener(ON_MOUSE_UP, this._onSpin, this);
		
		var oSprite = s_oSpriteLibrary.getSprite('but_spin_bonus');
        _oBackBut = new CTextButton(658 + (oSprite.width / 2), 600, -1, -5 ,oSprite,"BACK"," ",FONT_ZDYK,"#ffffff",43,_oContainer);  
        _oBackBut.addEventListener(ON_MOUSE_UP, this.BackToMainGame, this);
		
		
        _oWheel = new CWheelBonus(pCenterWheel.x, pCenterWheel.y,_oContainer);
		
		_oLeds = new CLedsBonus(pCenterWheel.x, pCenterWheel.y,_oContainer);
        _iCurAnim = _oLeds.getState();
		
		_oPoint = new createjs.Bitmap(s_oSpriteLibrary.getSprite('point'));
        _oPoint.x = 590;
        _oPoint.y = 89;
        _oContainer.addChild(_oPoint);
		
        _oPopupBonus = new createjs.Bitmap(s_oSpriteLibrary.getSprite('popupbonus'));
        _oPopupBonus.visible = false;
		_oContainer.addChild(_oPopupBonus);
		
		_oTextHighLight = new createjs.Text("X" +"0","80px "+FONT_BOLD, "#4f2930");
        _oTextHighLight.x = 710;
        _oTextHighLight.y = 350;
        _oTextHighLight.textAlign = "center";
        _oTextHighLight.textBaseline = "alphabetic";
        _oTextHighLight.lineWidth = 700;
        _oTextHighLight.alpha = _iCurAlpha;
        _oContainer.addChild(_oTextHighLight);
		
		_oCurBet = 0;
    };
    
    this.show = function(iPrize, iBet){
        _oSpinBut.enable();
        _oTextHighLight.text = "";
        _oTextHighLight.alpha = 1;
        _iPrizeToShow = iPrize;
        _oContainer.visible = true;
        _bInitGame = true;
		_oCurBet = iBet;
		_oBackBut.setVisible(false);
    };
    
    this._onSpin = function(){
        playSound("Spin",1,0);
        _oSpinBut.disable();
        _iGameState = STATE_BONUS_SPIN;
        _iTimeWin = 0;
                
        //CALCULATE ROTATION
        var iNumSpinFake = MIN_FAKE_SPIN + Math.floor(Math.random()*3);
        var iOffsetInterval = SEGMENT_ROT - 3;
        var iOffsetSpin = -iOffsetInterval/2 + Math.random()*iOffsetInterval;
        var _iCurWheelDegree = _oWheel.getDegree();
        
        var iTrueRotation = (360 - _iCurWheelDegree + _iPrizeToShow * SEGMENT_ROT + iOffsetSpin)%360; //Define how much rotation, to reach the selected prize.       
        
        var iRotValue = 360*iNumSpinFake + iTrueRotation + 90;
        var iTimeMult = iNumSpinFake;
        //SPIN
        _oWheel.spin(iRotValue, iTimeMult);
    };
    
    this._animLedIdle = function(){
        _iTimeIdle += s_iTimeElaps;
        
        if(_iTimeIdle > TIME_ANIM_IDLE){
            _iTimeIdle=0;
            var iRandAnim = Math.floor(Math.random()*_oLeds.getNumAnim());
    
            while(iRandAnim === _iCurAnim){
                iRandAnim = Math.floor(Math.random()*_oLeds.getNumAnim());
            }    
            _oLeds.changeAnim(iRandAnim);

            _iCurAnim = iRandAnim;
        }
    };    
    
    this._animLedSpin = function(){
        _oLeds.changeAnim(LED_SPIN);
        _iGameState =-1;
    };
    
    this._animLedWin = function(){
        if(_iTimeWin === 0){
            var iRandomWinAnim = 4 + Math.round(Math.random())
            _oLeds.changeAnim(iRandomWinAnim);
            _oLeds.setWinColor(this.getCurColor());            
        } else if(_iTimeWin > TIME_ANIM_WIN) {
            _iTimeIdle = TIME_ANIM_IDLE; 
            _iGameState = STATE_BONUS_IDLE;
            s_oBonusPanel.unload()
            _iTimeWin =0;
        }
        _iTimeWin += s_iTimeElaps;
        
    };
    
    this._animLedLose = function(){
        if(_iTimeWin === 0){            
            _oLeds.changeAnim(6);
            _oLeds.setWinColor(this.getCurColor());            
        } else if(_iTimeWin > TIME_ANIM_LOSE) {
            _iTimeIdle = TIME_ANIM_IDLE; 
            _iGameState = STATE_BONUS_IDLE;
            s_oBonusPanel.unload()
            _iTimeWin =0;
        }
        _iTimeWin += s_iTimeElaps;
    };
    
    this.getCurColor = function(){
        return _oWheel.getColor();
    };
    
    this.wheelArrived = function(){	
		var result = WHEEL_SETTINGS[_iPrizeToShow];
        _oTextHighLight.text = "WIN: " +TEXT_CURRENCY + result;
		_oPopupBonus.visible = true;
        
	this._animWinText();

        if(WHEEL_SETTINGS[_iPrizeToShow].prize <= 0){
            _iGameState = STATE_BONUS_LOSE;

            playSound("game_over_bonus",1,0);
        } else {
            _iGameState = STATE_BONUS_WIN;

            playSound("win_bonus",1,0);
        }
    };
    
    this._animWinText = function(){
        if(_iCurAlpha === 1){
            _iCurAlpha = 0;
            createjs.Tween.get(_oTextHighLight).to({alpha:_iCurAlpha }, 150,createjs.Ease.cubicOut).call(function(){s_oBonusPanel._animWinText();});
        }else{
            _iCurAlpha = 1;
            createjs.Tween.get(_oTextHighLight).to({alpha:_iCurAlpha }, 150,createjs.Ease.cubicOut).call(function(){s_oBonusPanel._animWinText();});
        }
    };
    
    this.unload = function(){
        _oBackBut.setVisible(true);
    };
	
	this.BackToMainGame = function(){
		_bInitGame = false;
        _oContainer.visible = false;
		_oPopupBonus.visible = false;
        createjs.Tween.removeTweens(_oTextHighLight);
		s_oGame.exitFromBonus();
	};
    
    this.update = function(){
	if(_bInitGame){
            _oLeds.update();
            switch(_iGameState) {
                case STATE_BONUS_IDLE:{
                        this._animLedIdle();
                        break;
                } case STATE_BONUS_SPIN: {
                        this._animLedSpin();
                        break;              

                } case STATE_BONUS_WIN: {
                        this._animLedWin();
                        break;                             
                } case STATE_BONUS_LOSE: {
                        this._animLedLose();
                        break;                             
                }    

            }
        }
        
    };
    
    s_oBonusPanel = this;
    
    this._init();
}
var _oCurBet;
var pCenterWheel = {x: 751, y: 280};
var s_oBonusPanel = null;