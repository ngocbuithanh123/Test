function CBonusPanelChicken(){
    var _bChickenClicked;
    var _iBonusMoney;
    var _iCurBet;
   
    var _oWinText;
    var _oContainer1;
    var _oContainer;
	var _iPrizeToShow;
	var _iCount;
	var _iNumberCount;

    var _TextResult1;
	var _TextResult2;
	var _TextResult3;
	
	var _TextBlackResult1;
	var _TextBlackResult2;
	var _TextBlackResult3;
	
	var _oTextTime;
	var _oFreeSpinPanel;
	var _listResult;
    var countNumberAfterCommar;    
    var _oWinText;
    
    var _oGunfire;
    var _listTin;
    var Tins;
    var isEndGame;

	
	this._init = function(){   
    
        _oContainer1 = new createjs.Container();
        s_oStage.addChild(_oContainer1);

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bonus_bg'));
        _oContainer1.alpha = 0;
        _oContainer1.visible= false;
        _oContainer1.addChild(oBg);

        _oWinText = new createjs.Text("X 300$","80px "+FONT_BOLD, "#ffff00");
        _oWinText.alpha = 0;
        _oWinText.textAlign = "center";
        _oWinText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oWinText.x = CANVAS_WIDTH/2;
        _oWinText.y = 150;
        _oWinText.textBaseline = "alphabetic";
        _oContainer1.addChild(_oWinText);

        //this.Cleartext();
		this.InitCountEgg();
        //this.HideTarget();
    };
	
	this.InitCountEgg = function(){
		_oFreeSpinPanel = new createjs.Bitmap(s_oSpriteLibrary.getSprite('freespin_panel'));
        _oFreeSpinPanel.x = 1030;
        _oFreeSpinPanel.y = 15;
        _oFreeSpinPanel.visible = true;
        _oContainer1.addChild(_oFreeSpinPanel);
		
		_oTextTime = new createjs.Text("", "23px " + FONT_BOLD, "#ffff00");
        _oTextTime.x = 1100;
        _oTextTime.y = 47;
        _oTextTime.textAlign = "center";
        _oTextTime.textBaseline = "alphabetic";
        _oContainer1.addChild(_oTextTime);
        console.log(' '+_oTextTime);
	};

    this.InitTextResults = function(){
		
		_TextBlackResult1 = new createjs.Text("", "40px " + FONT_BOLD, "#000000");
        _TextBlackResult1.x = 440-2;
        _TextBlackResult1.y = 480;
        _TextBlackResult1.textAlign = "center";
        _TextBlackResult1.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult1);
        _TextBlackResult1.visible=false;
		
		_TextBlackResult2 = new createjs.Text("", "40px " + FONT_BOLD, "#000000");
        _TextBlackResult2.x = 620-2;
        _TextBlackResult2.y = 480-15;
        _TextBlackResult2.textAlign = "center";
        _TextBlackResult2.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult2);
        _TextBlackResult2.visible=false;
		
		_TextBlackResult3 = new createjs.Text("", "40px " + FONT_BOLD, "#000000");
        _TextBlackResult3.x = 800-2;
        _TextBlackResult3.y = 480-15;
        _TextBlackResult3.textAlign = "center";
        _TextBlackResult3.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult3);
        _TextBlackResult3.visible=false;

        _TextBlackResult4 = new createjs.Text("", "40px " + FONT_BOLD, "#000000");
        _TextBlackResult4.x = 980-2;
        _TextBlackResult4.y = 480-15;
        _TextBlackResult4.textAlign = "center";
        _TextBlackResult4.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult4);
        _TextBlackResult4.visible=false;
		
		_TextBlackResult5 = new createjs.Text("", "40px " + FONT_BOLD, "#000000");
        _TextBlackResult5.x = 1160-2;
        _TextBlackResult5.y = 480;
        _TextBlackResult5.textAlign = "center";
        _TextBlackResult5.textBaseline = "alphabetic";
        _oContainer.addChild(_TextBlackResult5);
        _TextBlackResult5.visible=false;
		
		_TextResult1 = new createjs.Text("", "40px " + FONT_BOLD, "#ff9900");
        _TextResult1.x = 440;
        _TextResult1.y = 480;
        _TextResult1.textAlign = "center";
        _TextResult1.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult1);
        _TextResult1.visible=false;
		
		_TextResult2 = new createjs.Text("", "40px " + FONT_BOLD, "#ff9900");
        _TextResult2.x = 620;
        _TextResult2.y = 480-15;
        _TextResult2.textAlign = "center";
        _TextResult2.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult2);
        _TextResult2.visible=false;
		
		_TextResult3 = new createjs.Text("", "40px " + FONT_BOLD, "#ff9900");
        _TextResult3.x = 800;
        _TextResult3.y = 480-15;
        _TextResult3.textAlign = "center";
        _TextResult3.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult3);
        _TextResult3.visible=false;

        _TextResult4 = new createjs.Text("", "40px " + FONT_BOLD, "#ff9900");
        _TextResult4.x = 980;
        _TextResult4.y = 480-15;
        _TextResult4.textAlign = "center";
        _TextResult4.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult4);
        _TextResult4.visible=false;
		
		_TextResult5 = new createjs.Text("", "40px " + FONT_BOLD, "#ff9900");
        _TextResult5.x = 1160;
        _TextResult5.y = 480;
        _TextResult5.textAlign = "center";
        _TextResult5.textBaseline = "alphabetic";
        _oContainer.addChild(_TextResult5);
        _TextResult5.visible=false;
	};
   
	
	this.show = function(iNumChicken,iCurBet,iPrize,iCount){
		_iChoosedList = new Array();
		_iPrizeToShow = iPrize;
        _iCurBet = iCurBet;
        _bChickenClicked = false;
        _oWinText.alpha = 0;
		//_iCount = iCount - 2;
        _iCount = 5;
		_iNumberCount = 0;
        isEndGame = false;


		this.refreshFreeTime(_iCount);
		this.GenerateResult(_iCount);
        //this.showWinText(parseFloat(0));
    };

    this.showWinText = function(value){
      _iwinResult += value;
        _oWinText.text = "$"+ _iwinResult.toFixed(2);
    };
  

    this._onShot = function(szType)
    {
        if(isEndGame)
        {return;}
        switch(szType)
        {
            case BONUS_BUTTON_1:{
                    _oButEdgeLeft.setVisible(true);
                    _listTin[0].show();
                    this.LayScoreText(_TextResult1,_TextBlackResult1,_listResult[_iNumberCount]);
                    _TextResult1.visible=true;
                    _TextBlackResult1.visible=true;
                    this.buttonRelease();  
                    _oButEdgeLeft.setVisible(false);
                    break;
            }
            case BONUS_BUTTON_2:{
            
                    _listTin[1].show();
                    _oButCenterLeft.setVisible(false);
                    this.LayScoreText(_TextResult2,_TextBlackResult2,_listResult[_iNumberCount]);
                    _TextResult2.visible=true;
                    _TextBlackResult2.visible=true;
                    this.buttonRelease();
                    break;
            }
            case BONUS_BUTTON_3:{
            
                    _listTin[2].show();
                    _oButCenter.setVisible(false);
                    this.LayScoreText(_TextResult3,_TextBlackResult3,_listResult[_iNumberCount]);
                    _TextResult3.visible=true;
                    _TextBlackResult3.visible=true;
                    this.buttonRelease();
                    break;
            }
            case BONUS_BUTTON_4:{
            
                    _listTin[3].show();
                    _oButCenterRight.setVisible(false);
                    this.LayScoreText(_TextResult4,_TextBlackResult4,_listResult[_iNumberCount]);
                    _TextResult4.visible=true;
                    _TextBlackResult4.visible=true;
                    this.buttonRelease();
                    break;
            }
            case BONUS_BUTTON_5:{
           
                    _listTin[4].show();
                    _oButEdgeRight.setVisible(false);
                    this.LayScoreText(_TextResult5,_TextBlackResult5,_listResult[_iNumberCount]);
                    _TextResult5.visible=true;
                    _TextBlackResult5.visible=true;
                    this.buttonRelease();
                    break;
            }
        }
        
        //_iGameState = STATE_BONUS_KICK;
        _oGunfire.startAnim();   
        
    };    
    //End of Following add Bonus button

    this.getRndInteger = function(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    };

    this.roundToTwo = function(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    };
	
	this.GenerateResult = function(countBox){
        var mainResult = this.roundToTwo(BONUS_WIN);
        console.log(mainResult);
        console.log("countBox: " + countBox);
        console.log("BONUS_WIN: " + BONUS_WIN);
        var string = mainResult.toString();
        countNumberAfterCommar = 0;

        for(var i=0;i<string.length;i++){
            if(string[i] === "."){
                countNumberAfterCommar = string.length - 1 - i;
            }
        }

        do{
            console.log("GenerateResult: ");
            _listResult = new Array();
            var subResult = 0;
            for(var i=0;i<countBox;i++){
                var result = (Math.random() * (mainResult - 0) + 0).toFixed(countNumberAfterCommar);
                if(parseFloat(subResult) === parseFloat(mainResult)){
                    result = 0;
                }
                subResult += parseFloat(result);
                _listResult.push(this.roundToTwo(result));
                console.log("result: " + result);
                console.log("subResult: " + subResult);
            }
        }while(parseFloat(subResult) !== parseFloat(mainResult));
        // if(!this.CheckListInvalid(_listResult)){
        //     this.GenerateResult(countBox);
        //     return;
        // }
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
        return true;
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
        _oContainer1.visible = true;
        createjs.Tween.get(_oContainer).to({alpha:1}, 1000); 
        createjs.Tween.get(_oContainer1).to({alpha:1}, 1000); 
        this.InitTins();
        this.InitGun();
        this.InitTarget();
        this.InitTextResults();
	};

    this.InitGun = function(){
        xGun = 840;
        yGun = 340;
        _oGunfire = new CGun(xGun,yGun,_oContainer);
        //console.log(xGun,yGun);
    }

    this.InitTins = function(){
        _listTin = new Array();
        var TinArr = new Array(0,1,2,3,4,5,6,7,8,9,10,11);
        this.shuffleArray(TinArr);
        console.log(TinArr);
        var x=380;
        for(var i=0;i<5;i++)
        {
            var y = 230;
            if(i === 0|| i=== 4)
            {
                y=245;
            }
            var Tin = new CTint(_oContainer, TinArr[0], x, y);
            
            _listTin.push(Tin);

            console.log("_listTin: " + _listTin.length);
            x+= 180;
        }
        //x:400 + 164//y: 270 285
    };
    this.InitTarget = function(){
     //Start button section
        var oSpriteBall = s_oSpriteLibrary.getSprite("target");
        
        _oButEdgeLeft = new CGfxButton(425,490,oSpriteBall,_oContainer);
        _oButEdgeLeft.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_1);  
        
        _oButCenterLeft = new CGfxButton(605,475,oSpriteBall,_oContainer);
        _oButCenterLeft.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_2);
        
        _oButCenter = new CGfxButton(785,475,oSpriteBall,_oContainer);
        _oButCenter.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_3);
        
        _oButCenterRight = new CGfxButton(965,475,oSpriteBall,_oContainer);
        _oButCenterRight.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_4);
        
        _oButEdgeRight = new CGfxButton(1145,490,oSpriteBall,_oContainer);
        _oButEdgeRight.addEventListenerWithParams(ON_MOUSE_UP,this._onShot,this,BONUS_BUTTON_5);
    };
	
	this.refreshFreeTime = function(_iCountBox){
        var _text = "\n ";
        if(_iCountBox <= 1){
            _text = _iCountBox + "\nSHOT";
        }else{
            _text = _iCountBox + "\nSHOTS";
        }
        _oTextTime.text = _text;
    };
    this.HideTarget = function(){
        _oButEdgeRight.setVisible(false);
        _oButCenterRight.setVisible(false);
        _oButCenter.setVisible(false);
        _oButCenterLeft.setVisible(false);
        _oButEdgeLeft.setVisible(false);
    };
    
    this.endBonus = function(){
        //SHOW PRIZE WON
        this.HideTarget();
		var result = BONUS_WIN;
        _oWinText.text = "$" + this.roundToTwo(result);
        createjs.Tween.get(_oWinText).to({alpha:1}, 1000);
        
        //ROTATE THE EGG
        //createjs.Tween.get(_oEgg1).to({rotation:110}, 500);  
        
        setTimeout(function(){
                                s_oBonusPanel.unload();
                                _oContainer.alpha = 0;
                                _oContainer.visible= false;

                                _oContainer1.alpha = 0;
                                _oContainer1.visible= false;
                                  
								s_oGame.exitFromBonus();
                                
		},4000);
    };

    this.unload = function()
    {
        _oContainer.removeAllChildren();   
    };

    this.buttonRelease = function()
    {
        _iNumberCount++;
        this.refreshFreeTime(_iCount - _iNumberCount);
        if (_iNumberCount === _iCount)
        {
            this.endBonus();
            isEndGame = true;
        }
    }

    this.LayScoreText =function(Text,TextBlack,result)
    {
        setTimeout(function(){ 
            Text.text = "$"+ result;
		    TextBlack.text = "$"+ result; 
        }, 500);
    }

    this.update = function()
    {
        _oGunfire.update();
        for(var i=0;i<_listTin.length; i++)
        {
        _listTin[i].update();
        }
        
    };

    
    this._init();
    s_oBonusPanel = this;
}
var s_oBonusPanel = null;