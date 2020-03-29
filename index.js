var http = require("http");
var url = require("url");
var fs = require("fs");
var globalConfig = require("./config");
var loader = require("./loader");
var log = require("./log");


http.createServer(function (request, response) {
    var pathName = url.parse(request.url).pathname;
    // console.log(pathName);
    var params = url.parse(request.url, true).query;
    // console.log(params);
    log(pathName);
    var isStatic = isStaticsRequest(pathName);
    console.log(isStatic);
    if (isStatic) { //请求静态文件
        try {
            console.log(globalConfig["page_path"] + pathName);
            var data = fs.readFileSync(globalConfig["page_path"] + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();

        } catch (e) {
            response.writeHead(404);
            response.write("<html><body><h1>404 Not Found</h1></body></html>")
            response.end();
        }
    } else { //请求动态文件
        console.log(pathName);
        if (loader.get(pathName) != null) {
            try {
                loader.get(pathName)(request, response);
            } catch (e) {
                //当程序出错时
                response.writeHead(500);
                response.write("<html><body><h1>500 Bad server</h1></body></html>")
            }
        } else {
            response.writeHead(404);
            response.write("<html><body><h1>404 NotFound</h1></body></html>")
            response.end();
        }

    }
    response.end();

}).listen(globalConfig.port);
console.log("服务已启动")
function isStaticsRequest(pathName) {
    var temp = globalConfig.static_file_type;
    for (var i = 0; i < temp.length; i++) {
        var files = temp[i];
        if (pathName.indexOf(files) == pathName.length - files.length) {
            return true;
        }
    }
    return false;
}