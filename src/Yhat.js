function Yhat(username, apikey) {
    this.username = username;
    this.apikey = apikey;
    this.ws;
}

Yhat.prototype.init = function(url, callback = function(data){}) {
    this.ws = new WebSocket("ws://"+url);
    this.ws.onmessage = function(evt) {
        var data = evt.data;
        checkErrors(data);
        callback(data);
    }
    this.ws.send(JSON.stringify({ username: this.username, apikey: this.apikey }));
};

function checkErrors(msg){
    if (msg.error && msg.message){
        //No user was found with the username given.
        //The domain from which you are requesting access is not authorized by the username you provided.
        //The API Key passed for the username is incorrect.
        throw new Error(msg.message);
        return true;
    }
    return false;
}

Yhat.prototype.send = function(object) {
    this.ws.send(JSON.stringify(object));
};
