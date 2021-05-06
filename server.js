var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
let n = 1;

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有人发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    console.log('method: ' + method) //GET或POST
    console.log('request.headers:')
    console.log(request.headers)

    if (path === '/index.html') {
        // console.log("有人访问/了")
        response.statusCode = 200           //设置状态码
        response.setHeader('Content-Type', 'text/html;charset=utf-8')       //设置响应头，编码格式
        var accept = request.headers["accept"]
        console.log("accept:")
        console.log(accept);
        let string = fs.readFileSync('public/index.html').toString();

        const page1 = fs.readFileSync('db/page1.json');
        const array = JSON.parse(page1);

        const result = array.map(item => `<li>${item.id}</li>`).join('');

        string = string.replace('{{page1}}', `<ul id="pageDB">${result}</ul>`);

        response.write(string);   //设置响应体
        response.end()          //结束响应
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'));
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/ajax.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/ajax.js'));
        response.end()
    } else if (path === '/ajax.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/ajax.html'));
        response.end()
    } else if (path === '/ajax.xml') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/ajax.xml'));
        response.end()
    } else if (path === '/ajax.json') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(fs.readFileSync('public/ajax.json'));
        response.end()
    } else if (path === `/page${n++}`) {
        if (n > 3) {
            n = 1;
            // response.end();
        }
        response.statusCode = 200
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(fs.readFileSync(`db/page${n}.json`));
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你访问的页面不存在\n`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)