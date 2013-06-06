
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
function LectureInfo(lecNum,lecName,lecDate,lecOrder){
    this.lecNum = lecNum;
    this.lecName = lecName;
    this.lecDate = lecDate;
    this.lecOrder = lecOrder;
}
exports.newLectureInfo = function(lecNum,lecName,lecDate,lecOrder){
    return new LectureInfo(lecNum,lecName,lecDate,lecOrder);
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
function AttendInfo(studentNum,attendence,lectureNum,studentImg,studentId){
    this.studentNum = studentNum;
    this.attendence = attendence;
    this.lectureNum = lectureNum;
    this.studentImg = studentImg;
    this.studentId = studentId;
}
exports.newAttendInfo = function(studentNum,attendence,lectureNum,studentImg,studentId){
    return new AttendInfo(studentNum,attendence,lectureNum,studentImg,studentId);
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
exports.CLIENT_REQUEST_ADDACTIVITY_TO_LECTURE=	311;
exports.SERVER_RESPONSE_ADDACTIVITY_TO_LECTURE=	312;
exports.CLIENT_REQUEST_PPTLIST=	313;
exports.SERVER_RESPONSE_PPTLIST=	314;
exports.CLIENT_REQUEST_PPTUPLOAD=	315;
exports.SERVER_RESPONSE_PPTUPLOAD=	316;
exports.CLIENT_REQUEST_WORKSHEETLIST=	317;
exports.SERVER_RESPONSE_WORKSHEETLIST=	318;
exports.CLIENT_REQUEST_WORKSHEETUPLOAD=	319;
exports.SERVER_RESPONSE_WORKSHEETUPLOAD	=320;
exports.CLIENT_REQUEST_VIEWATTENDLIST=	321;
exports.SERVER_RESPONSE_VIEWATTENDLIST=	322;
exports.CLIENT_REQUEST_NEWLECTURE=    323;
exports.SERVER_REQUEST_NEWLECTURE=	324;
exports.CLIENT_REQUEST_DELETE_ACTIVITY_FROM_LECTURE=    325;
exports.SERVER_REQUEST_DELETE_ACTIVITY_FROM_LECTURE=	326;



