function CGun(_xGun, _yGun,oParentContainer )
{
    var _pStartPosTins;
    var _aAnims;
    var _oContainer1;
    var _oContainer;
    var _oParentContainer;

    var _iTotAnimFrame;
    var _iCurFrameIndex = 0;
    var _bUpdate = false;

    this._init = function(_xGun, _yGun,oParentContainer)
    {
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oContainer.x = _xGun;
        _oContainer.y = _yGun;
        _oParentContainer.addChild(_oContainer);
        
        _oContainer1 = new createjs.Container();
        _oContainer1.visible = true;
        _oContainer.addChild(_oContainer1);
        
        _aAnims = new Array();
              
        //Active Anim
       for(var j=0;j<29;j++){
            var oBmp2 = createBitmap(s_oSpriteLibrary.getSprite('Gun'+j));
            _oContainer1.addChild(oBmp2);
            oBmp2.visible = true;
            _aAnims.push(oBmp2);
       }
       console.log("_aAnims.length: " + _aAnims.length);
       this.show();
    };

    this.show = function(){
        this.disableAllFrame();
        _iTotAnimFrame = _aAnims.length;
        _aAnims[0].visible = true;
        _iCurFrameIndex = 0;
        _bUpdate = false
    };
    
    this.nextFrame = function(){
        this.disableAllFrame();
        _iCurFrameIndex++;
        if(_iCurFrameIndex === 1){
            playSound("GunRelease",1,0);
        }else if(_iCurFrameIndex === 6){
            playSound("GunShot",1,0);
        }
        _aAnims[_iCurFrameIndex].visible= true;
    };

    this.disableAllFrame = function(){
        for(var i=0; i<_aAnims.length; i++){
            _aAnims[i].visible = false;
        }
    };

    this.startAnim = function(){
        _bUpdate = true;
        
    };
    
    this.update = function(){
        if(_bUpdate === false){
            return;
        }
        
        if (  _iCurFrameIndex === _iTotAnimFrame-1) {
            this.show();
            
        }else{
            this.nextFrame();
        }
    };
    
    this._init(_xGun, _yGun,oParentContainer);
}