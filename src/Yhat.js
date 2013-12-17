function Yhat(username, apikey) {
    this.username = username;
    this.apikey = apikey;
    this.ws;
}

Yhat.prototype.init = function(url, callback) {
    window.y_username = this.username;
    window.y_apikey = this.apikey;

    this.ws = new WebSocket("ws://"+url);
    this.ws.onmessage = function(evt) {
        var data = evt.data;
        checkErrors(data);
        if (callback){
            callback(data);
        }
    };
    this.ws.onopen = function(evt) {
        this.send(JSON.stringify({ username: window.y_username, apikey: window.y_apikey }));
        console.log(this.readyState);
    };
};

function checkErrors(msg){
    var msg = JSON.parse(msg);
    if (msg.error && msg.message){
        // No user was found with the username given.
        // The domain from which you are requesting access is not authorized by the username you provided.
        // The API Key passed for the username is incorrect.
        throw new Error(msg.message);
    }
    return true;
}

Yhat.prototype.send = function(object) {
    var websocket = this.ws;
    if(websocket.readyState){
        websocket.send(JSON.stringify(object));
    } else {
        setTimeout(function(){
            websocket.send(JSON.stringify(object));
        }, 1000);
    }
};

Yhat.prototype.close = function() {
    this.ws.close();
};


