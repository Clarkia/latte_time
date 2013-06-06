


var ID_SOCKET_PAIR = [];


var ATTEND_INFO = [];

var mysqlConn;
var socket;

var TeacherTools = require("./teacherTools");


//**************
// Functions
//**************

exports.call = function(_socket, received, mysqlConnection, _ID_SOCKET_PAIR){
	 
    ID_SOCKET_PAIR = _ID_SOCKET_PAIR; 
    mysqlConn = mysqlConnection;
    socket = _socket;
    
	console.log("teacher controller call message : ");
    console.log("MessageNum : "+received.MessageNum);    
   console.log("id  : "+received.id );   
   console.log("password : "+received.password);    
   console.log("subjectNum : "+received.subjectNum);    
   console.log("lectureNum : "+received.lectureNum);    
   console.log("activityNum : "+received.activityNum);    
    

	//MessageNum에 따라서 분기 - 각각의 처리에 맞는 함수 호출
	switch( parseInt(received.MessageNum, 10) ){
		case TeacherTools.CLIENT_REQUEST_LOGIN :
           clientRequestLogin(received);
			break;
        case TeacherTools.CLIENT_REQUEST_SUBJECTLIST :
            clientRequestSubjectList(received);
			break;
		case TeacherTools.CLIENT_REQUEST_LECTURELIST :
            clientRequestLectureList(received);
			break;
		case TeacherTools.CLIENT_REQUEST_MENU :
            clientRequestMenu(received);
			break;
        case TeacherTools.CLIENT_REQUEST_STARTACTIVITY  :
            clientRequestStartActivity(received);
			break;
		case TeacherTools.CLIENT_REQUEST_CONTENTLIST  :
            clientRequestContentList(received);
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
    res.is_success = 0;  
      
    var query = "select teacherPw from latte_teacher where teacherId = '"+received.id+"'";
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
   
         console.log( " pw : "+rows[0].teacherPw);
         
         if( received.password == rows[0].teacherPw){
             
             res.is_success = 1;
         }
    }
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}


/////////////////////////////////////////////////////////////////////////
///////////////////////////////이위는개발끗남///////////////////////////

function clientRequestSubjectList(received){
    
    console.log( "fuction clientRequestSubjectList " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_SUBJECTLIST;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    
    var query 
     = "select subjectNum, subjectName, subjectClass from latte_subject " 
     +" where subjectNum in (select subjectNum from latte_teach where teacherNum = "
     + " (select teacherNum from latte_teacher " 
     + " where teacherId = '" + received.id + "') );"  ;
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
        console.log( " rows : %j", rows);
        var tempList = [];
        for( var i=0 ; i< rows.length ;  i++){
            tempList[i] = TeacherTools.newSubjectInfo();
            tempList[i].subjectNum = rows[i]["subjectNum"];
            tempList[i].subjectName = rows[i]["subjectName"];
            tempList[i].ClassName = rows[i]["subjectClass"];
            
             console.log( " tempList[i].subjectNum : "+ tempList[i].subjectNum);
             console.log( " tempList[i].subjectName : "+ tempList[i].subjectName);
             console.log( " tempList[i].ClassName : "+tempList[i].ClassName);
        }
        res.subjectList = tempList;
    }
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    });
    
}


function clientRequestLectureList(received){
    
    console.log( "fuction clientRequestLectureList " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_LECTURELIST;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    
    
    var query 
     = " select lectureNum, lectureName from latte_lecture"
     +" where subjectNum = " + received.subjectNum + ";"  ;
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
        var tempList = [];
       console.log( " rows : %j", rows);
       for( var i=0 ; i< rows.length ;  i++){
           tempList[i] = TeacherTools.newLectureInfo();
            tempList[i].lecNum = rows[i].lectureNum;
            tempList[i].lecName = rows[i].lectureName;
            
            
             console.log( "  tempList[i].lecNum  : "+  tempList[i].lecNum  );
             console.log( "tempList[i].lecName  : "+ tempList[i].lecName  );
           
        }
        res.lectureList = tempList;
    }  
  
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}


function clientRequestMenu(received){
    
    console.log( "fuction clientRequestMenu " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_MENU;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  
  
    var query = " select activityRoute, activityName, activityType, activityNum from latte_activity "
     + " where activityNum in (select activityNum from latte_lecture_activity"
     + " where lectureNum = " + received.lectureNum + ");" ;
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
        var tempList = [];
       console.log( " rows : %j", rows);
       for( var i=0 ; i< rows.length ;  i++){
           tempList[i] = TeacherTools.newActivityInfo();
            tempList[i].actImg = rows[i].activityRoute;
            tempList[i].actName = rows[i].activityName;
            tempList[i].actType = rows[i].activityType;
            tempList[i].actNum = rows[i].activityNum;
            
            console.log( " tempList[i].actImg : "+ tempList[i].actImg);
            console.log( "tempList[i].actName : "+ tempList[i].actName);
            console.log( " tempList[i].actType : "+ tempList[i].actType);
            console.log( " tempList[i].actNum : "+ tempList[i].actNum);
           
        }
        res.today_activity = tempList;
    }  
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}

function clientRequestContentList(received){
    
    console.log( "fuction clientRequestContentList " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_CONTENTLIST;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
   
   
    var query = 
    "select activityRoute, activityName, activityType, activityNum from latte_activity" 
    + " where activityNum in "
    + " (select activityNum from latte_lecture_activity"
    + " where lectureNum in " 
    + " (select lectureNum from latte_lecture" 
    + " where subjectNum in "
    + " (select subjectNum from latte_teach"
    + " where teacherNum in "
    + " (select teacherNum from latte_teacher"
    + " where teacherId = '" + received.id + "'"
    + " )"
    + " )"
    + " )"
    + " );"; 
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
        var tempList = [];
       console.log( " rows : %j", rows);
       for( var i=0 ; i< rows.length ;  i++){
            tempList[i] = TeacherTools.newActivityInfo();
            tempList[i].actImg = rows[i].activityRoute;
            tempList[i].actName = rows[i].activityName;
            tempList[i].actType = rows[i].activityType;
            tempList[i].actNum = rows[i].activityNum;
            
            console.log( " tempList[i].actImg : "+ tempList[i].actImg);
            console.log( "tempList[i].actName : "+ tempList[i].actName);
            console.log( " tempList[i].actType : "+ tempList[i].actType);
            console.log( " tempList[i].actNum : "+ tempList[i].actNum);
           
        }
        res.activityList = tempList;
    }  
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


function clientRequestStartActivity(received){
    
    console.log( "fuction clientRequestStartActivity " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_STARTACTIVITY;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
   
    if( received.activityType == TeacherTools.ATTENDANCE ){
        
         var req = TeacherTools.newRequest();
    req.MessageNum = TeacherTools.SERVER_REQUEST_STARTATTENDACTIVITY;
    req.id = received.id;
    req.success = 1; //별일 없으면 요청은 성공한다. 
    

        for( var i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
            if( ID_SOCKET_PAIR[i].deviceType == TeacherTools.MOBILE){                    
                     ID_SOCKET_PAIR[i].socket.emit('data', req);
            }
        }
    }
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
 
}





/////////////////////////////////////////////////////복붙용



function clientRequest(received){
    
    console.log( "fuction clientRequest " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE;
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

