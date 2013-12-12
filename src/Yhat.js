function Yhat(username, apikey) {
    this.username = username;
    this.apikey = apikey;
    this.ws;
    this.is_open = false;
}

Yhat.prototype.init = function(url, callback) {
    this.ws = new WebSocket("ws://"+url);
    this.ws.onmessage = function(evt) {
        var data = evt.data;
        checkErrors(data);
        if (callback){
            callback(data);
        }
    };
    this.ws.onopen = function(evt) {
        this.send(JSON.stringify({ username: this.username, apikey: this.apikey }));
    };
};

function checkErrors(msg){
    var msg = JSON.parse(msg);
    if (msg.error && msg.message){
        //No user was found with the username given.
        //The domain from which you are requesting access is not authorized by the username you provided.
        //The API Key passed for the username is incorrect.
        throw new Error(msg.message);
    }
    return true;
}

function authenticate(){
    this.is_open = true;
    this.ws.send(JSON.stringify({ username: this.username, apikey: this.apikey }));
}

Yhat.prototype.send = function(object) {
    if (this.is_open){
        this.ws.send(JSON.stringify(object));
    }
    
    try {
        this.ws.send(JSON.stringify(object));
        this.is_open = true;
    } catch (e) {
        this.is_open = false;
        throw new Error(e);
    }
};

Yhat.prototype.close = function() {
    this.ws.close();
};
