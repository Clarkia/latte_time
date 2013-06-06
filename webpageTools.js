
//**************
// Data types
//**************

//Request
exports.newRequest = function(){
    return new Request();
}
function Request(){
    var MessageNum;
    var id;
    var password;
}

//Response
exports.newResponse = function(){
    return new Response();
}
function Response() {
    var MessageNum;
    var id;
    var success;

}

//SubjectInfo      
function SubjectInfo(subjectNum,subjectName,className){
    this.subjectNum = subjectNum; //과목 번호
    this.subjectName = subjectName; //과목 이름
    this.className = className; //반 이름
}
exports.newSubjectInfo = function(subjectNum,subjectName,className){
    return new SubjectInfo(subjectNum,subjectName,className);
}

//LectureInfo
function LectureInfo(lecNum,lecName){
    this.lecNum = lecNum;
    this.lecName = lecName;
}
exports.newLectureInfo = function(lecNum,lecName){
    return new LectureInfo(lecNum,lecName);
}
//ActivityInfo
function ActivityInfo(actImg,actName,actType,actNum){
    this.actImg = actImg;
    this.actName = actName;
    this.actType = actType;
    this.actNum = actNum;
}
exports.newActivityInfo = function(actImg,actName,actType,actNum){
    return new ActivityInfo(actImg,actName,actType,actNum);
}

//Attend Info
function AttendInfo(studentNum,students){
    this.studentNum = studentNum;
    this.students = students;
}
exports.newAttendInfo = function(studentNum,students){
    return new AttendInfo(studentNum,students);
}


exports.newIdSocekt = function(){
      return new ID_SOCKET_PAIR();
}

function ID_SOCKET_PAIR() {
      var id;
    var socket;
    var deviceType;
    var manType;

}

exports.TEACHER=1;
exports.STUDENT=2;

exports.MOBILE=1;
exports.WEBPAGE=2;

exports.CLIENT_REQUEST_LOGIN  =  301;
exports.SERVER_RESPONSE_LOGIN=	302;
exports.CLIENT_REQUEST_LOGOUT=	303;
exports.SERVER_RESPONSE_LOGOUT=	304;
exports.CLIENT_REQUEST_CLASSLIST=	305;
exports.SREVER_RESPONSE_CLASSLIST=	306;
exports.CLIENT_REQUEST_VIEWLECTURELIST=	307;
exports.SERVER_RESPONSE_SELECTCLASS=	308;
exports.CLIENT_REQUEST_CLASSORGANIZE=	309;
exports.SERVER_RESPONSE_CLASSORGANIZE=	310;
exports.CLIENT_REQUEST_CLASSSAVE=	311;
	
exports.SERVER_RESPONSE_CLASSSAVE=	312;
exports.CLIENT_REQUEST_PPTLIST=	313;
exports.SERVER_RESPONSE_PPTLIST=	314;
exports.CLIENT_REQUEST_PPTUPLOAD=	315;
exports.SERVER_RESPONSE_PPTUPLOAD=	316;
exports.CLIENT_REQUEST_WORKSHEETLIST=	317;
exports.SERVER_RESPONSE_WORKSHEETLIST=	318;
exports.CLIENT_REQUEST_WORKSHEETUPLOAD=	319;
exports.SERVER_RESPONSE_WORKSHEETUPLOAD	=320;
exports.CLIENT_REQUEST_VIEWATTENDLIST=	321;
exports.SERVER_REQUEST_VIEWATTENDLIST=	322;



