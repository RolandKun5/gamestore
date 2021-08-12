(function(){

    class MessageBoxView extends DOMNode{
        constructor(template,className,containerElement){
            this.reasonsAndMessages = {
                added: 'Product added to cart',
                removed: 'Product removed from cart'
            }
        }
        getReason(){
            return this.reasonsAndMessages;
        }
        popUp(message){
            console.log(message);
        }
    }

    //window.MessageBox = new MessageBoxView();

})();