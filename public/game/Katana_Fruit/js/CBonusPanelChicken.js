function CBonusPanelChicken(){
	var _bUpdate;
    var _bFruitClicked;
    var _iCurBet;
    var _aBonusValue;
	
    var _oWinText;
    var _oContainer;
	var _iPrizeToShow;
	var _iCount;
	var _iNumberCount;
	
	var _iChoosedList;
	var _oTextTime;
	
	var _listResult;
    var countNumberAfterCommar;
	
	var _oTitleText;
	var _oCharacter;
	var _oAmountFruitPanel;
	var _oAmountWinPanel;
	var _oTextWin;
	var _oContainerButtons = null;
	var _oBlock;
	var _oCurFruit;
	var _aButtons = new Array();   
    var _aShadows = new Array();
	var _aPosXFruits;
	var _CutIndex;
	var _isEnd;
	var _subResult;
	var _oBg;
	
	
    
    this._init = function(){
		_bUpdate = false;       
		_isEnd = false;		
		_subResult = 0 ;
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bonus_bg'));
        _oContainer.alpha = 0;
        _oContainer.visible= false;
        _oContainer.addChild(_oBg);

		_oContainerButtons = new createjs.Container();
        _oContainer.addChild(_oContainerButtons);
		
		_aPosXFruits = [CANVAS_WIDTH/2-300,CANVAS_WIDTH/2-150,CANVAS_WIDTH/2,CANVAS_WIDTH/2+150, CANVAS_WIDTH/2+300];
		
		_oTitleText = new createjs.Text("SELECT A FRUIT","50px "+FONT_REGULAR, "#fce0ab");
        _oTitleText.alpha = 1;
        _oTitleText.textAlign = "center";
        _oTitleText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oTitleText.x = CANVAS_WIDTH/2;
        _oTitleText.y = 180;
        _oTitleText.textBaseline = "alphabetic";
        _oContainer.addChild(_oTitleText);
		
		_oCharacter = new CBonusCharacter(355,CANVAS_HEIGHT-95,_oContainer);
		
		_iChoosedList = new Array();
       
        _oWinText = new createjs.Text("X 300$","80px "+FONT_BOLD, "#ffff00");
        _oWinText.alpha = 0;
        _oWinText.textAlign = "center";
        _oWinText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oWinText.x = CANVAS_WIDTH/2;
        _oWinText.y = 150;
        _oWinText.textBaseline = "alphabetic";
        _oContainer.addChild(_oWinText);
		
		_oBlock = new createjs.Shape();
        _oBlock.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oListenerBlock = _oBlock.on("click",function(){});
        _oContainer.addChild(_oBlock);
		
		this.InitCountFruit();
    };
	
	this.InitCountFruit = function(){
		_oAmountWinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('amount_bonus_win'));
        _oAmountWinPanel.x = CANVAS_WIDTH/2 - 63;
        _oAmountWinPanel.y = 5;
        _oAmountWinPanel.visible = true;
        _oContainer.addChild(_oAmountWinPanel);
		
		_oTextWin = new createjs.Text("$0.00", "25px " + FONT_REGULAR, "#fce0ab");
        _oTextWin.x = CANVAS_WIDTH/2;
        _oTextWin.y = 37;
        _oTextWin.textAlign = "center";
        _oTextWin.textBaseline = "alphabetic";
        _oContainer.addChild(_oTextWin);
		
		_oAmountFruitPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('amount_bonus_win'));
        _oAmountFruitPanel.x = 1030;
        _oAmountFruitPanel.y = 5;
        _oAmountFruitPanel.visible = true;
        _oContainer.addChild(_oAmountFruitPanel);
		
		_oTextTime = new createjs.Text("", "23px " + FONT_REGULAR, "#fce0ab");
        _oTextTime.x = 1093;
        _oTextTime.y = 36;
        _oTextTime.textAlign = "center";
        _oTextTime.textBaseline = "alphabetic";
        _oContainer.addChild(_oTextTime);
	};
    
	
	this.show = function(iNumChicken,iCurBet,iPrize,iCount){
		
		_bFruitClicked = false;
		_bUpdate = true;
		_isEnd = false;
		_iChoosedList = new Array();
		_iPrizeToShow = iPrize;
        _iCurBet = iCurBet;
        _oWinText.alpha = 0;
		_iCount = iCount - 2;
		_iNumberCount = 0;   
		_subResult = 0;			
		this.refreshFruitTime(_iCount);
		this.GenerateResult(_iCount);
		this._initFruitButtons();
		_oBg.on("click",function(){});
		createjs.Tween.get(_oTitleText).to({alpha:1}, 800);
		this.refreshAmount(0);
    };
	
	this._initFruitButtons = function(){
        _oCurFruit = null;

			_aButtons = new Array();   
            _aShadows = new Array();
            
            var oSpriteShadow = s_oSpriteLibrary.getSprite("shadow_fruit");
            
            var aFruits = shuffle([1,2,3,4,5,6,7])
            for(var i=0;i<5;i++){
                var iIndex = aFruits.pop();
                var oButton = new CBonusBut(i,_aPosXFruits[i],-70,iIndex,_oContainerButtons);
                oButton.pulseAnimation();
                oButton.addEventListener(ON_MOUSE_UP,this._onButtonRelease,this);

                _aButtons.push(oButton);
                
                
                var oShadow = createBitmap(oSpriteShadow);
                oShadow.regX = oSpriteShadow.width/2;
                oShadow.regY = oSpriteShadow.height/2;
                oShadow.x = _aPosXFruits[i];
                oShadow.y = 533;
                oShadow.alpha = 0.6;
                _oContainer.addChild(oShadow);
                createjs.Tween.get(oShadow,{loop:true}).to({alpha: 1}, 850, createjs.Ease.quadOut).to({alpha: 0.7}, 650, createjs.Ease.quadIn);
                
                _aShadows.push(oShadow);
            }

            this._showAllButtons();
    };
    
    this._showAllButtons = function(){
        _oBlock.visible = false;
        var iTime = 500;
        for(var i=0;i<_aButtons.length;i++){
            _aButtons[i].tweenDown(295,iTime);
            
            iTime += 200;
        }
    };
	
	this._onButtonRelease = function(iIndex){
		if(_bFruitClicked){
			return;
		}
		_bFruitClicked = true;
		_CutIndex = iIndex;
        createjs.Tween.get(_oTitleText).to({alpha:0}, 800);
        
        //s_oBonusPanel._disableAllButtons();
        
        _oCurFruit = _aButtons[iIndex];
        
        if(_oCharacter.getCurX() === _aPosXFruits[iIndex] +100){
            _oCharacter.cutFruit();
        }else{
            _oCharacter.startMoving(_aPosXFruits[iIndex] + 100);
        }
    };
	
	this._onGetNextClicked = function(){
		if(_iNumberCount === _iCount && !_isEnd){
			_bFruitClicked = true;
			this.endBonus();
			_isEnd = true;
		}
		if(_isEnd){
			return;
		}
		_bFruitClicked = false;
		createjs.Tween.get(_oTitleText).to({alpha:1}, 800);
	};
	
	this.cutTheFruit = function(){
        _oCurFruit.playCutAnim();
        new CScoreText(_listResult[_iNumberCount],_oCurFruit.getX(),_oCurFruit.getY(),_oContainer);
		
        playSound("bonus_mult",1,false);
		this.refreshAmount(_listResult[_iNumberCount]);
		_iNumberCount++;
		this.refreshFruitTime(_iCount - _iNumberCount);
        createjs.Tween.removeTweens(_aShadows[_CutIndex]);
		createjs.Tween.get(_aShadows[_CutIndex]).to({alpha:0}, 500, createjs.Ease.backIn);
		_iChoosedList.push(_CutIndex);
        
    };
	
	
	this.GenerateResult = function(countBox){
        var mainResult = WHEEL_SETTINGS[_iPrizeToShow];
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
                var result = (Math.random() * (mainResult - 0) + 0).toFixed(countNumberAfterCommar + 1);
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
	};
	
	this.refreshFruitTime = function(_iCountBox){
        var _text = " ";
        if(_iCountBox <= 1){
            _text = _iCountBox + " FRUIT";
        }else{
            _text = _iCountBox + " FRUITS";
        }
        _oTextTime.text = _text;
    };
	
	this.refreshAmount = function(amount){
		var a = parseFloat(amount);
		_subResult += a;
        _oTextWin.text = "$" + _subResult.toFixed(3);
    };
    
    
    this.endBonus = function(){
        //SHOW PRIZE WON
		var result = WHEEL_SETTINGS[_iPrizeToShow];
		if(_iNumberCount === _iCount){
			for(var i=0;i<_aButtons.length;i++){
				_aButtons[i].tweenUp(-70,350);
				if(!this.isHaveShadowList(i, _iChoosedList)){
					console.log("endBonus :" , i);
					createjs.Tween.removeTweens(_aShadows[i]);
					createjs.Tween.get(_aShadows[i]).to({alpha:0}, 500, createjs.Ease.backIn);
				}
			}
		var _result = parseFloat(result).toFixed(3);	
		_oResultPanel = new CBonusResultPanel(_result,_oContainer); 
        playSound("bonus_end",1,false);	
		}	
    };
	
	this.isHaveShadowList = function(a, List){
		for(var i=0;i < List.length;i++){
			if(a === List[i]){
				console.log("TRUE :");
				return true;
			}
		}
		console.log("FALSE :");
		return false;
	};
	
	this.hide = function(){
        _bUpdate = false;
        
        _oBg.off("click",function(){});
        _oContainer.visible = false;

        this.reset();
        s_oGame.exitFromBonus();
    };
	
	this.reset = function(){
        _oResultPanel.unload();
        _oCharacter.reset();
    };
	
	this.update = function(){
	if(_bUpdate){
            if(_oCurFruit !== null){
                
                _oCurFruit.update();
            }
        }
    };
    _oBonusPanelChicken = this;
    this._init();
}