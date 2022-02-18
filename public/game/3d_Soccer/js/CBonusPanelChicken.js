function CBonusPanelChicken(){
    //x 225 325 1180 1280
	//y 55 345

    var _oWinText;
    var _oContainer;
	var _iPrizeToShow;
	var _iCount;
	var _iNumberCount;
	
	var _oTextTime;
	var _oFreeSpinPanel;
    var _oWinPanel;
	var _listResult;
    var countNumberAfterCommar;
	
    var _bInitGame;
    var _iTimeIdle;
    var _iTimeWin;
    var _iCurAlpha;
    var _iGameState;
    var _oStaticBall;
    var _oButUpLeft;
    var _oButCenterLeft;
    var _oButDownLeft;
    var _oButUpRight;
    var _oButCenterRight;
    var _oButDownRight;
    var _oBall;
    var _oGoalKeeper;
    var _oPlayerKick;

    var _iEndBallX;
    var _iEndBallY;
    var _oResultPanel;
    var _iwinResult

    var _isLeft;
    this._init = function(){        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _iTimeIdle = 0;
        _iTimeWin = 0;
        _iCurAlpha = 0;
        _iGameState = -1;
        
        _oContainer.removeAllChildren();
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_bonus'));
        _oContainer.addChild(oBg);
        
        
        var oSprite = s_oSpriteLibrary.getSprite("ball_shadow")
        _oStaticBall = createBitmap(oSprite);
        _oStaticBall.x = CANVAS_WIDTH/2 - 100;
        _oStaticBall.y = CANVAS_HEIGHT - 260;
        _oContainer.addChild(_oStaticBall);
        
        //x 225 325 1180 1280
		//y 55 345

        //x 425 495 565 1080 1010 940
        //y 155 235 315
	
        var oSpriteBall = s_oSpriteLibrary.getSprite("but_goal");
        _oButUpLeft = new CGfxButton(425,155,oSpriteBall,_oContainer);
        _oButUpLeft.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_1);
        
        _oButCenterLeft = new CGfxButton(495,235,oSpriteBall,_oContainer);
        _oButCenterLeft.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_2);
        
        _oButDownLeft = new CGfxButton(565,315,oSpriteBall,_oContainer);
        _oButDownLeft.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_3);
        
        _oButUpRight = new CGfxButton(1080,155,oSpriteBall,_oContainer);
        _oButUpRight.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_4);
        
        _oButCenterRight = new CGfxButton(1010,235,oSpriteBall,_oContainer);
        _oButCenterRight.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_5);
        
        _oButDownRight = new CGfxButton(940,315,oSpriteBall,_oContainer);
        _oButDownRight.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_6);
        
        _oBall = new CBonusBall(CANVAS_WIDTH/2,538,_oContainer);
        _oGoalKeeper = new CBonusGoalkeeper(_oContainer);
        _oPlayerKick = new CBonusPlayer(646,0,_oContainer);
		
		this.InitCountKick();
        _bInitGame = false;
        //_oContainer.off("click",function(){});
        _oContainer.visible = false;
        this._enableAllButtons();

        
    };
	
	this.InitCountKick = function(){
		_oFreeSpinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('panel_bonus'));
        _oFreeSpinPanel.x = 1030;
        _oFreeSpinPanel.y = 15;
        _oFreeSpinPanel.visible = true;
        _oContainer.addChild(_oFreeSpinPanel);

        _oWinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('panel_bonus'));
        _oWinPanel.x = CANVAS_WIDTH/2 - 72;
        _oWinPanel.y = 15;
        _oWinPanel.visible = true;
        _oContainer.addChild(_oWinPanel);
		
		_oTextTime = new createjs.Text("", "28px " + FONT_BOLD, "#ffff00");
        _oTextTime.x = 1100;
        _oTextTime.y = 44;
        _oTextTime.textAlign = "center";
        _oTextTime.textBaseline = "alphabetic";
        _oContainer.addChild(_oTextTime);

        _oWinText = new createjs.Text("X 300$","40px "+FONT_BOLD, "#ffff00");
        _oWinText.alpha = 0;
        _oWinText.textAlign = "center";
        _oWinText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oWinText.x = CANVAS_WIDTH/2;
        _oWinText.y =63;
        _oWinText.textBaseline = "alphabetic";
        _oContainer.addChild(_oWinText);
	};
    
    this.hide = function(){
        _bInitGame = false;
        //_oContainer.off("click",function(){});
        _oContainer.visible = false;
        
        _oResultPanel.unload();
        this._enableAllButtons();
    };
	
	this.show = function(iNumChicken,iCurBet,iPrize,iCount){
        //_oContainer.on("click",function(){});
        _oContainer.visible = true;
        console.log("show");
        _bInitGame = true;
		_iPrizeToShow = iPrize;
        _iCurBet = iCurBet;
        _oWinText.alpha = 1;
        _iwinResult = 0;
		_iCount = iCount - 2;
		_iNumberCount = 0;
        _isLeft = false;
        _oStaticBall.visible = true;
        _oGoalKeeper.show();
        _iGameState = STATE_BONUS_IDLE;
       
		this.refreshFreeTime(_iCount);
		this.GenerateResult(_iCount);
        this.showWinText(parseFloat(0));
    };

    this.showWinText = function(value){
        _iwinResult += value;
        _oWinText.text = "$"+ _iwinResult.toFixed(2);
    };
	
	this.GenerateResult = function(countBox){
        var mainResult = WHEEL_SETTINGS[_iPrizeToShow];
        console.log("countBox: " + countBox);
        console.log("mainResult: " + mainResult);
        var string = mainResult.toString();
        countNumberAfterCommar = 0;

        for(var i=0;i<string.length;i++){
            if(string[i] === "."){
                countNumberAfterCommar = string.length - 1 - i;
            }
        }

        do{
            _listResult = new Array();
            var subResult = 0;
            for(var i=0;i<countBox;i++){
                var result = (Math.random() * (mainResult - 0) + 0).toFixed(countNumberAfterCommar);
                if(parseFloat(subResult) === parseFloat(mainResult) && i !== 0){
                    result = 0;
                }
                subResult += parseFloat(result);
                _listResult.push(result);
            }
        }while(parseFloat(subResult) !== parseFloat(mainResult));
        if(!this.CheckListInvalid(_listResult)){
            this.GenerateResult(countBox);
            return;
        }
        this.shuffleArray(_listResult);
		this.ShowContainer();
        console.log("_listResult " + _listResult);
    };
	
	this.CheckListInvalid = function(list){
        var isInvalid = true;
        var count = 0;
        for(var i=0; i<list.length;i++){
            if(list[i] === 0){
                count++;
            } 
        }
        if(count > 1){
            isInvalid = false;
        }
        return isInvalid;
    };
	
	this.shuffleArray = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
	
	this.ShowContainer = function(){
		_oContainer.visible = true;
        createjs.Tween.get(_oContainer).to({alpha:1}, 1000); 
		setVolume("BGMusic",0);
        //s_MusicBonus = playSound("BonusBGMusic",1,true);		
	};
	
	this.refreshFreeTime = function(_iCountBox){
        var _text = " ";
        if(_iCountBox <= 1){
            _text = _iCountBox + "\n\nBALL";
        }else{
            _text = _iCountBox + "\n\nBALLS";
        }
        _oTextTime.text = _text;
    };

    this._enableAllButtons = function(){
        _oButCenterLeft.setVisible(true);
        _oButCenterRight.setVisible(true);
        _oButDownLeft.setVisible(true);
        _oButDownRight.setVisible(true);
        _oButUpLeft.setVisible(true);
        _oButUpRight.setVisible(true);
    };
    
    this._disableAllButtons = function(){
        _oButCenterLeft.setVisible(false);
        _oButCenterRight.setVisible(false);
        _oButDownLeft.setVisible(false);
        _oButDownRight.setVisible(false);
        _oButUpLeft.setVisible(false);
        _oButUpRight.setVisible(false);
    };

    this._onShot = function(szType){
        s_oBonusPanel._disableAllButtons();
        
        switch(szType){
            case BONUS_BUTTON_1:{
                    _iEndBallX = _oButUpLeft.getX();
                    _iEndBallY = _oButUpLeft.getY();
                    _isLeft = true;
                    break;
            }
            case BONUS_BUTTON_2:{
                    _iEndBallX = _oButCenterLeft.getX();
                    _iEndBallY = _oButCenterLeft.getY();
                    _isLeft = true;
                    break;
            }
            case BONUS_BUTTON_3:{
                    _iEndBallX = _oButDownLeft.getX();
                    _iEndBallY = _oButDownLeft.getY();
                    _isLeft = true;
                    break;
            }
            case BONUS_BUTTON_4:{
                    _iEndBallX = _oButUpRight.getX();
                    _iEndBallY = _oButUpRight.getY();
                    _isLeft = false;
                    break;
            }
            case BONUS_BUTTON_5:{
                    _iEndBallX = _oButCenterRight.getX();
                    _iEndBallY = _oButCenterRight.getY();
                    _isLeft = false;
                    break;
            }
            case BONUS_BUTTON_6:{
                    _iEndBallX = _oButDownRight.getX();
                    _iEndBallY = _oButDownRight.getY();
                    _isLeft = false;
                    break;
            }
        }
        
        _iGameState = STATE_BONUS_KICK;
        _oPlayerKick.show();

        
    };
    
    this.kick = function(){
        //x 225 325 1180 1280
		//y 55 345
        playSound("kick",1,false);
        _oStaticBall.visible = false;
        var subResult = _listResult[_iNumberCount];
        if(subResult === 0){
            if(_isLeft){
                _iEndBallX = this.getRndInteger(275,345);
            }else{
                _iEndBallX = this.getRndInteger(1160,1220);
            }   
            _iEndBallY = this.getRndInteger(55,345);
        }
        _oBall.show(_iEndBallX,_iEndBallY);
        _oGoalKeeper.dive(Math.round(Math.random() + 1));
    };

    this.getRndInteger = function(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    };

    this.ballArrived = function(){
        
        var mainResult = WHEEL_SETTINGS[_iPrizeToShow];
        var subResult = _listResult[_iNumberCount];
        _iGameState = STATE_BONUS_WIN;
        new CScoreText(subResult,_iEndBallX,_iEndBallY);
        this.showWinText(parseFloat(subResult));
        _iCount--;
        _iNumberCount++;
        this.refreshFreeTime(_iCount);
        if(_iCount === 0){
            setTimeout(function(){_oResultPanel = new CBonusResultPanel(mainResult,_oContainer)},2000);
        }else{
            setTimeout(() => {
                _oStaticBall.visible = true;
                _oGoalKeeper.show();
                _iGameState = STATE_BONUS_IDLE;
                this._enableAllButtons();
            }, 1000);
        }
    };
    
    
    this.endBonus = function(){
        
    };

    this.unload = function(){
        this.hide();
        s_oGame.exitFromBonus();
    };
    

    this.update = function(){
        if(_bInitGame){
            switch(_iGameState) {
                case STATE_BONUS_IDLE:{
                    _oGoalKeeper.update();
                    break;
                } 
                case STATE_BONUS_KICK: {
                    _oGoalKeeper.update();
                    _oPlayerKick.update();
                    _oBall.update();
                    break;              
                }   
    
            }
        }
            
    };
    
    this._init();
    s_oBonusPanel = this;
}
var s_oBonusPanel = null;