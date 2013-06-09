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


var TeacherTools = require("./teacherTools");


//server.listen(7777);
server.listen(8888);
//server.listen(9999);
//server.listen(process.env.PORT);


////////상수///////

var ID_SOC_PAIR = [];
var classState = TeacherTools.newClassState();
var pptShare = TeacherTools.newPPTShare();
var groupShare = TeacherTools.newGroupShare();    
    
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

app.get('/nathan', function(req, res) {
    console.log("===============================================");
    res.sendfile(__dirname + '/nathan.html');
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

console.log("groupShare : %j" , groupShare );

    //메세지에 따라 처리
		switch(parseInt(received.MessageNum / 100, 10)){
			case 1:
				console.log("Messeage num 100 ~ 199 : Teacher Mobile");
                   //커넥션을 배열로 유지
               connectionRetreive(received.id, socket, TeacherTools.MOBILE, TeacherTools.TEACHER );
                teacher_controller.call(socket, received,  conn,  ID_SOC_PAIR, classState, pptShare, groupShare);
				break;
			case 2:
				console.log("Messeage num 200 ~ 299 : Student Mobile");
                   //커넥션을 배열로 유지
             connectionRetreive(received.id, socket, TeacherTools.MOBILE, TeacherTools.STUDENT );
                student_controller.call(socket, received,  conn, ID_SOC_PAIR, classState, groupShare);
				break;
			case 3:
                console.log("Messeage num 300 ~ 399 : Web page");
                   //커넥션을 배열로 유지
             connectionRetreive(received.id, socket, TeacherTools.WEBPAGE, TeacherTools.TEACHER );
                webpage_controller.call(socket, received,  conn, ID_SOC_PAIR);
				break;
				
			case 4:
                console.log("Messeage num 400 ~ 499 : Sharing");
                teacher_controller.call(socket, received,  conn,  ID_SOC_PAIR, classState, pptShare, groupShare);
				break;

			default: //에러 
				;
		}
		
	//결과는 마이에스큐엘까지 끝난 다음 반환한다. 
  
});


});

function connectionRetreive(id, socket, deviceType, manType){
    
     var tempIdConn
     
     //이미 커넥션이 들어가 있는 경우 빼버린다. 
     
     //새로 갱신해서 넣는다. 
     
     var i;
     
     for( i=0 ; i< ID_SOC_PAIR.length ; i++ ) {
        if( ID_SOC_PAIR[i].deviceType == deviceType ){
            if( ID_SOC_PAIR[i].manType == manType) {
                if( ID_SOC_PAIR[i].id == id ) {
                    ID_SOC_PAIR.splice(i, 1);
                }
            }
        } 
     }
     
       tempIdConn =   TeacherTools.newIdSocekt();
       tempIdConn.id = id;
       tempIdConn.socket = socket;
             tempIdConn.deviceType = deviceType;
             tempIdConn.manType = manType;
             ID_SOC_PAIR.push(tempIdConn);
    
    for( i=0 ; i< ID_SOC_PAIR.length ; i++ ) {
        console.log("i : " + i);
        console.log("ID_SOC_PAIR[i].deviceType : " + ID_SOC_PAIR[i].deviceType );
        console.log("ID_SOC_PAIR[i].manType : " + ID_SOC_PAIR[i].manType );
        console.log("ID_SOC_PAIR[i].].id : " + ID_SOC_PAIR[i].id );
    }
}

