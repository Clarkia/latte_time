//**************
// Data types
//**************
function Response(){ //결과값
    var MessageNum;
	var id;
	var success;
}




var ID_CONN_PAIR = [];
var mysqlConn;
var socket;


var WebpageTools = require("./webpageTools");

//**************
// Functions
//**************
exports.call = function(_socket, received, _ID_CONN_PAIR, mysqlConnection){
	
    ID_CONN_PAIR = _ID_CONN_PAIR;
    mysqlConn = mysqlConnection;
    socket = _socket;
    
    
	console.log("web page controller call function");


	//MessageNum에 따라서 분기 - 각각의 처리에 맞는 함수 호출
	    switch( parseInt(received.MessageNum, 10) ){
		case WebpageTools.CLIENT_REQUEST_LOGIN:
        clientRequestLogin(received);
			break;
		case 303:
			break;
		case 305:
			break;
		case 307: 
			break;
		case 311:
			break;
		case 313:
			break;
		case 315:
			break;
		case 317:
			break;
		case 319:
			break;
		case 321:
			break;
		default:
			break;
	}

}



function clientRequestLogin(received){
    
    console.log( "fuction clientRequestLogin " );
    
    var res = WebpageTools.newResponse();
    res.MessageNum = WebpageTools.SERVER_RESPONSE_LOGIN;
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
