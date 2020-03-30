var net = require("net");
var fs = require("fs");
//加载配置文件
var globalConf = require("./config");

var server = net.createServer();
server.listen(globalConf.port, "127.0.0.1");
server.on("listening", function (){
    console.log("服务已启动")
})
server.on("connection", function (socket) {
    console.log('有新的连接');
    socket.on("data", function (data) {
        var request = data.toString().split("\r\n");
        var url = request[0].split(" ")[1];
        try {
            var dataFile = fs.readFileSync(globalConf.basePath + url);
            console.log(data.toString());
            socket.write("HTTP/1.1 200OK\r\n\r\n");
            socket.write(dataFile);
        } catch (e) {
            socket.write("HTTP/1.1 404NotFound\r\n\r\n<html><body><h1>404 Not Found</h1></body></html>");

        }
        socket.end();

    })
});

