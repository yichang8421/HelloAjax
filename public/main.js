// console.log('已执行main.js');
getJS.onclick = () => {
    const request = new XMLHttpRequest();

    request.open('GET', '/ajax.js');
    request.onload = () => {
        console.log(`request.response:\n${request.response}`);

        //创建script标签
        const javacript = document.createElement('script');
        //填写script内容
        javacript.innerHTML = request.response;
        //将script标签插入body
        document.body.appendChild(javacript);
    };

    request.onerror = () => {
        console.log('监听style.css失败！');
    };

    request.send();
};


getCSS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/style.css');
    request.onload = () => {
        console.log(`request.response:\n${request.response}`);
        // console.log('成功监听style.css');

        //添加style标签使样式生效
        const style = document.createElement('style');
        style.innerHTML = request.response;
        document.head.appendChild(style);
    };

    request.onerror = () => {
        console.log('监听style.css失败！');
    };

    request.send();
};

getHTML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/ajax.html');
    request.onreadystatechange = () => {
        // console.log(request.readyState);
        if (request.readyState === 4) {
            console.log('页面下载完成（请求是否成功未知）');
            // console.log(request.status);
            if (request.status >= 200 && request.status < 300) {
                //http状态码以2开头表示请求成功
                console.log('请求成功');
                const html = document.createElement('div');
                html.innerHTML = request.response;
                document.body.appendChild(html);

                // } else if (request.status === 404) {
            } else {
                console.log('页面不存在');
            }
        }
    };

    request.send();     //readyState = 2
};

getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/ajax.xml');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // console.log(request.responseXML);
            const dom = request.responseXML;
            const text = dom.getElementsByTagName('warning')[0].textContent
            console.log(text.trim());
        }
    };

    request.send();
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/ajax.json');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // console.log(request.response);
            const object = JSON.parse(request.response);
            //JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。
            myName.textContent = object.name;
            console.log(object);
        }
    };
    request.send();
};

let n = 1;      //初始化页面编号
getNextPage.onclick = () => {
    const request = new XMLHttpRequest();
    if (n > 3) {
        n = 1;
    }
    request.open('GET', `/page${n++}`);

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response);
            array.forEach(e => {
                const li = document.createElement('li');
                li.textContent = e.id;
                pageDB.appendChild(li);
            });
        }
    };
    request.send();
};