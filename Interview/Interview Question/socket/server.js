/* 1. socket.io 的库 */
const http = require('http');
const io = require('socket.io');

/* let server = http.createServer((req, res) => { });
server.listen(8080);


// 建立ws, 监视server
let wsServer = io.listen(server);

// 完成链接,返回sock发送数据
wsServer.on('connection', sock => {

    sock.on("AAA", function (result) {
        console.log(result);
    })
    setInterval(function () {
        sock.emit('timer', new Date().getTime());
    });
    sock.emit("name", data)
    sock.on('name',function(){ // handle coming in data});
})
 */

/* 2. 原生的 */
// net就是tcpip，帮助创建原始的服务器，缺点是什么都要自己来
const net = require('net');
const crypto = require('crypto');
// 处理header
function parseHeader(str) {
    let arr = str.split("\r\n").filter(line => line);
    arr.shift();
    let headers = {};
    arr.forEach(line => {
        let [name, value] = line.split(':');
        name = name.replace(/^\s+|\s+$/g, '').toLowerCase();
        value = value.replace(/^\s+|\s+$/g, '');
        headers[name] = value;
    });
    return headers;
}

let server = net.createServer(sock => {
    console.log('Some one is coming');
    // 处理握手 request connect -> ok -> formal request
    // 协议升级（protocal upgrade）
    // 1. 第一次握手
    sock.once('data', buffer => {
        // Get the header information
        let str = buffer.toString();
        let header = parseHeader(str);
        console.log(header);
        // 判断协议是否升级
        if (header['upgrade'] !== 'websocket') {
            console.log("no upgrade");
            sock.end();
        } else if (header['sec-websocket-version'] !== '13') {
            console.log("no upgrade");
            sock.end();
        } else {
            // sec-key ==> from header && uuid ==> websocket mask这个是固定的 ==> result => base64(sha1(key+uuid))
            let key = header['sec-websocket-key'];
            let uuid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
            let hash = crypto.createHash('sha1');
            hash.update(key + uuid);
            let key2 = hash.digest('base64');
            // 2.第二步握手 (协议切换（switch protocols)101)
            sock.write(`HTTP/1.1 101 Switch Protocols\r\nUpgrade:websocket\r\nConnection:upgrade\r\nSec-Websocket-Accept:${key2}\r\n\r\n`);
        }
    });

    sock.on("end", function (event) {
        console.log('Connection is over');
    });
});

server.listen(8080);