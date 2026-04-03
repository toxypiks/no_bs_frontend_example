import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    .main {
      display: grid;
      place-items: center;  /* horizontal + vertikal zentrieren */
      height: 100vh;        /* Viewport-Höhe */
      width: 100vw;         /* volle Breite */
      background-color: #f0f0f0;
      margin: 0;
    }

    .main img {
      max-width: 80%;
      height: auto;
    }

    /* Comic-artiger Button, kleiner */
    .btn-comic {
      background-color: #ff69b4;       /* Hot Pink */
      border: 3px solid #ff1493;       /* dunklere Umrandung */
      color: white;
      font-size: 1.2rem;               /* kleiner als vorher */
      font-weight: bold;
      padding: 0.75rem 2rem;           /* kleinerer Klickbereich */
      border-radius: 50px;             /* rund */
      box-shadow: 0 4px 12px rgba(0,0,0,0.25); /* leichter Schatten */
      text-transform: uppercase;       /* Comic-Style */
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-comic:hover {
      background-color: #ff85c1;
      border-color: #ff69b4;
      transform: scale(1.05);     /* kleiner Pop-Effekt */
      box-shadow: 0 6px 16px rgba(0,0,0,0.35);
    }
  </style>

  <div class="main">
    <img src="you_did_it.gif?v=123" alt="gif"/>
    <button class="btn btn-comic">Logout</button>
  </div>
`;

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
