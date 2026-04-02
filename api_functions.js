import {httpPostJson, httpGet} from "./http_operations.js";
import "./main_component.js";
import "./login_component.js"

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

function create_main_component()
{
    let main_component_test_tag = document.getElementById("main");
    main_component_test_tag.innerHTML = "";
    
    let main_component_tag = document.createElement("main-component");
    main_component_test_tag.append(main_component_tag);
}

function create_login_component() {
    let login_component_test_tag = document.getElementById("login");
    login_component_test_tag.innerHTML = "";

    let login_component_tag = document.createElement("login-component");
    login_component_test_tag.append(login_component_tag);
}

outputToConsole("init");

document.getElementById("clear_console").onclick = function() {
    clearConsole();
};

create_login_component();
create_main_component();

outputToConsole("running...");
