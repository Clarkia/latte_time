//**************
// Data types
//**************

var ID_SOCKET_PAIR = [];//Logged id user list
var mysqlConn; 
var socket;
var WebpageTools = require("./webpageTools");


//*********************
// Main Logic Function
//*********************

exports.call = function(_socket, received, mysqlConnection, _ID_SOCKET_PAIR){
	 
    ID_SOCKET_PAIR = _ID_SOCKET_PAIR; 
    mysqlConn = mysqlConnection;
    socket = _socket;
    
	console.log("web page controller call function");

	//MessageNum에 따라서 분기 - 각각의 처리에 맞는 함수 호출
    switch( parseInt(received.MessageNum, 10) ){
        case WebpageTools.CLIENT_REQUEST_LOGIN: //301
            clientRequestLogin(received);
            break;
        case WebpageTools.CLIENT_REQUEST_LOGOUT: //303
            clientRequestLogout(received);
            break;
        case WebpageTools.CLIENT_REQUEST_CLASSLIST: //305
            clientRequestClasslist(received);
            break;
        case WebpageTools.CLIENT_REQUEST_VIEWLECTURELIST: //307 
            ClientRequestViewLectureList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_CLASSORGANIZE: //309
            ClientRequestClassOrganize(received);
            break;
        case WebpageTools.CLIENT_REQUEST_ADDACTIVITY_TO_LECTURE: //311
            ClientRequestAddActivityToLecture(received);
            break;
        case WebpageTools.CLIENT_REQUEST_DELETE_ACTIVITY_FROM_LECTURE: //325
            ClientRequestDeleteActivityFromLecture(received);
            break;
        case WebpageTools.CLIENT_REQUEST_PPTLIST: //313
            break;
        case WebpageTools.CLIENT_REQUEST_PPTUPLOAD: //315
            break;
        case WebpageTools.CLIENT_REQUEST_WORKSHEETLIST: //317
            break;
        case WebpageTools.CLIENT_REQUEST_WORKSHEETUPLOAD: //319
            break;
        case WebpageTools.CLIENT_REQUEST_VIEWATTENDLIST: //321
            ViewAttendList(received);
            break;
        case WebpageTools.CLIENT_REQUEST_NEWLECTURE : //323
            ClientRequestNewLecture(received);
            break;
        default:
            break;
	}

}

//**************
// Functions
//**************

// LOGIN
function clientRequestLogin(received){
    
    console.log( "fuction clientRequestLogin " );
    
    var res = WebpageTools.newResponse();
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_LOGIN;
    
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    res.is_success = 0; //is_success 는 로그인을 성공했는가 이다. 
    
    var query = "select teacherPw,teacherNum from latte_teacher where teacherId = '"+received.id+"'";
    
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

// LOGOUT
function clientRequestLogout(received){
    var res = WebpageTools.newResponse();
    
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    res.is_success = 1; //send success
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_LOGOUT;
    
    //send response
    socket.emit('data',res);   
    
    //pop from the list
    for(var i = 0 ; i <  ID_SOCKET_PAIR.length ; i++){
        if(ID_SOCKET_PAIR[i].id == received.id){
          if( ID_SOCKET_PAIR[i].deviceType = WebpageTools.WEBPAGE){
              ID_SOCKET_PAIR.splice(i, 1);
          }
        }
    }
    
    
}

// CLASS LIST
function clientRequestClasslist(received){
    
    var res = WebpageTools.newResponse();
    var list =[];
    res.MessageNum = WebpageTools.SREVER_RESPONSE_CLASSLIST;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    var query = "select subjectNum, subjectName, subjectClass " 
                + " from latte_subject "
                + " where subjectNum in " 
                + " (select subjectNum from latte_teach where teacherNum = " 
                + " (select teacherNum from latte_teacher where teacherId = '" + received.id + "') ); ";
    
    mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //결과 -  for문 돌면서 list에 push

                list.push(WebpageTools.newSubjectInfo(rows[i].subjectNum
                                                    ,rows[i].subjectName
                                                    ,rows[i].subjectClass));
            }         
            
            res.success = 1;
            res.subjectList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
}

// LECTURE LIST
function ClientRequestViewLectureList(received){
    var res = WebpageTools.newResponse(); 
    var list = [];
    res.MessageNum = WebpageTools.SERVER_RESPONSE_SELECTCLASS;
    res.id = received.id;
    res.success = 1; //별일 없으면 요청은 성공한다. 
    
    var query = "select latte_lecture.lectureNum, latte_lecture.lectureName "
                + " from latte_lecture left join latte_subject "
                + " on latte_lecture.subjectNum = latte_subject.subjectNum " 
                + " where latte_lecture.subjectNum = " + received.subjectNum;

        mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //결과 -  for문 돌면서 list에 push
              
              list.push(WebpageTools.newLectureInfo(rows[i].lectureNum
                                                    ,rows[i].lectureName
                                                    ,0
                                                    ,0));
            }         
            
            res.success = 1;
            res.lectureList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
}

