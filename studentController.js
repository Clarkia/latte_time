


var ID_SOCKET_PAIR = [];
var mysqlConn;
var socket;

var StudentTools = require("./studentTools");

//**************
// Functions
//**************
exports.call = function(_socket, received, mysqlConnection, _ID_SOCKET_PAIR){
 
    ID_SOCKET_PAIR = _ID_SOCKET_PAIR;
    mysqlConn = mysqlConnection;
    socket = _socket;
    
	console.log("student controller call function");
    
	//MessageNum에 따라서 분기 - 각각의 처리에 맞는 함수 호출
	switch( parseInt(received.MessageNum, 10) ){
	
        case StudentTools.CLIENT_REQUEST_LOGIN:
        clientRequestLogin(received);
			break;
		case 203:
			break;
		case 205:
			break;
		case 207: 
			break;
		case 209:
			break;
		case 211:
			break;
		case 213:
			break;
		case 215:
			break;
		case 217:
			break;
		case 219:
			break;
		case 221:
			break;
		case 223:
			break;
		case 225:
			break;
		case 227:
			break;
		case 229:
			break;
		case 231:
			break;
		case 233:
			break;
		case 235:
			break;
		default:
			break;
	}
	
}


function clientRequestLogin(received){
    
    console.log( "fuction clientRequestLogin " );
    
    var res = StudentTools.newResponse();
    res.MessageNum = StudentTools.SERVER_RESPONSE_LOGIN;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    res.is_success = 0; //is_success 는 로그인을 성공했는가 이다. 
    
    var query = "select studentPw from latte_student where studentId = '"+received.id+"'";
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
         console.log( " rrrr : "+rows[0].studentPw);
         
         if( received.password == rows[0].studentPw){
             
             res.is_success = 1;
         }
    }
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}


