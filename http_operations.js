export function httpGet(endpoint_name, variable_context, response_handler, token) {
    let port = 8000;
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response_handler(this.responseText);
        }
    };
    let endpoint = "http://" + location.hostname + ":" + port + "/" + endpoint_name;
    xmlHttp.open("GET", endpoint, true);
    if (token) {
        xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
    }
    xmlHttp.send(null);
}

export function httpPostJson(endpoint_name, json_object_data, variable_context, response_handler, token) {
    let xmlHttp = new XMLHttpRequest();
    let port = 8000;
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response_handler(this.responseText, this.status);
        }
    };
    let endpoint = "http://" + location.hostname + ":" + port + "/" + endpoint_name;
     xmlHttp.open("POST", endpoint, true);
    if (token) {
        xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
    }
    xmlHttp.setRequestHeader('Content-type', 'application/json');
    xmlHttp.send(JSON.stringify(json_object_data));
}
