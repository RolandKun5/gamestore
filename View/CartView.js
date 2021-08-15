class CartView extends DOMNode{
    constructor(htmlCode,className,parentElement,cartShowBtn){
        super(htmlCode,className,parentElement);
        // Szelektorok
        this.cartCloseBtnSelector = '.cart-close-btn';
        this.cartMainSelector = '.cart-main';
        this.cartTotalAmountSelector = '.total-amount';
        // HTML elemek
        this.cartShowBtnElement = cartShowBtn;
        this.cartCloseBtnElement = this.node.querySelector(this.cartCloseBtnSelector);
        this.cartMainElement = this.node.querySelector(this.cartMainSelector);
        this.cartTotalAmountElement = this.node.querySelector(this.cartTotalAmountSelector);
        // Eseménykezelők hozzáadása
        this.cartShowBtnElement.addEventListener('click',this.showCart.bind(this));
        this.cartCloseBtnElement.addEventListener('click',this.closeCart.bind(this));
        // Cart és a TotalAmount frissítésének feliratkozása
        PubSub.subscribe('updateCart',(productsInCart) => this.updateCart(productsInCart));
        PubSub.subscribe('updateTotalAmount',(totalAmount) => this.updateTotalAmount(totalAmount));
    }    
    // Privát metódusok
    _addCSSClass(){
        this.node.classList.add('cart-show');
    }
    _removeCSSClass(){
        this.node.classList.remove('cart-show');        
    }
    _setBodyOverflowToHidden(){
        this.node.parentElement.parentElement.style.overflow = 'hidden';
    }
    _setBodyOverflowToAuto(){
        this.node.parentElement.parentElement.style.overflow = 'auto';        
    }
    _eraseElementContent(element){
        element.innerHTML = '';
    }
    _uploadCart(productsInCart){
        for(let product in productsInCart){
            productsInCart[product].forEach((data)=>{
                if(data.piece > 0){
                    const HTMLCode =  `                
                    <img class="cart-product-img" src="${data.src}" alt="${data.name}">
                    <p class="cart-product-title">${data.name}</p>
                    <p class="cart-product-pc">${data.piece} pc</p>
                    <p class="cart-product-price">${"$" + data.total}</p>
                    <button class="cart-product-remove"><i class="fas fa-times"></i></button>                
                    `;
                    const className = 'product-in-cart';
                    const ProductInCart = new ProductInCartView(HTMLCode,className,this.cartMainElement);
                }
            })
        }   
    }
    // Publikus metódusok
    updateTotalAmount(totalAmount){
        this.cartTotalAmountElement.textContent = '$' + totalAmount;
    }
    showCart(){
        this._addCSSClass();
        this._setBodyOverflowToHidden();
    }
    closeCart(){
        this._removeCSSClass();
        this._setBodyOverflowToAuto();
    }
    updateCart(productsInCart){
        this._eraseElementContent(this.cartMainElement);
        this._uploadCart(productsInCart);
    }
};