class ProductView extends DOMNode{
    constructor(template,className,containerElement){
        super(template,className,containerElement);
        // DOM csomópont
        this.node;
        // Szelektorok
        this.productImageSelector = '.js-product-image';
        this.productNameSelector = '.js-product-name';
        this.productOnStockSelector = '.on-stock';
        this.productPriceSelector = '.price';
        this.productToCartBtnSelector = '.btn-to-cart';
        // HTML elemek
        this.productImageElement;
        this.productNameElement;
        this.productOnStockElement;
        this.productPriceElement;
        this.productToCartBtnElement;        
        this.productInCartUI;
    }    
    setUp(node){
        this.node = node;
        this.productImageElement = this.node.querySelector(this.productImageSelector);
        this.productNameElement = this.node.querySelector(this.productNameSelector);
        this.productOnStockElement = this.node.querySelector(this.productOnStockSelector);
        this.productPriceElement = this.node.querySelector(this.productPriceSelector);
        this.productToCartBtnElement = this.node.querySelector(this.productToCartBtnSelector);
        this.productToCartBtnElement.addEventListener('click',this.handleClick);
    };
    setProductImage(src){
        this.productImageElement.src = src;
        this.productToCartBtnElement.dataset.src = src;
    };
    setProductName(name){
        this.productNameElement.textContent = name;
        this.productToCartBtnElement.dataset.name = name;
    };
    setProductStockState(state){
        this.productOnStockElement.textContent = state;
    };
    setProductPrice(price){
        this.productPriceElement.textContent = price;
        this.productToCartBtnElement.dataset.price = price;
    };
    handleClick(){
       const product = {...this.dataset};
       PubSub.publish('addToCart',product);
    };
};