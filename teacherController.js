

var ID_CONN_PAIR = [];
var mysqlConn;
var socket;

var TeacherTools = require("./teacherTools");


//**************
// Functions
//**************
exports.call = function(_socket, received, _ID_CONN_PAIR, mysqlConnection){
	
    ID_CONN_PAIR = _ID_CONN_PAIR;
    mysqlConn = mysqlConnection;
    socket = _socket;
    
	console.log("teacher controller call message : "+received.MessageNum);	

	//MessageNum에 따라서 분기 - 각각의 처리에 맞는 함수 호출
	switch( parseInt(received.MessageNum, 10) ){
		case TeacherTools.CLIENT_REQUEST_LOGIN :
           clientRequestLogin(received);
			break;
		case 103:
			break;
		case 105:
			break;
		case 107: 
			break;
		case 109:
			break;
		case 111:
			break;
		case 113:
			break;
		case 115:
			break;
		case 117:
			break;
		case 119:
			break;
		case 121:
			break;
		case 123:
			break;
		case 125:
			break;
		case 127:
			break;
		case 129:
			break;
		case 131:
			break;
		case 133:
			break;
		case 135:
			break;
		case 137:
			break;
		case 139:
			break;
		default:
			break;
	}
	
}

function clientRequestLogin(received){
    
    console.log( "fuction clientRequestLogin " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_LOGIN;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    res.is_success = 0; //is_success 는 로그인을 성공했는가 이다. 
    
    var query = "select teacherPw from latte_teacher where teacherId = '"+received.id+"'";
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
   
         console.log( " rrrr : "+rows[0].teacherPw);
         
         if( received.password == rows[0].teacherPw){
             res.is_success = 1;
         }
    }
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}
