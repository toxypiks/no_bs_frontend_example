import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `

<style>

.main {
    display: grid;
    place-items: center;  /* horizontal + vertikal zentrieren */
    margin-top: 10%;
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
  <button id= "logout_btn" class="btn btn-comic">Logout</button>
</div>
`;

class LogoutComponent extends HTMLElement {
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

    httpGetLogout() {
        let variable_context = "logout_data: ";
        let response_handler = (response_text) => {
            let json_object_data = JSON.parse(response_text);
        };
        httpGet("session_logout/logout", variable_context, response_handler, this._token);
    }

    connectedCallback() {
        let logout_button = this.root.querySelector("#logout_btn");
        logout_button.onclick = () => {
            this.httpGetLogout();
            this.logoutEvent("user logged out");
        };
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

customElements.define("logout-component", LogoutComponent);
