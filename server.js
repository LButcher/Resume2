var express = require("express");
const path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(function(request, response) {
    if (request.protocol === "http" && request.headers.host !== 'localhost:3000') {
        response.redirect("https://" + request.headers.host + request.url);
    } else {
        
    }
});
*/
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});