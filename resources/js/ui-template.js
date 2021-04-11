
class Template {

    constructor(type) {
        this._type = type;
    }

    createBtn(attribute) {
        let btn = document.createElement("button");
        btn.setAttribute('type', 'button');
        btn.setAttribute("class", attribute.name);
        btn.setAttribute("onclick", attribute.onclick);
        btn.textContent = attribute.content;
        return btn;
    }

    attachBtn(parentElement, childAttribute) {
        if (typeof parentElement === "string") {
            parentElement = document.querySelector(parentElement);
        }
        let childElement = this.createBtn(childAttribute);;
        parentElement.appendChild(childElement);
    }

    createText(attribute) {
        let node = document.createTextNode(attribute.text);
        return node;
    }

    attachText(parentElement, childAttribute) {

        if (typeof parentElement === "string") {
            parentElement = document.querySelector(parentElement);
        }
        let child = this.createText(childAttribute);
        parentElement.appendChild(child);
    }
    clearContent(element) {
        if (typeof element === "string") {
            element = document.querySelector(element);
        }
        element.innerHTML = '';
    }

    createDiv(attribute) {
        let divElem = document.createElement('div');
        divElem.setAttribute('class', attribute.name);
        return divElem;
    }

    attachDiv(parentElement, childAttribute) {
        if (typeof parentElement === "string") {
            parentElement = document.querySelector(parentElement);
        }

        let child = this.createDiv(childAttribute);
        parentElement.appendChild(child);
    }

}