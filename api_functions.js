import {httpPostJson, httpGet} from "./http_operations.js";
import "./main_component.js";
import "./login_component.js"

class NextState {
    constructor(next_state, todo_fct){
        this._next_state = next_state;
        this._todo_fct = todo_fct;
    }
    get next_state() {
        return this._next_state;
    }
    get todo_fct() {
        return this._todo_fct;
    }
}


class State {
    constructor(log_fct){
        this.log_fct = log_fct;
        this._token = "";
        this.current_state = "login_state";
    }

    // all state change functionality should be here
    state_change(next_state_obj){
        this.log_fct("state_change from " + this.current_state + " to " + next_state_obj.next_state);
        if ((this.current_state == "login_state") && (next_state_obj.next_state == "logged_in_state")){
            this.current_state = next_state_obj.next_state;
            next_state_obj.todo_fct(this);

        } else {
            this.current_state = next_state_obj.next_state;
            next_state_obj.todo_fct(this);
        }
    }

    get token() {
        return this._token;
    }
    set token(new_token) {
        this._token = new_token;
    }
}

/**
 * Appends data to HTML Element with Id 'console'
 */
function outputNodeToConsole(node) {
    document.getElementById("console").prepend(node);
    node.scrollIntoView();
}

/**
 * Creates HTML paragraph with text node. Paragraph gets appended to HTML Element with Id 'console'
 */
function outputToConsole(text) {
    let para = document.createElement("p");
    let node = document.createTextNode(text);
    para.appendChild(node);
    document.getElementById("console").prepend(para);
}

/**
 * Creates a HTML table with JSON data and appends it to HTML Element with Id 'console'
 * @param {string} list of strings setting the row headers of table
 * @param {Object} JSON data to display in table
 * @returns {void}
 */
function tableOutputToConsole(json_object_data, row_header) {
    let datensaetze = json_object_data;
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    let tblheader = document.createElement("thead");
    let tblh_tr = document.createElement("tr");

    // build header
    for (let x = 0; x < row_header.length; x++) {
        const row_header_text = document.createTextNode(row_header[x]);
        var tblh_element = document.createElement("th");
        tblh_element.appendChild(row_header_text);
        tblh_tr.appendChild(tblh_element);
    }

    tblheader.appendChild(tblh_tr);
    tbl.appendChild(tblheader);

    // build body
    for(let i = 0; i < datensaetze.length; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < row_header.length; j++) {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(datensaetze[i][row_header[j]] );
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute("border", "2");
    tbl.setAttribute("id","output_table");
    document.getElementById("console").prepend(tbl);
}

/**
 * Clears content of HTML Element with Id 'console'
 */
function clearConsole() {
    document.getElementById("console").innerHTML = "";
}

let state = new State(outputToConsole);

function create_main_component(token)
{
    let login_component_test_tag = document.getElementById("login");
    login_component_test_tag.innerHTML = "";
    
    let main_component_test_tag = document.getElementById("main");
    main_component_test_tag.innerHTML = "";
    
    let main_component_tag = document.createElement("main-component");
    main_component_tag.token = token;
    main_component_tag.addEventListener("logout-event",(event) => {
        let todo_fct = (state) => {
            // TODO create_login_component();
        };
        let next_state = new NextState("logged_out_state", todo_fct);
        state.state_change(next_state);
    });
    main_component_test_tag.append(main_component_tag);
}

function create_login_component() {
    let login_component_test_tag = document.getElementById("login");
    login_component_test_tag.innerHTML = "";

    let login_component_tag = document.createElement("login-component");
    login_component_tag.addEventListener("log-event",(event) => {
            outputToConsole(event.detail);
    });
    login_component_tag.addEventListener("token-event",(token_event) => {
        let todo_fct = (state) => {
            state.token = token_event.detail;

            create_main_component(state.token);
        };
        let next_state = new NextState("logged_in_state", todo_fct);
        state.state_change(next_state);
    });
    login_component_test_tag.append(login_component_tag);
}

outputToConsole("running...");

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

create_login_component();
