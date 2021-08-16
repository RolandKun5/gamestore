class ProductView extends DOMNode{
    constructor(htmlCode,className,parentElement){
        super(htmlCode,className,parentElement);
        this.productImageSelector = '.js-product-image';
        this.productNameSelector = '.js-product-name';
        this.productOnStockSelector = '.on-stock';
        this.productPriceSelector = '.price';
        this.productToCartBtnSelector = '.btn-to-cart';
        this.productImageElement = this.node.querySelector(this.productImageSelector);
        this.productNameElement = this.node.querySelector(this.productNameSelector);
        this.productOnStockElement = this.node.querySelector(this.productOnStockSelector);
        this.productPriceElement = this.node.querySelector(this.productPriceSelector);
        this.productToCartBtnElement = this.node.querySelector(this.productToCartBtnSelector);
        this.productToCartBtnElement.addEventListener('click',this.handleClick.bind(this));
    }   
    _productAddToCart(){
        const product = {...this.productToCartBtnElement.dataset};
        PubSub.publish('addToCart',product);
    }
    _popUpMessageBox(){
        const message = MessageBox.getReasonsAndMessages();
        PubSub.publish('popUpMessageBox',message.added);
    }

    setProductImage(src){
        this.productImageElement.src = src;
    }
    setProductName(name){
        this.productNameElement.textContent = name;
    }
    setProductStockState(state){
        this.productOnStockElement.textContent = state;
    }
    setProductPrice(price){
        this.productPriceElement.textContent = '$' + price;
    }
    uploadDataset(){
        this.productToCartBtnElement.dataset.src = this.productImageElement.src;
        this.productToCartBtnElement.dataset.name = this.productNameElement.textContent;
        this.productToCartBtnElement.dataset.price = this.productPriceElement.textContent.replace('$','');
    }
    handleClick(){
        this._productAddToCart();
        this._popUpMessageBox();
    }
};