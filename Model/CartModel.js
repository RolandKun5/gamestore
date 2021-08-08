class CartModel{
    constructor(){
        this.productsInCart = [];   
        this.totalAmount;
        PubSub.subscribe('addToCart',(product) => this.addProductsToCart(product));
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
        // 1, Növeljük a Cart-ban szereplő Product mennyiséget és ezt átadjuk egy piece változónak
        // 2, Felszorozzuk az alap Product árat a mennyiséggel, ezt átadjuk egy price változónak, majd ezt kerekítjük
        // 3, Átadjuk a piece és price változók értékét a productsInCart tömbben szereplő, aktuálisan megnevezett termék .piece és .price értékének
        const piece = parseInt(this.productsInCart[product.name][0].piece) + 1;
        let price = product.price * piece;           
        price = Helper.numberRounding(price);
        this.productsInCart[product.name][0].piece = piece;
        this.productsInCart[product.name][0].price = price;
        //Frissítjük a CartView-t a CartModel friss adatainak átadásával
        PubSub.publish('updateCart',this.getProductsInCart());
        // Total Amount frissítése
        this.updateTotalAmount();
        PubSub.publish('updateTotalAmount',this.getTotalAmount());
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
            total += this.productsInCart[product][0].price;
        }
        total = Helper.numberRounding(total);
        this.totalAmount = total;
    }
};