function CMenus(){
    var _oStartBut;
    var _oContainer;

    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oContainer.visible = true;
		
        s_oAttachSection.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBg);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_play_menu');
        _oStartBut = new CTextButton(570 + (oSprite.width / 2), 500, -1, -5 ,oSprite," "," ",FONT_ZDYK,"#ffffff",45,_oContainer);  
        _oStartBut.addEventListener(ON_MOUSE_UP, this.unload, this);
    }

    this.unload = function(){
		playSound("press_but",1,0);
        s_MusicGamePlay = playSound("BGMusic",1,-1);
        _oContainer.visible = false;
    };

    s_oMenus = this;
    this._init();
}
var s_oMenus = null;
var s_MusicGamePlay;
var s_MusicBonus;
