class MessageBoxView extends DOMNode{
    constructor(HTMLCode,className,containerElement){
        super(HTMLCode,className,containerElement);
        PubSub.subscribe('popUpMessageBox',(message) => this.popUp(message));
        this.node;
        this.opacity = 1;
    }
    #setOpacity(opacity){        
        this.node.style.opacity = opacity;
    }
    #changeOpacity(){
        if(this.opacity > 0){
            this.opacity -= .1;
            setTimeout(()=>{
                this.#changeOpacity();
            },70);
        }else{
            this.#disappear();
        }      
        this.#setOpacity(this.opacity);
    }
    #disappear(){
        this.#setOpacity(this.opacity);
        this.node.classList.remove('message-box-background-show');
    }
    setUp(node){
        this.node = node;
    }
    popUp(message){
        this.opacity = 1;
        this.#setOpacity(this.opacity);
        this.node.classList.add('message-box-background-show');
        this.node.firstElementChild.firstElementChild.textContent = message;
        setTimeout(()=>{
            this.#changeOpacity();
        },1000);
    }
}