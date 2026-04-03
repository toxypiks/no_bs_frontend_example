import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
  html, body {
      height: 100%;
    }
    .login-container {
      height: 100%;
  }

  .login-card {
      margin-top: 5%;
    }

  .image-container {
      height: 100%;
    }

  .image-container img {
    max-width: 90%;   /* Bild passt sich der Breite an */
    max-height: 90%;  /* Bild passt sich der Höhe an */
    object-fit: contain; /* keine Verzerrung */
    border-radius: 12px; /* optional, für weiche Ecken */
    box-shadow: 0 4px 15px rgba(0,0,0,0.3); /* optional, schöner Effekt */
  }
</style>

<head>
  <link rel="stylesheet" href="bootstrap-4.3.1-dist/css/bootstrap.min.css">
</head>
<div class="container login-container d-flex justify-content-center align-items-center">
  <div class="card login-card p-4 shadow" style="width: 100%; max-width: 320px;">
    <!-- logo -->
    <img src="no_bs_logo.png" alt="logo">
    
    <h3 class="text-center mb-3">Login</h3>
    <form id="loginForm">
      <div class="form-group">
        <label for="username">Benutzername</label>
        <input type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="password">Passwort</label>
        <input type="password" class="form-control" id="password" required>
      </div>
      <button type="submit" id="send_login_data"class="btn btn-primary btn-block">Login</button>
    </form>
    <div class="text-center mt-3">
      <a href="#" class="mr-3">Forgot Password?</a>
      <a href="#">Sign Up</a>
    </div>
  </div>
</div>
`;

/**
 * Class constructor of derived class
 * Let component be a Shadow DOM
 * Initializes token
 */
class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "closed"});
        this.root.appendChild(template.content.cloneNode(true));
        this.global_token = "";
    }

    logEvent(log_msg) {
        this.dispatchEvent(new CustomEvent("log-event",{detail : log_msg} ));
    }

    tokenEvent(token_msg) {
        this.dispatchEvent(new CustomEvent("token-event",{detail : token_msg} ));
    }

    httpPostUserForLogin(){
        let login_form = this.root.querySelector("#login_form");
        let user_name = this.root.querySelector("#username").value;
        // let salt = "salt_secretFAB23F5E3D";
        let password = this.root.querySelector("#password").value;
        console.log('Username:', user_name);
        console.log('Password:', password);

        // let password_hash = forge_sha256(password + salt);
        let password_hash = password;
        if(user_name == "" || password == "") {
            alert("Both fields are required!");
        } else {
            let variable_context = "login_data: ";
            let response_handler = (response_text) => {
                let json_object_data = JSON.parse(response_text);
                this.global_token = json_object_data["token"];
                this.tokenEvent(this.global_token);
            };
            let json_object_data = {
                username : user_name,
                password_hash : password_hash
            };
            httpPostJson("session/login", json_object_data, variable_context, response_handler, null);
        }
    }

    /**
     * Lifecycle hook fires each time the webcomponent is appended into a document-connected element
     * Sets onclick events on buttons and sets methods which are automatically called when component got loaded
     */
    connectedCallback() {
        
        this.root.querySelector("#send_login_data").onclick = (event) => {
            event.preventDefault();
            this.httpPostUserForLogin();
        };
    }
}

customElements.define("login-component", LoginComponent);
