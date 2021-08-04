class DOMNodeView{
    constructor(template,className,containerElement){
        this.frame = template;
        this.className = className;
        this.frameContainer = document.createElement('div');
        this.frameContainer.innerHTML = this.frame;
        this.frameContainer.classList.add(this.className);
        this.containerElement = containerElement;
        this.containerElement.appendChild(this.frameContainer);
    };
    getNode(){
        return this.frameContainer;
    };
};

