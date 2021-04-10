
class Template{

    constructor(type){
        this._type = type;
    }

    createBtn(attribute) {
        let btn=document.createElement("button");
        btn.setAttribute('type','button');
        btn.setAttribute("class",attribute.name);
        btn.setAttribute("onclick", attribute.onclick);
        btn.textContent=attribute.content;
        return btn;
    }

    attachBtn(parentElement,childAttribute){
        if(typeof parentElement === "string"){
            parentElement = document.getElementById(parentElement);
        }
        let childElement = this.createBtn(childAttribute);;
        parentElement.appendChild(childElement);
    }

    createText(attribute){
        let node = document.createTextNode(attribute.text);
        return node;
    }

    attachText(parentElement, childAttribute){
        
        if(typeof parentElement === "string"){
            parentElement = document.getElementById(parentElement);
        }
        let child = this.createText(childAttribute);
        parentElement.appendChild(child);
    }
    clearContent(element){
        if(typeof element === "string"){
            element = document.getElementById(element);
        }
        element.innerHTML='';
    }

}