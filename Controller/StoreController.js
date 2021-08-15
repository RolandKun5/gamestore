(function(){
    // Store Controller class
    class StoreController{
        constructor(productDatas){
            // Termék adatok
            this.productDatas = productDatas;
            // HTML kódok
            this.cartHTMLCode = `
                <div class="cart-container">
                    <div class="cart-header">
                        <h2 class="cart-title">Cart</h2>
                        <button class="cart-close-btn"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="cart-main">
                    </div>
                    <div class="cart-footer">
                        <p class="total-p">Total:</p>
                        <p class="total-amount">$ 0</p>
                    </div>
                    <button class="cart-purchase-btn">Purchase</button>
                </div>
            `;
            this.productHTMLCode = `
                <div class="product-header"><img class="js-product-image" src="" alt="Product Name"></div>
                <div class="product-info">
                    <h3 class="js-product-name">Product Name</h3>
                    <p class="on-stock">Stock State</p>
                </div>
                <div class="product-footer">
                    <p class="price">$0</p>
                    <button class="btn-to-cart">Add to cart</button>
                </div>
            `;
            this.messageBoxHTMLCode = `
                <div class="message-box">
                    <h3>Added to cart</h3>
                </div>
            `;
            // CSS classok
            this.cartClassName = 'cart-background';
            this.productClassName = 'product-container';
            this.messageBoxClassName = 'message-box-background';
            // HTML elemek a Cart, MessageBox és Product osztály példányosításához
            this.cartShowBtnElement = document.querySelector('.cart-btn');
            this.cartAndMessageBoxContainerElement = document.querySelector('.js-main');
            this.productContainerElement = document.querySelector('.products');
            // Cart osztály példányosítása
            this.CartView = new CartView(this.cartHTMLCode,this.cartClassName,this.cartAndMessageBoxContainerElement,this.cartShowBtnElement);
            this.CartModel = new CartModel();
            // Product osztály példányosítása
            for(let dataPackage in this.productDatas){
                this._initProduct(dataPackage);
            };  
            // MessageBox osztály példányosítása
            this.MessageBoxView = new MessageBoxView(this.messageBoxHTMLCode,this.messageBoxClassName,this.cartAndMessageBoxContainerElement);    
        }
        // Privát metódus
        _initProduct(dataPackage){
            // Product Model példányosítás
            const NewProductModel = new ProductModel(productDatas[dataPackage]);
            // Product Model adatainak kiszedése
            const src = NewProductModel.getImgSrc();
            const name = NewProductModel.getName();
            const stockState = NewProductModel.getStockState();
            const price = NewProductModel.getPrice();
            // Product View példányosítás
            const NewProductView = new ProductView(this.productHTMLCode,this.productClassName,this.productContainerElement);
            NewProductView.setProductImage(src);
            NewProductView.setProductName(name);
            NewProductView.setProductStockState(stockState);
            NewProductView.setProductPrice(price);      
            NewProductView.uploadDataset();
        }
    }
    
    // Termék adatok
    const productDatas = {
        dataPackage1: {
            imgSrc: './images/Spider-Man-Miles-Morales-ps4.jpg',
            name: 'Marvel\'s Spider-Man: Miles Morales - PS4',
            stockState: true,
            price: 49.99,
        },
        dataPackage2: {        
            imgSrc: './images/Marvel-Spider-Man-ps4.jpg',
            name: 'Marvel\'s Spider-Man - PS4',
            stockState: true,
            price: 19.99,
        },
        dataPackage3: {        
            imgSrc: './images/Ghost-of-Tsushima-ps4.jpg',
            name: 'Ghost of Tsushima - PS4',
            stockState: true,
            price: 49.99,
        },
        dataPackage4: {
            imgSrc: './images/Dark-Souls-3-ps4.jpg',
            name: 'Dark Souls 3 - PS4',
            stockState: true,
            price: 19.99,
        },
        dataPackage5: {
            imgSrc: './images/AC-Valhalla-ps4.jpg',
            name: 'Assassin\'s Creed: Valhalla - PS4',
            stockState: true,
            price: 59.99,
        },
        dataPackage6: {
            imgSrc: './images/Bloodborne-ps4.jpg',
            name: 'Bloodborne - PS4',
            stockState: true,
            price: 9.99,
        },
        dataPackage7: {
            imgSrc: './images/Watch-Dogs-Legion-ps4.jpg',
            name: 'Watch Dogs Legion - PS4',
            stockState: true,
            price: 49.99,
        },
    };
    
    const OpenWorldGameStore = new StoreController(productDatas);
})();