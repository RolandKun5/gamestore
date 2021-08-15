class CartModel{
    constructor(){
        this.cart = [];   
        this.cartTotalAmount;
        PubSub.subscribe('addToCart',(product) => this.displayProductInCart(product));
        PubSub.subscribe('removeProductFromCart',(productName) => this.removeProductFromCart(productName));
    }
    // Privát metódusok
    _hasProduct(product){
        return this.cart.hasOwnProperty(product.name);
    }
    _addToCartArray(product){
        this.cart[product.name] = [];
        product.piece = 0;
        this.cart[product.name].push(product);
    }
    _checker(product){ 
        if(this._hasProduct(product) === false){
            this._addToCartArray(product);
        }
    }
    _increasePieces(product){
        const piece = parseInt(this.cart[product.name][0].piece) + 1;
        this.cart[product.name][0].piece = piece;
    }
    _decreasedPieces(name){
        const piece = parseInt(this.cart[name][0].piece) - 1;
        this.cart[name][0].piece = piece;
    }
    _calculateProductTotal(product){
        const piece = this.cart[product.name][0].piece;
        const price = this.cart[product.name][0].price
        const priceTotal = Helper.numberRounding(price * piece);  
        this.cart[product.name][0].total = priceTotal;
    }
    _updateCartView(){
        PubSub.publish('updateCart',this.cart);
    }
    _calculateCartTotal(){
        let total = 0;
        for(const product in this.cart){
            total += this.cart[product][0].total;
        }
        total = Helper.numberRounding(total);
        this.cartTotalAmount = total;
    }
    _updateCartTotalAmountView(){
        PubSub.publish('updateTotalAmount',this.cartTotalAmount);
    }
    _updaterMethods(product){
        this._calculateProductTotal(product);
        this._updateCartView();
        this._calculateCartTotal();
        this._updateCartTotalAmountView();
    }
    // Publikos metódusok
    displayProductInCart(product){   
        this._checker(product);
        this._increasePieces(product);
        this._updaterMethods(product);
    }
    removeProductFromCart(name){
        const piece = parseInt(this.cart[name][0].piece);
        if(piece > 0){
            this._decreasedPieces(name);
            this._updaterMethods(this.cart[name][0]);
        }
    }
    getProductsInCart(){
        return this.cart;
    }
};