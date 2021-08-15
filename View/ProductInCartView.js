class ProductInCartView extends DOMNode{
    constructor(htmlCode,className,parentElement){
        super(htmlCode,className,parentElement);
        // Szelektorok
        this.productInCartImgSelector = '.cart-product-img';
        this.productInCartTitleSelector = '.cart-product-title';
        this.productInCartPieceSelector = '.cart-product-pc';
        this.productInCartPriceSelector = '.cart-product-price';
        this.productInCartRemoveBtnSelector = '.cart-product-remove';
        // HTML elemek
        this.productInCartImgElement = this.node.querySelector(this.productInCartImgSelector);
        this.productInCartTitleElement = this.node.querySelector(this.productInCartTitleSelector);
        this.productInCartPieceElement = this.node.querySelector(this.productInCartPieceSelector);
        this.productInCartPriceElement = this.node.querySelector(this.productInCartPriceSelector);
        this.productInCartRemoveBtnElement = this.node.querySelector(this.productInCartRemoveBtnSelector);
        // Event Listener hozzáadás
        this.productInCartRemoveBtnElement.addEventListener('click',this.handleRemoveClick.bind(this));
    }
    // Privát metódusok
    _removeProduct(){
        PubSub.publish('removeProductFromCart',this.productInCartTitleElement.textContent);
    }
    _popUpMessageBox(){        
        const message = MessageBox.getReasonsAndMessages();
        PubSub.publish('popUpMessageBox',message.removed);
    }
    // Publikus metódus
    handleRemoveClick(){
        this._removeProduct();
        this._popUpMessageBox();
    }
}