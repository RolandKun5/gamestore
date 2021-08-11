class CartView extends DOMNode{
    constructor(template,className,containerElement,cartShowBtn){
        super(template,className,containerElement);
        // DOM csomópont
        this.node;
        // Szelektorok
        this.cartCloseBtnSelector = '.cart-close-btn';
        this.cartMainSelector = '.cart-main';
        this.cartTotalAmountSelector = '.total-amount';
        // HTML elemek
        this.cartShowBtnElement = cartShowBtn;
        this.cartCloseBtnElement;
        this.cartMainElement;
        this.cartTotalAmountElement;
        // Eseménykezelő hozzáadás
        this.cartShowBtnElement.addEventListener('click',this.showCart.bind(this));
        // Cart és a TotalAmount frissítésének feliratkozása
        PubSub.subscribe('updateCart',(productsInCart) => this.updateCart(productsInCart));
        PubSub.subscribe('updateTotalAmount',(totalAmount) => this.setTotalAmount(totalAmount));
        // ProductView törlésének feliratkozása
        PubSub.subscribe('removeProductView',(name) => this.removeProductView(name));
    }        
    setUp(node){
        // DOM csomópont megadása
        this.node = node;
        // HTML elemek kiszelektálása
        this.cartCloseBtnElement = this.node.querySelector(this.cartCloseBtnSelector);
        this.cartMainElement = this.node.querySelector(this.cartMainSelector);
        this.cartTotalAmountElement = this.node.querySelector(this.cartTotalAmountSelector);
        // Eseménykezelő hozzáadása
        this.cartCloseBtnElement.addEventListener('click',this.closeCart.bind(this));
    }   
    setTotalAmount(totalAmount){
        this.cartTotalAmountElement.textContent = '$' + totalAmount;
    }
    showCart(){
        this.node.classList.add('cart-show');
    }
    closeCart(){
        this.node.classList.remove('cart-show');
    }
    updateCart(productsInCart){
        this.cartMainElement.innerHTML = '';
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
                    ProductInCart.setUp(ProductInCart.getNode());
                }
            })
        }     
    }
    removeProductView(name){
        for (let i = 0; i < this.cartMainElement.children.length; i++) {
            if(name === this.cartMainElement.children[i].firstChild.nextSibling.nextSibling.nextSibling.textContent){
                const childElement = this.cartMainElement.children[i];
                this.cartMainElement.removeChild(childElement);
            }            
        }
    }
};