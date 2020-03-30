var http = require("http");
var url = require("url")

http.createServer(function (req, res) {
    var pathName = url.parse(req.url).pathname;    
    var params = url.parse(req.url, true).query;
}).listen(12300);
