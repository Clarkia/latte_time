


var ID_SOCKET_PAIR = [];


var ATTEND_INFO = [];

var mysqlConn;
var socket;
var classState;
var groupShare;

var StudentTools = require("./studentTools");
var TeacherTools = require("./teacherTools");

//**************
// Functions
//**************

exports.call = function(_socket, received, mysqlConnection, _ID_SOCKET_PAIR, _classState, _pptShare, _groupShare){
 
    ID_SOCKET_PAIR = _ID_SOCKET_PAIR;
    mysqlConn = mysqlConnection;
    socket = _socket;
    classState = _classState;
    pptShare = _pptShare;
    groupShare = _groupShare;
    
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
      
		case TeacherTools.CLIENT_REQUEST_CONTENTLIST  :
            clientRequestContentList(received);
			break;
		
		case TeacherTools.CLIENT_REQUEST_ATTENDINFO  :
            clientRequestAttendInfo(received);
			break;
		case TeacherTools.CLIENT_REQUEST_ATTENDSEND  :
            clientRequestAttendSend(received);
			break;
	
		 case TeacherTools.CLIENT_REQUEST_STARTFIXACTIVITY  :
            clientRequestStartFixActivity(received);
			break;
			
				case TeacherTools.CLIENT_REQUEST_CONNECTION  :
            clientRequestConnection(received);
			break;
			
				case TeacherTools.CLIENT_REQUEST_GROUPDECISION  :
            clientRequestGroupDecision(received);
			break;
			
				case TeacherTools.CLIENT_REQUEST_GROUPINGCOMPLETE  :
            clientRequestGroupingComplete(received);
			break;
			
			case TeacherTools.CLIENT_REQUEST_PPTINFO  :
            clientRequestStartPPTInfo(received);
			break;
			
			case TeacherTools.CLIENT_REQUEST_PPTSHARE  :
            clientRequestPPTShare(received);
			break;
			
			case TeacherTools.CLIENT_REQUEST_PPTRETREIVE  :
            clientRequestPPTRetreive(received);
			break;
			
			
			/////////////////400////////////
			
        case TeacherTools.CLIENT_REQUEST_SHARESTART : //401
            ClientRequestNewLecture(received);
            break;
			
			
		default:
			break;
	}

    
}