// CLASS ORGINIZE
function ClientRequestClassOrganize(received){
    
    var res = WebpageTools.newResponse();
    var list = [];
    res.MessageNum = WebpageTools.SERVER_RESPONSE_CLASSORGANIZE;
    res.id = received.id;
    
     var query = "select activityNum, activityName, activityType, activityRoute "
                    + " from latte_activity "
                    + " where activityNum in " 
                    + " (select activityNum from latte_lecture_activity where lectureNum = "
                    + " (select lectureNum from latte_lecture where lectureNum = " +received.lectureNum  + ")); " ;
    
     mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length > 0 ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //결과 -  for문 돌면서 list에 push
             
                list.push(WebpageTools.newActivityInfo(rows[i].activityRoute
                                                        ,rows[i].activityName
                                                        ,rows[i].activityType
                                                        ,rows[i].activityNum));
            }         
            
            res.success = 1;
            res.activityList = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
    
}

// ADD ACTIVITY TO LECTURE - attach activities
function ClientRequestAddActivityToLecture(received){
    var res = WebpageTools.newResponse();
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_ADDACTIVITY_TO_LECTURE;
    res.id = received.id;

    //DB insertion
    //  -latte-lecture activity
    var query = "insert into latte_lecture_activity (lectureNum, activityNum) select "+ received.lectureNum +"," +received.activityNum
                +" from latte_lecture_activity where not exists " 
                + " (select * from latte_lecture_activity where lectureNum = " +  received.lectureNum + " and activityNum = " + received.activityNum + ") limit 1";
    
     console.log(query);
    
    mysqlConn.query(query, function(err, rows) {
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else{
            res.success = 1;
        }
        
        //send result to client
        socket.emit('data', res) ;
    
    });
    
}

// DELETE ACTIVITY FROM LECTURE - dettach activities
function  ClientRequestDeleteActivityFromLecture(received){
    var res = WebpageTools.newResponse();
     
    res.MessageNum = WebpageTools.SERVER_RESPONSE_DELETE_ACTIVITY_FROM_LECTURE;
    res.id = received.id;
    
    //DB deletion
    var query = "delete from latte_lecture_activity where lectureNum = " + received.lectureNum + " and activityNum = " + received.activityNum;
    
     console.log(query);
    
     mysqlConn.query(query, function(err, rows) {
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else{
            res.success = 1;
        }
        
        //send result to client
        socket.emit('data', res) ;
    
    });
}

// VIEW ATTENDLIST
function ViewAttendList(received){

    var res = WebpageTools.newResponse();
    var list = [];
    
    res.MessageNum = WebpageTools.SERVER_RESPONSE_VIEWATTENDLIST;
    
    var query = " select studentNum,attendance,lectureNum, studentId,studentImg "
                + " from "
                + " (select latte_attendInfo.studentNum,latte_attendInfo.attendance,latte_attendInfo.lectureNum, latte_student.studentId,latte_student.studentImg "
                + " from latte_student,latte_attendInfo "
                + " where latte_student.studentNum = latte_attendInfo.studentNum) as t1 "
                + " where lectureNum in "
                + " (select lectureNum from latte_lecture where subjectNum = " + received.subjectNum +")";

    
    
     mysqlConn.query(query, function (err, rows){
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        
        else if( rows.length ) {
            
            for(var i = 0 ; i < rows.length ; i++){ //결과 -  for문 돌면서 list에 push
                
                //studentNum,attendence,lectureNum,studentImg,studentId
                list.push(WebpageTools.newAttendInfo(rows[i].studentNum
                                                    , rows[i].attendance
                                                    , rows[i].lectureNum
                                                    , rows[i].studentImg
                                                    , rows[i].studentId));
            }         
            
            res.success = 1;
            res.attendInfo = list;
        }
        //send to client
        socket.emit('data', res) ;
    });
    
}
// CREATE NEW LECTURE
function ClientRequestNewLecture(received){
    var res = WebpageTools.newResponse();
    res.MessageNum = WebpageTools.SERVER_RESPONSE_NEWLECTURE;
    
    var query = "insert into latte_lecture(lectureName,lectureDate,lectureOrder,subjectNum)"
                + " values('" + received.lectureInfo.lectureName + "','" 
                + received.lectureInfo.lectureDate+ "', "
                + received.lectureInfo.lectureOrder + ", " 
                + received.subjectNum+")";
    
    mysqlConn.query(query, function(err, rows) {
        if(err){
            console.log("mysql query err");
            console.log(err);
            res.success = 0;
        }
        else{
            res.success = 1;
        }
        
        //send result to client
        socket.emit('data', res) ;
    
    });
    
}
