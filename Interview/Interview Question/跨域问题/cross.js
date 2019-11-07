const http = require('http');
// 跨域和前台代码是没关系的，ajax为什么不能跨域
// SOP 请求的资源应该在同一个域名下，如果不是，浏览器就会禁止掉
// 服务期声明请求

let allowOrigin = {
    "http://localhost": true,
    "null": true
}
http.createServer((req, res) => {
    // console.log(req.headers);
    console.log(req.method);
    // req: 前端的请求的原网址, headers, 前发过来的请求头
    let { origin } = req.headers;
    if (allowOrigin[origin]) {
        // 发送响应（response）的时候，要声明（响应头），header还给浏览器让浏览器知道这是同一个域名下的，浏览器就不会阻止文件了
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.write('{ "a": 12, "b": 22 }');
    res.end();
}).listen(8080);