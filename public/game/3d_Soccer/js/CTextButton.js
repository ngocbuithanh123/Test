function CTextButton(iXPos, iYPos, iXPlusPos , iYPlusPos,oSprite,szText,szTextPlus,szFont,szColor,iFontSize,oParent){
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oText;
    var _oTextBlack;
    var _oTextPlus;
    var _oButtonBg;
	var isDrag;
    
    this._init = function (iXPos, iYPos, iXPlusPos, iYPlusPos, oSprite, szText,szTextPlus, szFont, szColor, iFontSize, oParent){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        _oButtonBg = createBitmap( oSprite);
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;

        var iStepShadow = Math.ceil(iFontSize/20);

        _oText = new createjs.Text(szText,iFontSize+"px "+szFont, szColor);
        _oText.textAlign = "center";
        var oBounds = _oText.getBounds();    
        _oText.x = oSprite.width / 2 - iXPlusPos;
        _oText.y = ((oSprite.height) - oBounds.height) / 2 - iYPlusPos;

        _oTextBlack = new createjs.Text(szText,iFontSize+"px "+szFont, "#000000");
        _oTextBlack.textAlign = "center";
        var oBounds = _oTextBlack.getBounds();    
        _oTextBlack.x = oSprite.width / 2 - iXPlusPos + iStepShadow;
        _oTextBlack.y = ((oSprite.height) - oBounds.height) / 2 - iYPlusPos + iStepShadow;

        _oTextPlus = new createjs.Text(szTextPlus,iFontSize+"px "+szFont, szColor);
        _oTextPlus.textAlign = "center";
        var oBounds = _oTextPlus.getBounds();    
        _oTextPlus.x = oSprite.width / 2 - iXPlusPos;
        _oTextPlus.y = ((oSprite.height) - oBounds.height) / 2 - iYPlusPos + 20;

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        if (!s_bMobile)
            _oButton.cursor = "pointer";
        _oButton.addChild(_oButtonBg,_oTextBlack,_oText,_oTextPlus);

        
        if(oParent === undefined){
            s_oAttachSection.addChild(_oButton);
        }else{
            oParent.addChild(_oButton);
        }
        

        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown");
       _oButton.off("pressup");
       
       s_oAttachSection.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.setText = function(szText){
        _oText.text = szText;
        _oTextBlack.text = szText;
    };
    
    this.enable = function(){
        _bDisable = false;
		
	_oButtonBg.filters = [];

        _oButtonBg.cache(0,0,_iWidth,_iHeight);
    };
    
    this.disable = function(){
        _bDisable = true;
		
	var matrix = new createjs.ColorMatrix().adjustSaturation(-100);
        _oButtonBg.filters = [
                 new createjs.ColorMatrixFilter(matrix)
        ];
        _oButtonBg.cache(0,0,_iWidth,_iHeight);
    };
    
    this._initListener = function(){
       oParent = this;

       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
		isDrag = false; 
        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;
		isDrag = true;
		initialY = 0;
       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.changeText = function(szText){
        _oText.text = szText;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };
    
    this.getText = function(){
        return _oText.text;
    };
	
	this.changeY = function(value){
        _oButton.y = value;
	};
    
	this.getDrag = function(){
		return isDrag;
    };
	
	this.setVisible = function(isVisible){
		_oButton.visible = isVisible;
	};
    
    this._init(iXPos, iYPos, iXPlusPos, iYPlusPos, oSprite, szText,szTextPlus, szFont, szColor, iFontSize, oParent);
    
    return this;
    
}