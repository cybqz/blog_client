export default class Socket {
    websock = null;
    urlSite = "ws://127.0.0.1:9090/blog/talkService";
    urlTalk = "ws://127.0.0.1:9090/blog/siteService";
    global_callback = null;
    initWebSocket(wsuri){ //初始化weosocket
        //ws地址
        console.log("websocket connect to "+wsuri);
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = function(e){
            websocketOnmessage(e);
        };
        this.websock.onclose = function(e){
            console.log("connection closed (" + e.code + ")");
        };
        this.websock.onopen = function (e) {
            console.log("连接成功");
        };
        //连接发生错误的回调方法
        this.websock.onerror = function () {
            console.log("WebSocket连接发生错误");
        };
    };
    
    // 实际调用的方法
    sendSocket(agentData,callback){  
        global_callback = callback;
        if (this.websock.readyState === this.websock.OPEN) {
            //若是ws开启状态
            websocketsend(agentData)
        }else if (this.websock.readyState === this.websock.CONNECTING) {
            // 若是 正在开启状态，则等待1s后重新调用
            setTimeout(function () {
                sendSocket(agentData,callback);
            }, 1000);
        }else {
            // 若未开启 ，则等待1s后重新调用
            setTimeout(function () {
                sendSocket(agentData,callback);
            }, 1000);
        }
    };
    
    //数据接收
    websocketOnmessage(e){
        global_callback(JSON.parse(e.data));
    };
    
    //数据发送
    websocketSend(agentData){
        this.websock.send(JSON.stringify(agentData));
    };
}