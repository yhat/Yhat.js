Yhat.js
===================

Connect to the yhat API via Web Sockets in Javascript. Easily send and recieve
json objects instantaneously.

- ```Yhat.js``` and ```Yhat.min.js``` live in the src directory and the tests are in the spec directory.


#### Example
```
var yhat = new Yhat('username', 'apikey');
yhat.init('localhost:5000', function(data){
    // this is the function run when a message comes back
    console.log(data);
    document.getElementById('stuff').innerHTML = JSON.stringify(JSON.parse(data), null, 2);
});
yhat.send({"beer": "Sierra Nevada Pale Ale"});
```

#### Methods

- **Get Started**
    Create a yhat instance with your *username* and *apikey* 
    
    ```
    var yhat = new Yhat('username', 'apikey');
    ```

- **Initialization**
    The ```yhat.init``` function takes a url and an *optional* callback
    funtion. The callback function passes the variable ```data``` which is the
    JSON object passed back through the yhat API. For example:

    ```
    yhat.init('localhost:5000', function(data){
        // this is the function run when a message comes back
        console.log(data);
        document.getElementById('stuff').innerHTML = JSON.stringify(JSON.parse(data), null, 2);
    });
    ```

- **Send**
    The send function, sends a json object via websockets, to the yhat API. 

    ```
    yhat.send({"beer": "Sierra Nevada Pale Ale"});
    ```

- **Close**
    The close function, closes the socket.

    ```
    yhat.close;
    ```



