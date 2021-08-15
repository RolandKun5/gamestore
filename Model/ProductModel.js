class ProductModel{
    constructor(productInfo){
        this.imgSrc = productInfo.imgSrc;
        this.name = productInfo.name;
        this.onStock = productInfo.stockState ? 'On Stock' : 'Sold Out';
        this.price = productInfo.price;
    }
    getImgSrc(){
        return this.imgSrc;
    }
    getName(){
        return this.name;
    }
    getStockState(){
        return this.onStock;
    }
    getPrice(){
        return this.price;
    }
};