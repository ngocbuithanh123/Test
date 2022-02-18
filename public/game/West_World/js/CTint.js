function CTint(oParentContainer, _index, _xTins, _yTins)
{
    var _pStartPosTins;
    var _aAnims;
    var _oContainer1;
    var _oContainer2;
    var _oContainer;
    var _oParentContainer;

    //New add var
    var _iTotAnimFrame;
    var _iCurFrameIndex = 0;
    var _bUpdate = false;
    var w=0;

    this._init = function(oParentContainer, _index, _xTins, _yTins)
    {
        _index = 0;
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oContainer.x = _xTins;
        _oContainer.y = _yTins;
        _oParentContainer.addChild(_oContainer);
        
        _oContainer1 = new createjs.Container();
        _oContainer.addChild(_oContainer1);
        _oContainer1.visible = true;
        
        _aAnims = new Array();

        for(var j=0;j<s_CountImage[_index];j++)
        {
            var oBmp2 = createBitmap(s_oSpriteLibrary.getSprite(('Tins'+(_index+1)+'_'+j)));
            _oContainer1.addChild(oBmp2);
            oBmp2.visible = false;
            _aAnims.push(oBmp2);
        }
        _aAnims[0].visible=true;
       console.log("_aAnims.length: " + _aAnims.length);
        //Animation Tin
    };
    this.show = function()
    {
        this.disableAllFrame();
        _iTotAnimFrame = _aAnims.length;
        _aAnims[0].visible = true;
        _iCurFrameIndex = 0;
        _bUpdate = true;
        console.log("true");
    };     

    

    this.nextFrame = function()
    {  
        w++;
        if(w === 2)
        {
            w=0;
            this.disableAllFrame();
            _iCurFrameIndex++;
            _aAnims[_iCurFrameIndex].visible= true;
            if (_iCurFrameIndex === _iTotAnimFrame-1) {
                _bUpdate = false;
            }
            
        }
    };

    this.destroy = function(){
        for(var i=0; i<_aAnims.length;i++){
            _oContainer1.removeChild(_aAnims[i]);
        }
        
    };

    this.disableAllFrame = function(){
        for(var i=0; i<_aAnims.length; i++)
        {
            _aAnims[i].visible = false;
        }
    };

    this.update = function(){
        if(!_bUpdate){
            return;
        }

        this.nextFrame();
    };
    
    this._init(oParentContainer, _index, _xTins, _yTins);
}