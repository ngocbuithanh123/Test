function CBonusPanelChicken(){
    var _bChickenClicked;
    var _iBonusMoney;
    var _iCurBet;
    var _aChickens;
    var _aBonusValue;
    var _aEggSprites;
    var _aEggPrizes;
	
    var _oEgg1;
	var _oEgg2;
	var _oEgg3;
	
	var _TextResult1;
	var _TextResult2;
	var _TextResult3;
	
	var _TextBlackResult1;
	var _TextBlackResult2;
	var _TextBlackResult3;

    var _oWinText;
    var _oContainer;
	var _iPrizeToShow;
	var _iCount;
	var _iNumberCount;
	
	var _iChoosedList;
	var _oTextTime;
	var _oFreeSpinPanel;
	var _listResult;
    var countNumberAfterCommar;
	
	
    
    this._init = function(){        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bonus_bg'));
        _oContainer.alpha = 0;
        _oContainer.visible= false;
        _oContainer.addChild(oBg);
        
        var oData = {   // image to use
                        framerate: 3,
                        images: [s_oSpriteLibrary.getSprite('chicken')], 
                        // width, height & registration point of each sprite
                        frames: {width: CHICKEN_WIDTH, height: CHICKEN_HEIGHT,regX: CHICKEN_WIDTH/2, regY:CHICKEN_HEIGHT/2}, 
                        animations: {  idle: [0, 5,"idle"],lay_egg:[6,9,"lay_egg"],idle_rand_0:[1,5,"idle"],
                        idle_rand_1:[2,5,"idle"],idle_rand_2:[3,5,"idle"],idle_rand_3:[4,5,"idle"],right:[3],left:[4]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

		_iChoosedList = new Array();
        _aChickens = new Array();
        
        var iXPos = 420;
        var iYPos = 286;
        for(var i=0;i<5;i++){
            var oChicken = createSprite(oSpriteSheet, "idle",CHICKEN_WIDTH/2,CHICKEN_HEIGHT/2,CHICKEN_WIDTH,CHICKEN_HEIGHT);
            oChicken.on("click", this._onChickenReleased, this,false,i);
            oChicken.x = iXPos;
            oChicken.y = iYPos;
            oChicken.stop();
            oChicken.visible = false;
            
            _oContainer.addChild(oChicken);

            iXPos += 164;
            
            _aChickens[i] = oChicken;
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('egg');
        oData = {   // image to use
                        framerate: 10,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: Math.floor(oSprite.width/NUM_PRIZES), height: oSprite.height,regX:Math.floor(oSprite.width/NUM_PRIZES)/2,regY:oSprite.height/2}, 
                        animations: {  egg_0: [0],egg_1:[1],egg_2:[2]}
        };

        oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oEgg1 = createSprite(oSpriteSheet, "egg_0",Math.floor(oSprite.width/NUM_PRIZES)/2,oSprite.height/2,Math.floor(oSprite.width/NUM_PRIZES),oSprite.height);
        _oContainer.addChild(_oEgg1);
		
		_oEgg2 = createSprite(oSpriteSheet, "egg_1",Math.floor(oSprite.width/NUM_PRIZES)/2,oSprite.height/2,Math.floor(oSprite.width/NUM_PRIZES),oSprite.height);
        _oContainer.addChild(_oEgg2);
		
		_oEgg3 = createSprite(oSpriteSheet, "egg_2",Math.floor(oSprite.width/NUM_PRIZES)/2,oSprite.height/2,Math.floor(oSprite.width/NUM_PRIZES),oSprite.height);
        _oContainer.addChild(_oEgg3);
        
        var _oMaskEgg = new createjs.Shape();
        _oMaskEgg.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(110, 390, 1200,160);
        _oContainer.addChild(_oMaskEgg);
        
        _oEgg1.mask = _oMaskEgg;
		_oEgg2.mask = _oMaskEgg;
		_oEgg3.mask = _oMaskEgg;
        
        _oWinText = new createjs.Text("X 300$","80px "+FONT_BOLD, "#ffff00");
        _oWinText.alpha = 0;
        _oWinText.textAlign = "center";
        _oWinText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oWinText.x = CANVAS_WIDTH/2;
        _oWinText.y = 150;
        _oWinText.textBaseline = "alphabetic";
        _oContainer.addChild(_oWinText);
		
		this.InitCountEgg();
		this.InitTextResults(_oMaskEgg);
    };
	
	this.InitCountEgg = function(){
		_oFreeSpinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('freespin_panel'));
        _oFreeSpinPanel.x = 1030;
        _oFreeSpinPanel.y = 5;
        _oFreeSpinPanel.visible = true;
        _oContainer.addChild(_oFreeSpinPanel);
		
		_oTextTime = new createjs.Text("", "23px " + FONT_BOLD, "#ffff00");
        _oTextTime.x = 1100;
        _oTextTime.y = 34;
        _oTextTime.textAlign = "center";
        _oTextTime.textBaseline = "alphabetic";
        _oContainer.addChild(_oTextTime);
	};
	
	this.InitTextResults = function(_oMaskEgg){
		
		_TextBlackResult1 = new createjs.Text("", "25px " + FONT_BOLD, "#f4e1c6");
        _TextBlackResult1.x = 118;
        _TextBlackResult1.y = 308;
        _TextBlackResult1.textAlign = "center";
        _TextBlackResult1.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult1);
		
		_TextBlackResult2 = new createjs.Text("", "25px " + FONT_BOLD, "#f4e1c6");
        _TextBlackResult2.x = 118;
        _TextBlackResult2.y = 308;
        _TextBlackResult2.textAlign = "center";
        _TextBlackResult2.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult2);
		
		_TextBlackResult3 = new createjs.Text("", "25px " + FONT_BOLD, "#f4e1c6");
        _TextBlackResult3.x = 118;
        _TextBlackResult3.y = 308;
        _TextBlackResult3.textAlign = "center";
        _TextBlackResult3.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult3);
		
		_TextResult1 = new createjs.Text("", "25px " + FONT_BOLD, "#ff9900");
        _TextResult1.x = 118;
        _TextResult1.y = 308;
        _TextResult1.textAlign = "center";
        _TextResult1.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult1);
		
		_TextResult2 = new createjs.Text("", "25px " + FONT_BOLD, "#ff9900");
        _TextResult2.x = 118;
        _TextResult2.y = 308;
        _TextResult2.textAlign = "center";
        _TextResult2.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult2);
		
		_TextResult3 = new createjs.Text("", "25px " + FONT_BOLD, "#ff9900");
        _TextResult3.x = 118;
        _TextResult3.y = 308;
        _TextResult3.textAlign = "center";
        _TextResult3.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult3);
		
		_TextResult1.mask = _oMaskEgg;
		_TextResult2.mask = _oMaskEgg;
		_TextResult3.mask = _oMaskEgg;
		
		_TextBlackResult1.mask = _oMaskEgg;
		_TextBlackResult2.mask = _oMaskEgg;
		_TextBlackResult3.mask = _oMaskEgg;
	};
    
    this.unload = function(){
        for(var i=0;i<5;i++){
            _aChickens[i].off("click", this._onChickenReleased);
        }   
    };
	
	this.show = function(iNumChicken,iCurBet,iPrize,iCount){
		_iChoosedList = new Array();
		_iPrizeToShow = iPrize;
        _iCurBet = iCurBet;
        _bChickenClicked = false;
        _oWinText.alpha = 0;
		_iCount = iCount - 2;
		_iNumberCount = 0;
        
        switch(iNumChicken){
            case 3:{
                    _aBonusValue = BONUS_PRIZE[0];
                    break;
            }
            case 4:{
                    _aBonusValue = BONUS_PRIZE[1];
                    break;
            }
            case 5:{
                    _aBonusValue = BONUS_PRIZE[2];
                    break;
            }
            default:{
                    _aBonusValue = BONUS_PRIZE[0];
            }
        }
        
        _oEgg1.x = 118;
        _oEgg1.y = 308;
        _oEgg1.rotation = 0;
        _oEgg1.gotoAndStop("egg_0");
		
		_oEgg2.x = 118;
        _oEgg2.y = 308;
        _oEgg2.rotation = 0;
        _oEgg2.gotoAndStop("egg_1");
		
		_oEgg3.x = 118;
        _oEgg3.y = 308;
        _oEgg3.rotation = 0;
        _oEgg3.gotoAndStop("egg_2");
		
		_TextBlackResult1.x = 118;
		_TextBlackResult1.y = 308;
		_TextResult1.x = 118;
		_TextResult1.y = 308;
		
		_TextBlackResult2.x = 118;
		_TextBlackResult2.y = 308;
		_TextResult2.x = 118;
		_TextResult2.y = 308;
		
		_TextBlackResult3.x = 118;
		_TextBlackResult3.y = 308;
		_TextResult3.x = 118;
		_TextResult3.y = 308;
        
        for(var i=0;i<iNumChicken;i++){
            var iRand = Math.floor(Math.random()* 4);
            _aChickens[i].framerate = 3;
            _aChickens[i].visible = true;
            _aChickens[i].gotoAndPlay("idle_rand_"+iRand);
        }
       
		this.refreshFreeTime(_iCount);
		this.GenerateResult(_iCount);
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
        s_MusicBonus = playSound("BonusBGMusic",1,true);		
	};
	
	this.refreshFreeTime = function(_iCountBox){
        var _text = " ";
        if(_iCountBox <= 1){
            _text = _iCountBox + "\nEGG";
        }else{
            _text = _iCountBox + "\nEGGS";
        }
        _oTextTime.text = _text;
    };
    
    this._onChickenReleased = function(event,oData){
        if(_bChickenClicked){
            return;
        }
		
        var iIndex = oData;
		
		if(this.checkListChoosed(_iChoosedList,iIndex)){
			return;
		}
		
		var iRandEgg = Math.floor(Math.random()* s_aEggOccurence.length);
        
        this.playChickenLayAnim(iIndex,_iNumberCount);
		
		_iNumberCount++;
		this.refreshFreeTime(_iCount - _iNumberCount);
        if(_iNumberCount === _iCount){
			_bChickenClicked = true;
		}else{
			_bChickenClicked = true;
			setTimeout(function(){_bChickenClicked = false;}, 3000);
		}
		
        playSound("choose_chicken",1,false);
    };
	
	this.checkListChoosed = function(iList,iIndex){
		for(var i=0; i<iList.length;i++){
			if(iList[i] === iIndex){
				return true;
			}
		}
		_iChoosedList.push(iIndex);
		return false;
	};
    
    this.playChickenLayAnim = function(iIndex,iRandEgg){
		
		if(iRandEgg === 0){
			this.playOneChicken(_oEgg1,iRandEgg);
		}else if(iRandEgg === 1){
			this.playOneChicken(_oEgg2,iRandEgg);
		}else if(iRandEgg === 2){
			this.playOneChicken(_oEgg3,iRandEgg);
		}
		
        for(var i=0;i<5;i++){
            if(i<iIndex){
                _aChickens[i].gotoAndStop("right");
            }else if(i === iIndex){
                _aChickens[iIndex].framerate = 10;
                _aChickens[iIndex].gotoAndPlay("lay_egg");
            }else{
                _aChickens[i].gotoAndStop("left");
            }
        }

        var oParent = this;
        setTimeout(function(){oParent.layEgg(iIndex, iRandEgg);}, 2500);
    };
	
	this.playOneChicken = function(Egg,iRandEgg){
		Egg.gotoAndStop("egg_"+iRandEgg);
	};
    
    this.layEgg = function(iIndex, iRandEgg){
        _aChickens[iIndex].gotoAndStop(5);
        if(iRandEgg === 0){
			this.layOneEgg(_oEgg1,iIndex);
			this.layOneText(_TextResult1,_TextBlackResult1,_listResult[iRandEgg],iIndex);
		}else if(iRandEgg === 1){
			this.layOneEgg(_oEgg2,iIndex);
			this.layOneText(_TextResult2,_TextBlackResult2,_listResult[iRandEgg],iIndex);
		}else if(iRandEgg === 2){
			this.layOneEgg(_oEgg3,iIndex);
			this.layOneText(_TextResult3,_TextBlackResult3,_listResult[iRandEgg],iIndex);
		}
        
        var oParent = this;
        
		if(_iNumberCount === _iCount){
			oParent.endBonus();
		}		
        playSound("reveal_egg",1,false);  
    };
	
	this.layOneEgg = function(Egg,Index){
		Egg.x = _aChickens[Index].x ;
		createjs.Tween.get(Egg).to({y:460}, 300).call(function(){});
	};
	
	this.layOneText = function(Text,TextBlack,Result,Index){
		Text.text = "$" + Result;
		Text.x = _aChickens[Index].x ;
		createjs.Tween.get(Text).to({y:460}, 300).call(function(){}); 
		
		TextBlack.text = "$" + Result;
		TextBlack.x = _aChickens[Index].x - 2 ;
		createjs.Tween.get(TextBlack).to({y:462}, 300).call(function(){}); 
	};
    
    this.endBonus = function(){
        //SHOW PRIZE WON
		var result = WHEEL_SETTINGS[_iPrizeToShow];
        _oWinText.text = "$" + result;
        createjs.Tween.get(_oWinText).to({alpha:1}, 500);
        
        //ROTATE THE EGG
        //createjs.Tween.get(_oEgg1).to({rotation:110}, 500);  
        
        setTimeout(function(){_oContainer.alpha = 0;
                                _oContainer.visible= false;
				for(var i=0;i<_aChickens.length;i++){
                                    _aChickens[i].visible = false;
                                }
                                
								s_MusicBonus.stop();		  
                                //s_oGame.endBonus(_iBonusMoney)
								s_oGame.exitFromBonus();
								},4000);
    };
    
    this._init();
}