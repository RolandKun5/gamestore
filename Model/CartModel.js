class CartModel{
    constructor(){
        this.productsInCart = [];   
        this.totalAmount;
        PubSub.subscribe('addToCart',(product) => this.addProductsToCart(product));
        PubSub.subscribe('removeProduct',(productName) => this.removeProduct(productName));
    }
    hasProduct(product){
        return this.productsInCart.hasOwnProperty(product.name);
    }
    addProductsToCart(product){   
        // Ha az adott Product még nincs a Cart productsInCart tömbjéhez adva, akkor először hozzáadjuk:
        if(this.hasProduct(product) === false){
            this.productsInCart[product.name] = [];
            product.piece = 0;
            this.productsInCart[product.name].push(product);
        }
        // Növeljük a Cart-ban szereplő Product mennyiséget és ezt átadjuk egy piece változónak
        const piece = parseInt(this.productsInCart[product.name][0].piece) + 1;
        // Felszorozzuk az alap Product árat a mennyiséggel, ezt átadjuk egy price változónak, majd ezt kerekítjük
        let priceTotal = product.price * piece;           
        priceTotal = Helper.numberRounding(priceTotal);
        // Átadjuk a piece és price változók értékét a productsInCart tömbben szereplő, aktuálisan megnevezett termék .piece és .price értékének
        this.productsInCart[product.name][0].piece = piece;
        this.productsInCart[product.name][0].total = priceTotal;
        // Frissítjük a CartView-t a CartModel friss adatainak átadásával
        PubSub.publish('updateCart',this.getProductsInCart());
        // Total Amount frissítése
        this.updateTotalAmount();
        PubSub.publish('updateTotalAmount',this.getTotalAmount());
    }
    removeProduct(name){
        let piece = parseInt(this.productsInCart[name][0].piece);
        if(piece > 0){
            piece -= 1;
            const price = this.productsInCart[name][0].price;   
            let total = price * piece;    
            total = Helper.numberRounding(total);
            this.productsInCart[name][0].piece = piece;
            this.productsInCart[name][0].total = total;
            // Frissítjük a CartView-t a CartModel friss adatainak átadásával
            PubSub.publish('updateCart',this.getProductsInCart());
            // Total Amount frissítése
            this.updateTotalAmount();
            PubSub.publish('updateTotalAmount',this.getTotalAmount());
        }
        if(piece === 0){
            PubSub.publish('removeProductView',name);            
        }
    }
    getProductsInCart(){
        return this.productsInCart;
    }
    getTotalAmount(){
        return this.totalAmount;
    }
    updateTotalAmount(){
        let total = 0;
        for(const product in this.productsInCart){
            total += this.productsInCart[product][0].total;
        }
        total = Helper.numberRounding(total);
        this.totalAmount = total;
    }
};