import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    
    .img {
      max-width: 100%;
      height: auto;
    }
  </style>

  <img src="you_did_it.gif?v=123" alt="gif"/>
`;

class MainComponent extends HTMLElement {
    constructor() {
        super();
        this._token = "";
        this.root = this.attachShadow({mode: "closed"});
        this.root.appendChild(template.content.cloneNode(true));
    }

    /* Attribut Token von außen machen
       kann so in WebComponent reingereicht werden */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "token"){
            if (oldValue !== newValue) {
                this._token = newValue;
            }
        }
    }
    /* getter setter */
    get token() {
        return this.getAttribute("token");
    }
    set token(val) {
        this.setAttribute("token", val);
        this._token = val;
    }
}

customElements.define("main-component", MainComponent);
