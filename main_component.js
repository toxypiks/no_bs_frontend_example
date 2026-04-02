import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `<h6>HELLO from main component</h6>`;

class MainComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "closed"});
        this.root.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("main-component", MainComponent);
