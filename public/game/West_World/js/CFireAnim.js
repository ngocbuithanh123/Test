var _oFireAnim;
function CFireAnim(){
    var _oFireFrame1;
    var _oFireFrame2;
    var _oFireFrame3;
    var _oFireFrame4;
    var _oFireFrame5;
    var _oFireFrame6;
    var _oFireFrame7;
    var _oFireFrame8;
    var time = 0;

    this.Init = function(){
        this.loadFireAnim();
        this.loadFireAnim2();
        this.showFire1();
        this.hideFire2();
    };

    this.ShowDancingFire = function(){
        this.hideFire1();
        this.showFire2();
        playSound("FireSound",0,0);
        setTimeout(() => {
            this.hideFire2();
            time++;
            if(time < 1){
                setTimeout(() => {
                    this.ShowDancingFire();
                }, 400);
            }else{
                time = 0;
                this.hideFire2();
                this.showFire1();
            }
        }, 270);
        
    };

    this.loadFireAnim = function(){
        var oDataFire1 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire1')],
            // width, height & registration point of each sprite
            frames: { width: 82, height: 65, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 7] }
        };

        var oSpriteoDataFire1 = new createjs.SpriteSheet(oDataFire1);

        _oFireFrame1 = new createjs.Sprite(oSpriteoDataFire1, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame1.stop();
        _oFireFrame1.x = 252;
        _oFireFrame1.y = 410;
        s_oAttachSection.addChild(_oFireFrame1);

        var oDataFire2 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire1')],
            // width, height & registration point of each sprite
            frames: { width: 82, height: 65, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 7] }
        };

        var oSpriteoDataFire2 = new createjs.SpriteSheet(oDataFire2);

        _oFireFrame2 = new createjs.Sprite(oSpriteoDataFire2, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame2.stop();
        _oFireFrame2.x = 351;
        _oFireFrame2.y = 410;
        s_oAttachSection.addChild(_oFireFrame2);

        var oDataFire3 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire1')],
            // width, height & registration point of each sprite
            frames: { width: 82, height: 65, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 7] }
        };

        var oSpriteoDataFire3 = new createjs.SpriteSheet(oDataFire3);

        _oFireFrame3 = new createjs.Sprite(oSpriteoDataFire3, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame3.stop();
        _oFireFrame3.x = 892;
        _oFireFrame3.y = 410;
        s_oAttachSection.addChild(_oFireFrame3);

        var oDataFire4 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire1')],
            // width, height & registration point of each sprite
            frames: { width: 82, height: 65, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 7] }
        };

        var oSpriteoDataFire4 = new createjs.SpriteSheet(oDataFire4);

        _oFireFrame4 = new createjs.Sprite(oSpriteoDataFire4, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame4.stop();
        _oFireFrame4.x = 991;
        _oFireFrame4.y = 410;
        s_oAttachSection.addChild(_oFireFrame4);
    };

    this.loadFireAnim2 = function(){
        var oDataFire5 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire2')],
            // width, height & registration point of each sprite
            frames: { width: 68, height: 205, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 9] }
        };

        var oSpriteoDataFire5 = new createjs.SpriteSheet(oDataFire5);

        _oFireFrame5 = new createjs.Sprite(oSpriteoDataFire5, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame5.stop();
        _oFireFrame5.x = 262;
        _oFireFrame5.y = 265;
        s_oAttachSection.addChild(_oFireFrame5);

        var oDataFire6 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire2')],
            // width, height & registration point of each sprite
            frames: { width: 68, height: 205, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 9] }
        };

        var oSpriteoDataFire6 = new createjs.SpriteSheet(oDataFire6);

        _oFireFrame6 = new createjs.Sprite(oSpriteoDataFire6, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame6.stop();
        _oFireFrame6.x = 362;
        _oFireFrame6.y = 265;
        s_oAttachSection.addChild(_oFireFrame6);

        var oDataFire7 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire2')],
            // width, height & registration point of each sprite
            frames: { width: 68, height: 205, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 9] }
        };

        var oSpriteoDataFire7 = new createjs.SpriteSheet(oDataFire7);

        _oFireFrame7 = new createjs.Sprite(oSpriteoDataFire7, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame7.stop();
        _oFireFrame7.x = 902;
        _oFireFrame7.y = 265;
        s_oAttachSection.addChild(_oFireFrame7);

        var oDataFire8 = {   // image to use
            framerate: 30,
            images: [s_oSpriteLibrary.getSprite('Fire2')],
            // width, height & registration point of each sprite
            frames: { width: 68, height: 205, regX: 0, regY: 0 },
            animations: { static: [0, 1], anim: [1, 9] }
        };

        var oSpriteoDataFire8 = new createjs.SpriteSheet(oDataFire8);

        _oFireFrame8 = new createjs.Sprite(oSpriteoDataFire8, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        _oFireFrame8.stop();
        _oFireFrame8.x = 1002;
        _oFireFrame8.y = 265;
        s_oAttachSection.addChild(_oFireFrame8);
    };

    this.showFire1 = function(){
        _oFireFrame1.gotoAndPlay("anim");
        _oFireFrame1.visible = true;
        _oFireFrame2.gotoAndPlay("anim");
        _oFireFrame2.visible = true;
        _oFireFrame3.gotoAndPlay("anim");
        _oFireFrame3.visible = true;
        _oFireFrame4.gotoAndPlay("anim");
        _oFireFrame4.visible = true;
    };

    this.showFire2 = function(){
        _oFireFrame5.gotoAndPlay("anim");
        _oFireFrame5.visible = true;
        _oFireFrame6.gotoAndPlay("anim");
        _oFireFrame6.visible = true;
        _oFireFrame7.gotoAndPlay("anim");
        _oFireFrame7.visible = true;
        _oFireFrame8.gotoAndPlay("anim");
        _oFireFrame8.visible = true;
    };

    this.hideFire1 = function(){
        _oFireFrame1.gotoAndStop("static");
        _oFireFrame1.visible = false;
        _oFireFrame2.gotoAndStop("static");
        _oFireFrame2.visible = false;
        _oFireFrame3.gotoAndStop("static");
        _oFireFrame3.visible = false;
        _oFireFrame4.gotoAndStop("static");
        _oFireFrame4.visible = false;
    };

    this.hideFire2 = function(){
        _oFireFrame5.gotoAndStop("static");
        _oFireFrame5.visible = false;
        _oFireFrame6.gotoAndStop("static");
        _oFireFrame6.visible = false;
        _oFireFrame7.gotoAndStop("static");
        _oFireFrame7.visible = false;
        _oFireFrame8.gotoAndStop("static");
        _oFireFrame8.visible = false;
    };

    this.Init();
}