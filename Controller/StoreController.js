(function(){
    // Store Controller class
    class StoreController{
        constructor(productDatas){
            // Termék adatok
            this.productDatas = productDatas;
            // HTML kód sablonok
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
            // Cart elemek
            this.cartShowBtnElement = document.querySelector('.cart-btn');
            this.cartAndMessageBoxContainerElement = document.querySelector('.js-main');
            // Product elem
            this.productContainerElement = document.querySelector('.products');
            // Cart inicializálás
            this.CartUI = new CartView(this.cartHTMLCode,this.cartClassName,this.cartAndMessageBoxContainerElement,this.cartShowBtnElement);
            this.CartUI.setUp(this.CartUI.getNode());
            this.Cart = new CartModel();
            // Product inicializálás
            for(let dataPackage in this.productDatas){
                this.initProduct(dataPackage);
            };  
            // MessageBox inicializálás
            this.MessageBoxView = new MessageBoxView(this.messageBoxHTMLCode,this.messageBoxClassName,this.cartAndMessageBoxContainerElement);    
            this.MessageBoxView.setUp(this.MessageBoxView.getNode());
        }
        // Privát product inicializáló metódus
        initProduct(dataPackage){
            const NewProduct = new ProductModel(productDatas[dataPackage]);
            const src = NewProduct.getImgSrc();
            const name = NewProduct.getName();
            const stockState = NewProduct.getStockState();
            const price = NewProduct.getPrice();
            const NewProductUI = new ProductView(this.productHTMLCode,this.productClassName,this.productContainerElement);
            const node = NewProductUI.getNode();
            NewProductUI.setUp(node);
            NewProductUI.setProductImage(src);
            NewProductUI.setProductName(name);
            NewProductUI.setProductStockState(stockState);
            NewProductUI.setProductPrice(price);        
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
    };
    
    const OpenWorldGameStore = new StoreController(productDatas);
})();