var express = require('express')
  , http = require('http');
var app = express();
var path = require('path');

var util = require("util");
var url = require("url");
var fs = require("fs");

var mysql = require('mysql');


var server = http.createServer(app);
var io = require('socket.io').listen(server);


var webpage_controller = require("./webpageController");
var teacher_controller = require("./teacherController");
var student_controller = require("./studentController");

server.listen(9999);
//server.listen(process.env.PORT);


    
var mysqlConfig = {
    host : "lattetime.cafe24.com",
    port : "3306",
    user : "root",
    password : "latte!123",
    database : "lattetime",
    insecureAuth: true
}

var conn = mysql.createConnection(mysqlConfig);

conn.connect();


////////////////////////웹 서버 부분//////////

//파일 리다이렉트, 페이지 보여주기 등
app.get('/', function(req, res) {
    console.log("===============================================");
    res.sendfile(__dirname + '/index.html');
});

app.get('/teacher', function(req, res) {
    console.log("===============================================");
    res.sendfile(__dirname + '/teacher.html');
});

app.get('/student', function(req, res) {
    console.log("===============================================");
    res.sendfile(__dirname + '/student.html');
});



//url 들어오면 파일 주는 부분
app.use(function(request, response, next){
    var uri = url.parse(request.url).pathname;
    console.log("uri : "+uri);
        var filename = path.join(process.cwd(), uri);
        util.puts("filename : " + filename);
        fs.exists(filename, function(exists){
                if(!exists){
                        response.writeHead(404,{"Content-type":"text/plain"} );
                        response.end("404 Not Found\n");
                        return;
                }

                fs.readFile(filename, function(err, data){
                        if(err){
                                console.log("error!!!");
                                response.writeHead(500, {"Content-type":"text/plain"});
                                response.end(err + "\n");
                                return;
                        }
                        response.statusCode = 200;
                      //  response.write(data, "binary");
                        response.end(data, "binary");
                });
        });
});

//////////////////////////////////////



////////////////////////////////////////////////////////////웹소켓 시작



//**************
//리스닝
//**************
var ID_CONN_PAIR = [];

console.log("Listening....");
console.log("ip : " + process.env.IP + ", port : " + process.env.PORT);



io.sockets.on('connection', function (socket) {

console.log("User connected");

 
 socket.on('close', function(data){
      console.log("close connection");
 });
 
socket.on('data', function( data) {
    
 console.log("data received");
    
    var received; //받은 데이터

    //JSON이용해서 Message Parse
	received = data;
 

    //메세지에 따라 처리
		switch(parseInt(received.MessageNum / 100, 10)){
			case 1:
				console.log("Messeage num 100 ~ 199 : Teacher Mobile");
                teacher_controller.call(socket, received, ID_CONN_PAIR, conn);
				break;
			case 2:
				console.log("Messeage num 200 ~ 299 : Student Mobile");
			student_controller.call(socket, received, ID_CONN_PAIR, conn);
				break;
			case 3:
                console.log("Messeage num 300 ~ 399 : Web page");
                webpage_controller.call(socket, received, ID_CONN_PAIR, conn);
				break;
			default: //에러 
				;
		}
		
	//결과는 마이에스큐엘까지 끝난 다음 반환한다. 
  
});


});



