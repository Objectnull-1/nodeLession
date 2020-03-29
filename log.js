var fs = require("fs");
var globalConfig = require("./config");

var fileName = globalConfig.log_path + globalConfig.log_name;
// //异步方法
// fs.writeFile(fileName, "asd", function () {});

// //同步
// fs.writeFileSync(fileName, "asd");

function log(data) {
    console.log(data);
    fs.writeFile(fileName, data + "\n", {flag:"a"}, function () {
        console.log("finish")
    });
}

module.exports = log;