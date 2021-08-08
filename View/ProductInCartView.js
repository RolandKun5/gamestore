class ProductInCartView extends DOMNode{
    constructor(template,className,containerElement){
        super(template,className,containerElement);
        // DOM csomópont
        this.node;
        // Szelektorok
        this.productInCartImgSelector = '.cart-product-img';
        this.productInCartTitleSelector = '.cart-product-title';
        this.productInCartPieceSelector = '.cart-product-pc';
        this.productInCartPriceSelector = '.cart-product-price';
        this.productInCartRemoveBtnSelector = '.cart-product-remove';
        // HTML elemek
        this.productInCartImgElement;
        this.productInCartTitleElement;
        this.productInCartPieceElement;
        this.productInCartPriceElement;
        this.productInCartRemoveBtnElement;
    }
    setUp(node){
        this.node = node;
        this.productInCartImgElement = this.node.querySelector(this.productInCartImgSelector);
        this.productInCartTitleElement = this.node.querySelector(this.productInCartTitleSelector);
        this.productInCartPieceElement = this.node.querySelector(this.productInCartPieceSelector);
        this.productInCartPriceElement = this.node.querySelector(this.productInCartPriceSelector);
        this.productInCartRemoveBtnElement = this.node.querySelector(this.productInCartRemoveBtnSelector);
        this.productInCartRemoveBtnElement.addEventListener('click',this.handleRemoveClick.bind(this));
    }
    handleRemoveClick(){
        PubSub.publish('removeProduct',this.productInCartTitleElement.textContent)
    }
}