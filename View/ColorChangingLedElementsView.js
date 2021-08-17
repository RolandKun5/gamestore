class ColorChangingLedElementsView{
    constructor(){
        this.menuBtnElementSelector = '.menu-btn';
        this.logoElementSelector = '.logo-open';
        this.priceElementsSelector = '.price';
        this.totalParagraphElementSelector = '.total-p';

        this.menuBtnElement = document.querySelector(this.menuBtnElementSelector).firstChild;
        this.logoElement = document.querySelector(this.logoElementSelector);
        this.priceElements = document.querySelectorAll(this.priceElementsSelector);
        this.totalParagraphElement = document.querySelector(this.totalParagraphElementSelector);
        this.elements = [this.menuBtnElement,this.logoElement,...this.priceElements,this.totalParagraphElement];

        this.whiteColor = '#fff'
        this.pinkShadow = '0 0 .9rem rgb(250, 18, 161),0 0 .9rem rgb(250, 18, 161)';
        this.yellowShadow = '0 0 .9rem rgb(255, 251, 0),0 0 .9rem rgb(255, 251, 0)';
        this.ledOffColor = 'rgb(67,68,69)';
        this.shadowOff = 'none';

        this.pauseBetweenLoops = 10000;
        this.pauseBetweenFlashes = 100;
        this.maxFlash = 6;
        this.flashCounter = 0;
        this.currentColor = 'pink';
        this.isLedOn = true;
    }
    _resetProperties(){
        this.pauseBetweenFlashes = 100;
        this.flashCounter = 0;
    }
    _changeColor(shadowColor){
        this.elements.map((element)=>{
            element.style.textShadow = shadowColor;
        });
    }
    _incraseFlashCounter(){
        this.flashCounter++;
    }
    _incrasePauseTime(){
        this.pauseBetweenFlashes += 100;
    }
    _ledOn(shadowColor){
        this.elements.map((element)=>{
            element.style.color = this.whiteColor;
            element.style.textShadow = shadowColor;
        });
        this.isLedOn = true;
    }
    _ledOff(){
        this.elements.map((element)=>{
            element.style.color = this.ledOffColor;
            element.style.textShadow = this.shadowOff;
        });
        this.isLedOn = false;
    }
    _flash(shadowColor){
        if(this.isLedOn){
            this._ledOff();
        }else{
            this._ledOn(shadowColor);
        }
        this._incraseFlashCounter();
        this._incrasePauseTime();
        this._checker();
    }
    _checker(){
        if(!(this.flashCounter === this.maxFlash)){
            if(this.currentColor === 'pink'){
                setTimeout(() => {
                    this._flash(this.pinkShadow);
                }, this.pauseBetweenFlashes);
            }else{
                setTimeout(() => {
                    this._flash(this.yellowShadow);
                }, this.pauseBetweenFlashes);
            }
        }else{
            if(this.currentColor === 'pink'){
                this._changeColor(this.yellowShadow);
                this.currentColor = 'yellow'
            }else{
                this._changeColor(this.pinkShadow);
                this.currentColor = 'pink'
            }
            this._resetProperties();
            this.startColorChangeLoop();
        }
    }

    startColorChangeLoop(){
        setTimeout(() => {
            this._checker();
        }, this.pauseBetweenLoops);
    }
}