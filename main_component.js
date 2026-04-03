import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `<h6>HELLO from main component</h6>`;

class MainComponent extends HTMLElement {
    constructor() {
        super();
        this._token = "";
        this.root = this.attachShadow({mode: "closed"});
        this.root.appendChild(template.content.cloneNode(true));
    }

    logEvent(log_msg) {
        this.dispatchEvent(new CustomEvent("log-event",{detail : log_msg}));
    }

    logoutEvent(token_msg) {
        this.dispatchEvent(new CustomEvent("logout-event",{detail : token_msg}));
    }

    tokenEvent(token_msg) {
        this.dispatchEvent(new CustomEvent("token-event",{detail : token_msg} ));
    }

    /* Attribut Token von außen  machen
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
