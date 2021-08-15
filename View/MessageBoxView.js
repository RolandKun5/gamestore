class MessageBoxView extends DOMNode{
    constructor(htmlCode,className,parentElement){
        super(htmlCode,className,parentElement);
        this.opacity = 1;
        PubSub.subscribe('popUpMessageBox',(message) => this.popUp(message));
    }
    // Privát metódusok
    _resetOpacity(){
        this.opacity = 1;
    }
    _setNodeElementOpacity(){        
        this.node.style.opacity = this.opacity;
    }
    _addCSSClass(){
        this.node.classList.add('message-box-background-show');
    }
    _removeCSSClass(){
        this.node.classList.remove('message-box-background-show');
    }
    _setTextContent(message){
        this.node.firstElementChild.firstElementChild.textContent = message;
    }
    _changeOpacity(){
        if(this.opacity > 0){
            this.opacity -= .1;
            setTimeout(()=>{
                this._changeOpacity();
            },70);
        }else{
            this._removeCSSClass();
        }      
        this._setNodeElementOpacity();
    }
    // Publikus metódus
    popUp(message){
        this._resetOpacity();
        this._setNodeElementOpacity();
        this._addCSSClass();
        this._setTextContent(message);
        setTimeout(()=>{
            this._changeOpacity();
        },1000);
    }
}