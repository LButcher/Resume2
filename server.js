var express = require("express");
const path = require('path');
var app = express();


//app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'public')));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
    });

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
