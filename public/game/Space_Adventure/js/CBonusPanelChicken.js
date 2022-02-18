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
                        images: [s_oSpriteLibrary.getSprite('bonus_ufo')], 
                        // width, height & registration point of each sprite
                        frames: {width: UFO_WIDTH, height: UFO_HEIGHT,regX: UFO_WIDTH/2, regY:UFO_HEIGHT/2}, 
                        animations: {  idle: [0, 4,"idle"],lay_alien:[5,9,"stop_lay"],idle_rand_0:[1,4,"idle"],
                        idle_rand_1:[2,4,"idle"],idle_rand_2:[3,4,"idle"],right:[3],left:[4],stop_lay:[9]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

		_iChoosedList = new Array();
        _aChickens = new Array();
        
        var iXPos = 420;
        var iYPos = 386;
        for(var i=0;i<5;i++){
            var oUfo = createSprite(oSpriteSheet, "idle",UFO_WIDTH/2,UFO_HEIGHT/2,UFO_WIDTH,UFO_HEIGHT);
            oUfo.on("click", this._onUfoReleased, this,false,i);
            oUfo.x = iXPos;
            oUfo.y = iYPos;
            oUfo.stop();
            oUfo.visible = false;
            
            _oContainer.addChild(oUfo);

            iXPos += 164;
            
            _aChickens[i] = oUfo;
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('bonus_prize');
        oData = {   // image to use
                        framerate: 10,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: Math.floor(oSprite.width/NUM_ALIEN), height: oSprite.height,regX:Math.floor(oSprite.width/NUM_ALIEN)/2,regY:oSprite.height/2}, 
                        animations: {  alien_0: [0],alien_1:[1],alien_2:[2]}
        };

        oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oEgg1 = createSprite(oSpriteSheet, "alien_0",Math.floor(oSprite.width/NUM_ALIEN)/2,oSprite.height/2,Math.floor(oSprite.width/NUM_ALIEN),oSprite.height);
        _oContainer.addChild(_oEgg1);
		
		_oEgg2 = createSprite(oSpriteSheet, "alien_1",Math.floor(oSprite.width/NUM_ALIEN)/2,oSprite.height/2,Math.floor(oSprite.width/NUM_ALIEN),oSprite.height);
        _oContainer.addChild(_oEgg2);
		
		_oEgg3 = createSprite(oSpriteSheet, "alien_2",Math.floor(oSprite.width/NUM_ALIEN)/2,oSprite.height/2,Math.floor(oSprite.width/NUM_ALIEN),oSprite.height);
        _oContainer.addChild(_oEgg3);
        
        var _oMaskEgg = new createjs.Shape();
        _oMaskEgg.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(210, 290, 1000,360);
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
        for(var i=0;i<_aChickens.length;i++){
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
        _oEgg1.gotoAndStop("alien_0");
		
		_oEgg2.x = 118;
        _oEgg2.y = 308;
        _oEgg2.rotation = 0;
        _oEgg2.gotoAndStop("alien_1");
		
		_oEgg3.x = 118;
        _oEgg3.y = 308;
        _oEgg3.rotation = 0;
        _oEgg3.gotoAndStop("alien_2");
		
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
        
        for(var i=0;i<_aChickens.length;i++){
			console.log(_aChickens.length);
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
		setVolume("BGMusic",0);
        s_MusicBonus = playSound("BonusBGMusic",1,true);		
	};
	
	this.refreshFreeTime = function(_iCountBox){
        var _text = " ";
        if(_iCountBox <= 1){
            _text = _iCountBox + "\nUFO";
        }else{
            _text = _iCountBox + "\nUFOS";
        }
        _oTextTime.text = _text;
    };
    
    this._onUfoReleased = function(event,oData){
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
			setTimeout(function(){_bChickenClicked = false;}, 1000);
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
				if(_iNumberCount === _iCount - 1){
					_aChickens[i].gotoAndStop("right");
				}	
            }else if(i === iIndex){
                _aChickens[iIndex].framerate = 10;
                _aChickens[iIndex].gotoAndPlay("lay_alien");
            }else{
				if(_iNumberCount === _iCount - 1){
					_aChickens[i].gotoAndStop("left");
				}
            }
        }

        var oParent = this;
        setTimeout(function(){oParent.layEgg(iIndex, iRandEgg);}, 500);
    };
	
	this.playOneChicken = function(Egg,iRandEgg){
		Egg.gotoAndStop("alien_"+iRandEgg);
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
		_aChickens[Index].gotoAndPlay("idle_rand_0");
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