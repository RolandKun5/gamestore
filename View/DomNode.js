class DOMNode{
    constructor(htmlCode,className,parentElement){
        this.htmlCode = htmlCode;
        this.className = className;
        this.node = document.createElement('div');
        this.node.innerHTML = this.htmlCode;
        this.node.classList.add(this.className);
        this.parentElement = parentElement;
        this.parentElement.appendChild(this.node);
    };
};

