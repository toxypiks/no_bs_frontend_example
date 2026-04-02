import {httpPostJson, httpGet} from "./http_operations.js";

const template = document.createElement("template");
template.innerHTML = `
<style>
.login_form {
  flex-flow: row nowrap !important;
}

.form-inline {
  display:flex;
}

.form-inline > .form-group {
  margin-left: 5px;
}

.form-inline > .btn {
  margin-left: 5px;
}

#change_pwd {
  white-space: nowrap;
}
</style>

<head>
  <link rel="stylesheet" href="bootstrap-4.3.1-dist/css/bootstrap.min.css">
</head>
<form class="form-inline login_form" id="login_form">
  <div class="form-group">
    <label class="sr-only" for="email">User Name</label>
    <input type="email" class="form-control" id="user_name" placeholder="Enter email">
  </div>
    <div class="form-group">
      <label class="sr-only" for="pwd">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Enter password">
    </div>
    <button type="submit" class="btn btn-primary" id="send_login_data">Login</button>
    <button type="submit" class="btn btn-link" id="change_pwd">Change Password</button>
</form>
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
    }

    /**
     * Lifecycle hook fires each time the webcomponent is appended into a document-connected element
     * Sets onclick events on buttons and sets methods which are automatically called when component got loaded
     */
    connectedCallback() {
    }
}

customElements.define("login-component", LoginComponent);