function clientRequestGroupDecision(received){
    
    console.log( "fuction clientRequestGroupDecision " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_GROUPDECISION;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  
    //search subjectNum classStudentNum from db  
    var query = " select COUNT(studentNum) as classStudentNum "
    + "  from latte_listen "
    + " where subjectNum =  " + received.subjectNum + ";"
    
    mysqlConn.query(query, function (err, rows){
    if(err){
        console.log("mysql query err");
        console.log(err);
        res.success = 0;
    }
    
    else if( rows.length ) {
        var classStudentNum = rows[0].classStudentNum;
        var groupNumber;
        
        if( classStudentNum % received.number == 0 ){
            groupNumber = parseInt(classStudentNum / received.number);
        }
        else {
            groupNumber = parseInt (classStudentNum / received.number) + 1 ; 
        }
        
        console.log ("classStudentNum : " + classStudentNum );
        console.log ("received.number : " + received.number );
        console.log ("groupNumber : " + groupNumber );
        
        var groupList = [];
        for( var i=0 ; i< groupNumber ; i++ ){
            groupList.push(i);
        } 
        
        res.groupList = groupList;
        
     var req = TeacherTools.newRequest();
    req.MessageNum = StudentTools.SERVER_REQUEST_GROUPDECISION;
    req.id = received.id;
    req.groupList = groupList;
    req.number = received.number;

    var i = 0;
    
    //학생들에게 액티비티를 시작하라고 요청해준다. 
        for(  i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
            if( parseInt( ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.MOBILE){   
              if( parseInt( ID_SOCKET_PAIR[i].manType , 10) == TeacherTools.STUDENT){
                     ID_SOCKET_PAIR[i].socket.emit('data', req);
              }
            }
        } 
        
    }  
 
    
    //retreive groupShare
    groupShare.groupNum = groupNumber;
    groupShare.groupList = [];
    for( i = 0 ; i < groupNumber ; i++ ){
        groupShare.groupList[i] = TeacherTools.newGroupInfo() ;
        groupShare.groupList[i].studentList = [];
        groupShare.groupList[i].studentNum = 0;
    }
        
        
    console.log( "groupShare : %j", groupShare);    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}




function clientRequestGroupingComplete(received){
    
    console.log( "fuction clientRequestGroupingComplete " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_GROUPINGCOMPLETE;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  
   //send groupin message(209) to mobile client
     var req = TeacherTools.newRequest();
    req.MessageNum = StudentTools.SERVER_REQUEST_GROUPINGCOMPLETE;
    req.id = received.id;

    var i = 0;
    
    for(  i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
        if( parseInt( ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.MOBILE){ 
            if( parseInt(  ID_SOCKET_PAIR[i].manType, 10) == TeacherTools.STUDENT) {
                  ID_SOCKET_PAIR[i].socket.emit('data', req);
            }
        }       
    }  
    
    //groupInfo
   console.log("groupShare : %j", groupShare);
  
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
     socket.emit('data', res) ;
 
    
}



function clientRequestStartFixActivity(received){
    
    console.log( "fuction clientRequestStartFixActivity " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_STARTFIXACTIVITY;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
   
    if( received.activityType == TeacherTools.ATTENDANCE ){
        
    var req = TeacherTools.newRequest();
    req.MessageNum = StudentTools.SERVER_REQUEST_STARTATTENDACTIVITY;
    req.id = received.id;

    //학생들에게 액티비티를 시작하라고 요청해준다. 
        for( var i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
            if( parseInt( ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.MOBILE){   
              if( parseInt( ID_SOCKET_PAIR[i].manType , 10) == TeacherTools.STUDENT){
                     ID_SOCKET_PAIR[i].socket.emit('data', req);
              }
            }
        }
        
        //액티비티 실행한거 저장해둠. 
        classState.activityStart = 1;
        classState.activityType = TeacherTools.ATTENDANCE;
        
    }
    
    else if( received.activityType == TeacherTools.GROUP ){
        
    var req = TeacherTools.newRequest();
    req.MessageNum = StudentTools.SERVER_REQUEST_STARTGROUPACTIVITY;
    req.id = received.id;

    //학생들에게 액티비티를 시작하라고 요청해준다. 
        for( var i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
            if( parseInt( ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.MOBILE){   
              if( parseInt( ID_SOCKET_PAIR[i].manType , 10) == TeacherTools.STUDENT){
                     ID_SOCKET_PAIR[i].socket.emit('data', req);
              }
            }
        }
        
        /*
        //액티비티 실행한거 저장해둠. 
        classState.activityStart = 1;
        classState.activityType = TeacherTools.GROUP;
        */
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



/////////////////////////////////////////////////////////////////////////
///////////////////////////////이아래는개발끗남///////////////////////////





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



function clientRequestConnection(received){
    
    console.log( "fuction clientRequestConnection " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_CONNECTION;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  
  
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
}


function clientRequestAttendInfo(received){
    
    console.log( "fuction clientRequestAttendInfo " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_ATTENDINFO;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  
  
    var query = " select studentId, studentImg from latte_student"
                +" where studentNum in ( select studentNum from latte_listen " 
				+ " where subjectNum = "+ received.subjectNum +" );";
    
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
           tempList[i] = TeacherTools.newAttendInfo();
            tempList[i].studentId = rows[i].studentId;
            tempList[i].attendance = 0;
            tempList[i].studentImg = rows[i].studentImg;
            
            console.log( "  tempList[i].studentId  : "+  tempList[i].studentId );
            console.log( " tempList[i].studentImg  : "+  tempList[i].studentImg ) ;
        }
        res.attendInfo = tempList;
    }  
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    
    });
    
}


function clientRequestAttendSend(received){
    
    console.log( "fuction clientRequestMenu " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_ATTENDSEND;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    
    var query;
    
    for( var i=0 ; i< received.attendInfoList.length ; i++) {
    
        query = " insert into latte_attendInfo" 
        + " (studentNum, attendance, lectureNum) values ( ?, ?, ? )"
       
       mysqlConn.query( query , 
       [received.attendInfoList[i].studentNum, received.attendInfoList[i].attendance, received.lectureNum ] 
       , function(err, info ) { });
    
    }
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
        //결과 보내기
        socket.emit('data', res) ;
    
    

}



// SHARE PAGE START
function ClientRequestNewLecture(received){

    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_SHARESTART;
    res.success = 1;
    res.id = received.id;
    
    //retreive pptShare instance
    pptShare.webWatching = 1;
    
    console.log("web is now watching the page...") ;
   
    //send result to client
    socket.emit('data', res) ;
    
    //if mobile sharing started, send pptInfo
    console.log("pptShare.mobileSharing : " + pptShare.mobileSharing );
   
    if( pptShare.mobileSharing == 1 ){
        var req = TeacherTools.newRequest();
        req.MessageNum = TeacherTools.SERVER_REQUEST_PPTSHARE;
        req.id = received.id;
        req.pptInfo = pptShare.pptInfo;
        
        socket.emit('data', req);
    }
    
}
 


function clientRequestPPTRetreive(received){
    
    console.log( "fuction clientRequestPPTRetreive " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_PPTRETREIVE;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
    //결과 보내기
    socket.emit('data', res) ;

 
   ////웹페이지가 보고있었던 경우에 피피티 갱신 정보 보내줌
    if( pptShare.webWatching == 1 ){

      var req = TeacherTools.newRequest();
      req.MessageNum = TeacherTools.SERVER_REQUEST_PPTRETRETREIVE;
      req.currentPPT = received.currentPPT;
      req.writingLayer = received.writingLayer;

    
        for( var i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
            if( parseInt( ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.WEBPAGE){   
              if( ID_SOCKET_PAIR[i].id == received.id ){
                  ID_SOCKET_PAIR[i].socket.emit('data', req);
              }
            }
         }
     }


    
}



function clientRequestPPTShare(received){
    
    console.log( "fuction clientRequestPPTShare " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_PPTSHARE;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  

 var query = "select pptNum, route from latte_ppt "
    + " where activityTypeNum =  "
    + " ( select activityTypeNum from latte_activity "
    + " where activityNum =  " +  received.activityNum  + " )  ; "
    
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
           tempList[i] = TeacherTools.newPPTRoute();
            tempList[i].pageNum = rows[i].pptNum;
            tempList[i].route = rows[i].route;
                
            console.log( " tempList[i].pageNum : "+ tempList[i].pageNum );
            console.log( "tempList[i].route  : "+ tempList[i].route );   
        }
    }  

    var tempPPTInfo = TeacherTools.newPPTInfo();
        tempPPTInfo.routes = tempList;
        tempPPTInfo.pageNum = tempList.length;
  
      //공유정보 갱신해줌. 
     pptShare.mobileSharing = 1;   
     pptShare.pptInfo  = tempPPTInfo;
     
     console.log( " now mobile is sharing.. ");
          
  
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
    //결과 보내기
    socket.emit('data', res) ;



    ////웹페이지가 보고있었던 경우에 피피티 공유 정보 보내줌
    if( pptShare.webWatching == 1 ){
      var req = TeacherTools.newRequest();
      req.MessageNum = TeacherTools.SERVER_REQUEST_PPTSHARE;
      req.id = received.id;
      req.pptInfo = tempPPTInfo;

    
        for( var i=0 ; i<ID_SOCKET_PAIR.length ; i++){       
            if( parseInt( ID_SOCKET_PAIR[i].deviceType, 10) == TeacherTools.WEBPAGE){   
              if( ID_SOCKET_PAIR[i].id == received.id ){
                  ID_SOCKET_PAIR[i].socket.emit('data', req);
              }
            }
         }
     }



    });
    

    
}



function clientRequestStartPPTInfo(received){
    
    console.log( "fuction clientRequestStartPPTInfo " );
    
    var res = TeacherTools.newResponse();
    res.MessageNum = TeacherTools.SERVER_RESPONSE_PPTINFO;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
  

    //PPT Info를 가져와서 122로 보내준다. 
  
    var query = "select pptNum, route from latte_ppt "
    + " where activityTypeNum =  "
    + " ( select activityTypeNum from latte_activity "
    + " where activityNum =  " +  received.activityNum  + " )  ; "
    
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
           tempList[i] = TeacherTools.newPPTRoute();
            tempList[i].pageNum = rows[i].pptNum;
            tempList[i].route = rows[i].route;
                
            console.log( " tempList[i].pageNum : "+ tempList[i].pageNum );
            console.log( "tempList[i].route  : "+ tempList[i].route );   
        }
    }  
    
       res.pptInfo = TeacherTools.newPPTInfo();
        res.pptInfo.routes = tempList;
        res.pptInfo.pageNum = tempList.length;
    
    //결과는 마이에스큐엘까지 끝난 다음 반환한다. 
 
         //결과 보내기
        socket.emit('data', res) ;
        
       
        
    });
    
}





