class CartModel{
    constructor(){
        this.productsInCart = [];   
        PubSub.subscribe('addToCart',(product) => this.addProductsToCart(product));
    }
    hasProduct(product){
        return this.productsInCart.hasOwnProperty(product.name);
    }
    addProductsToCart(product){   
        if(this.hasProduct(product) === false){
            this.productsInCart[product.name] = [];
            product.piece = 1;
            this.productsInCart[product.name].push(product);
        }else if(this.hasProduct(product) === true){
            let piece = parseInt(this.productsInCart[product.name][0].piece) + 1;
            let price = product.price * piece;           
            price = Math.round(price * 100) / 100;
            this.productsInCart[product.name][0].piece = piece;
            this.productsInCart[product.name][0].price = price;
        }
        PubSub.publish('updateCart',this.getProductsInCart());
    }
    getProductsInCart(){
        return this.productsInCart;
    }
};