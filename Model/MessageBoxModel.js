(function(){
    class MessageBoxModel{
        constructor(){
            this.reasonsAndMessages = {
                added: 'Product has been added to your cart',
                removed: 'Product has been removed from your cart'
            }
        }
        getReasonsAndMessages(){
            return this.reasonsAndMessages;
        }
    }

    window.MessageBox = new MessageBoxModel();
})();