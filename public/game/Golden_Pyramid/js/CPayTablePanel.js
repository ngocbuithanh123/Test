function CPayTablePanel(){
    var _iCurPage;
    var _aNumSymbolComboText;
    var _aWinComboText;
    var _aPages;
    var _oCurPage;
    
    var _oHitArea;
    var _oWildText;
    var _oBg;
    var _oButArrowNext;
    var _oButArrowPrev;
    var _oContainer;
    
    this._init = function(){
        _iCurPage = 0;
        _aNumSymbolComboText = new Array();
        _aWinComboText = new Array();
        _aPages = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oAttachSection.addChild(_oContainer);
        
        //ATTACH PAGE 1 Symbol 1
        var oContainerPage = new createjs.Container();
        _oContainer.addChild(oContainerPage);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable1'));
        oContainerPage.addChild(oBg);
        
        this._createPayouts(oContainerPage,0);
        
        _aPages[1] = oContainerPage;

        //ATTACH PAGE 2 Symbol 2
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable2'));
        oContainerPage.addChild(oBg);

        this._createPayouts(oContainerPage,1);
        
        _aPages[0] = oContainerPage;
        
        //ATTACH PAGE 3 Wild Symbol
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable3'));
        oContainerPage.addChild(oBg);
        
        _oWildText = new createjs.Text(TEXT_HELP_WILD,"20px "+FONT_BOLD, "#4f2930");
        _oWildText.textAlign = "center";
        _oWildText.x = 757;
        _oWildText.y = 320;
        oContainerPage.addChild(_oWildText);
        
        _aPages[2] = oContainerPage;
        
        //ATTACH PAGE 4 Bonus Symbol
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable4'));
        oContainerPage.addChild(oBg);
        
        var oText = new createjs.Text(TEXT_HELP_BONUS1,"20px "+FONT_BOLD, "#4f2930");
        oText.textAlign = "center";
        oText.x = 986 + 5;
        oText.y = 124 + 5;
        oText.lineWidth = 400;
        oContainerPage.addChild(oText);
        
        var oText2 = new createjs.Text(TEXT_HELP_BONUS2,"20px "+FONT_BOLD, "#4f2930");
        oText2.textAlign = "center";
        oText2.x = 506 + 7;
        oText2.y = 304 + 45;
        oText2.lineWidth = 400;
        oContainerPage.addChild(oText2);
        
        _aPages[3] = oContainerPage;

        //ATTACH PAGE 5 FreeSpins Symbol
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable5'));
        oContainerPage.addChild(oBg);
        
        var oText = new createjs.Text(TEXT_HELP_FREESPIN,"20px "+FONT_BOLD, "#4f2930");
        oText.textAlign = "center";
        oText.x = 757;
        oText.y = 315 ;
        oText.lineWidth = 400;
        oContainerPage.addChild(oText);

        var oText = new createjs.Text(TEXT_HELP_FREESPIN2,"15px "+FONT_BOLD, "#4f2930");
        oText.textAlign = "center";
        oText.x = 757;
        oText.y = 385 ;
        oText.lineWidth = 400;
        oContainerPage.addChild(oText);
        
        _aPages[4] = oContainerPage;

        //ATTACH PAGE 6 Wining Line
        oContainerPage = new createjs.Container();
        oContainerPage.visible = false;
        _oContainer.addChild(oContainerPage);
        
        oBg = createBitmap(s_oSpriteLibrary.getSprite('paytable6'));
        oContainerPage.addChild(oBg);
        
        _aPages[5] = oContainerPage;
        
        _oCurPage = _aPages[_iCurPage];
        
        
        //ATTACH HIT AREA
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        var oParent = this;
        _oHitArea.on("click",function(){oParent._onExit()});
        _oContainer.addChild(_oHitArea);
        
        //ATTACH ARROW
        _oButArrowNext = new CGfxButton(CANVAS_WIDTH - 280,50,s_oSpriteLibrary.getSprite('but_arrow_next'),_oContainer);
        _oButArrowNext.addEventListener(ON_MOUSE_UP, this._onNext, this);
        
        _oButArrowPrev = new CGfxButton(280,50,s_oSpriteLibrary.getSprite('but_arrow_prev'),_oContainer);
        _oButArrowPrev.addEventListener(ON_MOUSE_UP, this._onPrev, this);
    };
    
    this.unload = function(){
        var oParent = this;
        _oHitArea.off("click",function(){oParent._onExit()});
        
        s_oAttachSection.removeChild(_oContainer);
        
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            _oContainer.removeChild(_aNumSymbolComboText[i]);
        }
        
        for(var j=0;j<_aWinComboText.length;j++){
            _oContainer.removeChild(_aWinComboText[j]);
        }
        
    };
    
    this._createPayouts = function(oContainerPage, page){
        var aPos = [{x:621 ,y:170 },{x:951,y:170 },{x:471,y:352},{x:801,y:352},{x:1121,y:352},
                    {x:1091,y:302},{x:441,y:486}, {x:441,y:486}, {x:441,y:486}, {x:441,y:486}];
        
        var iCurPos = 0;
        var iStart = 0;
        var iEnd = 0;
        if(page === 0){
            iStart = 0;
            iEnd = 5;
        }
        if(page === 1){
            iStart = 5;
            iEnd = 13;
        }

        for(var i=iStart;i<iEnd;i++){
            var aSymbolPayouts = s_aSymbolWin[i];
            do{
                var iIndex = aSymbolPayouts.indexOf(0);
                if(iIndex !== -1){
                    aSymbolPayouts.splice(iIndex, 1);
                }
                
            }while(iIndex !== -1);
            
            var iLen = aSymbolPayouts.length;
            
            if(iLen === 0){
                continue;
            }
            
            var iOffsetY = 30;
            if(iLen === 4){
                iOffsetY = 22;
            }

            var iYPos = aPos[iCurPos].y;
            _aNumSymbolComboText[i] = new Array();
            _aWinComboText[i] = new Array();

            for(var j=0;j<iLen;j++){
                var oTextMult = new createjs.Text("X"+(5-j),"25px "+FONT_ZDYK, "#4f2930");
                oTextMult.textAlign = "center";
                oTextMult.x = aPos[iCurPos].x;
                oTextMult.y = iYPos;
                oTextMult.textBaseline = "alphabetic";
                oContainerPage.addChild(oTextMult);

                _aNumSymbolComboText[i][j] = oTextMult;
                
                var oText = new createjs.Text(aSymbolPayouts[iLen-j-1],"25px "+FONT_REGULAR, "#4f2930");
                oText.textAlign = "center";
                oText.x = oTextMult.x + 50;
                oText.y = oTextMult.y;
                oText.textBaseline = "alphabetic";
                oContainerPage.addChild(oText);

                _aWinComboText[i][j] = oText;
            
                iYPos += iOffsetY;
            }
            
            iCurPos++;
        }
    };
    
    this._onNext = function(){
        if(_iCurPage === _aPages.length-1){
            _iCurPage = 0;
        }else{
            _iCurPage++;
        }
        
        
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
    };
    
    this._onPrev = function(){
        if(_iCurPage === 0){
            _iCurPage = _aPages.length -1;
        }else{
            _iCurPage--;
        }
        
        
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
    };
    
    this.show = function(){
        _iCurPage = 0;
        _oCurPage.visible = false;
        _aPages[_iCurPage].visible = true;
        _oCurPage = _aPages[_iCurPage];
        
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this.resetHighlightCombo = function(){
        for(var i=0;i<_aNumSymbolComboText.length;i++){
            for(var j=0;j<_aNumSymbolComboText[i].length;j++){
                _aNumSymbolComboText[i][j].color = "#4f2930";
                _aWinComboText[i][j].color = "#4f2930";
                createjs.Tween.removeTweens(_aWinComboText[i][j]);
                _aWinComboText[i][j].alpha = 1;
            }
        } 
    };
    
    this.highlightCombo = function(iSymbolValue,iNumCombo){
        _aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo].color = "#ff0000";
        
        this.tweenAlpha(_aWinComboText[iSymbolValue-1][NUM_REELS-iNumCombo],0);
        
    };
    
    this.tweenAlpha = function(oText,iAlpha){
        var oParent = this;
        createjs.Tween.get(oText).to({alpha:iAlpha}, 200).call(function(){if(iAlpha === 1){
                                                                                    oParent.tweenAlpha(oText,0);
                                                                                }else{
                                                                                    oParent.tweenAlpha(oText,1);
                                                                                }
        });
    };
    
    this._onExit = function(){
        s_oGame.hidePayTable();
    };
    
    this.isVisible = function(){
        return _oContainer.visible;
    };
    
    this._init();
}