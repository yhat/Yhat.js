Yhat Javascript Library for Web Sockets
===================

Connect to the yhat API via Web Sockets in Javascript. Easy send and recieve
messages instantaneously.

- ```Yhat.js``` and ```Yhat.min.js``` live in the src directory and the tests are in the spec directory.
- You can view the tests running [here](http://yhat.github.io/yhat-js/).



#### Example
```
var yhat = new Yhat('username', 'apikey');
yhat.init('localhost:5000', function(data){
    // this is the function run when a message comes back
    console.log(data);
});
yhat.send({"beer": "Sierra Nevada Pale Ale"});
```
